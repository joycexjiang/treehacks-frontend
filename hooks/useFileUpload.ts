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
    error: Error | null;
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
  const [error, setError] = useState<Error | null>(null);
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
    setError(null);
  };

  const uploadFile = async (file: File) => {
    // Enure file abides by the options
    if (options.maxFileSize && file.size > options.maxFileSize) {
        setError(new Error(`File size must be less than ${options.maxFileSize} bytes`));
        return;
    }
    if (options.allowedFileTypes && !options.allowedFileTypes.includes(file.type)) {
        setError(new Error(`File type not allowed. Allowed types are: ${options.allowedFileTypes.join(', ')}`));
        return;
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
      } catch (err: any) {
        console.log("upload error:", err);
        setError(err);
        setUploadState(UploadState.Initial);
        setUploadProgress(0);
      }
  };

  const cancelUpload = () => {
    if (uploadTaskRef.current) {
        uploadTaskRef.current.cancel();
    }
  };

  return { uploadState, downloadUrl, error, uploadProgress, uploadFile, cancelUpload };
};

export default useFileUpload;