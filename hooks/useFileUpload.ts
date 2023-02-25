import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable, UploadTask, UploadTaskSnapshot } from "firebase/storage";

import firebase from "../lib/firebase";

export enum UploadState {
  Initial = "initial",
  Uploading = "uploading",
  Uploaded = "uploaded",
}

type UploadResponse = {
    uploadState: UploadState;
    downloadUrl: string | null;
    uploadProgress: number;
    uploadFile: (file: File) => Promise<void>;
    cancelUpload: () => void;
};

type UploadOptions = {
    maxFileSize?: number;
    allowedFileTypes?: string[];
  };

const useFileUpload = (storagePath: string, options: UploadOptions = {}): UploadResponse => {
  const [uploadState, setUploadState] = useState<UploadState>(
    UploadState.Initial
  );
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const uploadTaskRef = useRef<UploadTask | null>(null);

  const handleUploadStateChange = (snapshot: UploadTaskSnapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
    console.log(progress);
  };


  const handleUploadSuccess = async (snapshot: UploadTaskSnapshot) => {
    const url = await getDownloadURL(snapshot.ref);
    setDownloadUrl(url);
    setUploadState(UploadState.Uploaded);
  };

  const uploadFile = async (file: File): Promise<void> => {
    // Enure file abides by the options
    if (options.maxFileSize && file.size > options.maxFileSize) {
      throw new Error(`File size must be less than ${options.maxFileSize} bytes`);
    }
    if (options.allowedFileTypes && !options.allowedFileTypes.includes(file.type)) {
      throw new Error(`File type not allowed. Allowed types are: ${options.allowedFileTypes.join(', ')}`);
    }

    setUploadState(UploadState.Uploading);
    const storageRef = ref(firebase.storage, `${storagePath}/${file.name}`);
    uploadTaskRef.current = uploadBytesResumable(storageRef, file);
    console.log("uploading file:", file.name);

    try {
        await new Promise<void>((resolve, reject) => {
          if (uploadTaskRef.current) {
            uploadTaskRef.current.on(
              "state_changed",
              (snapshot) => handleUploadStateChange(snapshot),
              (err: Error) => {
                // Propably want to separate cancellation from other errors
                reject(err);
              },
              () => {
                console.log("upload complete");
                if (uploadTaskRef.current?.snapshot) {
                  handleUploadSuccess(uploadTaskRef.current.snapshot);
                  resolve();
                } else {
                  reject(new Error("Upload task reference or snapshot is null"));
                }
              }
            );
          } else {
            reject(new Error("Upload task reference is null"));
          }
        });
      } catch (err) {
        console.log("upload error:", err);
        setUploadState(UploadState.Initial);
        setUploadProgress(0);
        throw err;
      }
    };

  const cancelUpload = () => {
    if (uploadTaskRef.current) {
        uploadTaskRef.current.cancel();
    }
  };

  return { uploadState, downloadUrl, uploadProgress, uploadFile, cancelUpload };
};

export default useFileUpload;