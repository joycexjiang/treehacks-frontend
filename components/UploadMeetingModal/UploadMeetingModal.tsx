import { Dialog, Transition } from "@headlessui/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import useFileUpload, { UploadState } from "../../hooks/useFileUpload";
import { analyze } from "../../lib/api";
import firebase from "../../lib/firebase";

type UploadMeetingModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type FormData = {
  interviewTitle: string;
  aboutUser: string;
  learningObjectives: string;
  date: string;
};

// enum UploadState {
//   Initial = "initial",
//   Uploading = "uploading",
//   Uploaded = "uploaded",
// }

const STORAGE_PATH = "meetings";
const CONVERSATIONS_COLLECTION = "conversations";

export default function UploadMeetingModal({
  isOpen,
  setIsOpen,
}: UploadMeetingModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const [formFields, setFormFields] = useState<FormData>({
    interviewTitle: "",
    aboutUser: "",
    learningObjectives: "",
    date: "",
  });

  const router = useRouter();

  const {
    uploadState,
    downloadUrl,
    error,
    uploadProgress,
    uploadFile,
    cancelUpload,
  } = useFileUpload(STORAGE_PATH);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    if (uploadState !== UploadState.Initial) return;

    await uploadFile(file);

    if (error) {
      console.log(error);
      alert(`Error uploading file: ${error.message}`);
      return;
    }
  };

  const UploadProgress = ({ progress }: { progress: number }) => {
    return (
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 bg-green-400 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const handleGenerateAnalysis = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!downloadUrl) return;
    const docId = nanoid();
    const response = await generateAnalysis(downloadUrl, docId);
    await postEverythingToFirebase(docId);
    router.push("/view_meeting?id=" + docId);
  };

  const generateAnalysis = async (url: string, docId: string) => {
    const { message } = await analyze(url, docId);
    console.log(message);
    return message;
  };

  const postEverythingToFirebase = async (docId: string) => {
    const docRef = doc(firebase.db, `${CONVERSATIONS_COLLECTION}/${docId}`);

    try {
      await setDoc(docRef, {
        title: formFields.interviewTitle,
        aboutUser: formFields.aboutUser,
        learningObjectives: formFields.learningObjectives,
        downloadUrl,
        date: formFields.date,
      });
      console.log("Document added with ID: ", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white bg-opacity-70 p-8 text-left align-middle shadow-xl transition-all">
                <div className="mb-6">
                  <h3 className="font-bold mb-1 text-sm">Interview Title</h3>
                  <textarea
                    className="w-full h-24 border-2 border-gray-300 rounded-lg p-2"
                    name="interviewTitle"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <h3 className="font-bold mb-1 text-sm">About the user</h3>
                  <textarea
                    className="w-full h-20 border-2 border-gray-300 rounded-lg p-2"
                    name="aboutUser"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <h3 className="font-bold mb-1 text-sm">
                    Learning Objectives
                  </h3>
                  <textarea
                    className="w-full h-48 border-2 border-gray-300 rounded-lg p-2"
                    name="learningObjectives"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <h3 className="font-bold mb-1 text-sm">Date</h3>
                  <textarea
                    className="w-full h-12 border-2 border-gray-300 rounded-lg p-2"
                    name="date"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <form onSubmit={handleFileSubmit}>
                    <input
                      type="file"
                      accept="audio/*"
                      disabled={uploadState !== UploadState.Initial}
                      onChange={(e) => {
                        const selectedFile =
                          e.target.files && e.target.files[0];
                        if (
                          selectedFile &&
                          selectedFile.type.includes("audio/")
                        ) {
                          setFile(selectedFile);
                        } else {
                          alert("Please select an audio file.");
                        }
                      }}
                    />
                    {uploadState === UploadState.Initial && (
                      <button
                        type="submit"
                        className="py-2 px-2 bg-white rounded-md border-2 border-[#D9D9D9] text-sm text-gray-700"
                      >
                        Upload
                      </button>
                    )}
                    {uploadState === UploadState.Uploading && (
                      <button
                        type="button"
                        onClick={cancelUpload}
                        className="py-2 px-2 bg-white rounded-md border-2 border-[#D9D9D9] text-sm text-gray-700"
                      >
                        Cancel
                      </button>
                    )}
                    {uploadState === UploadState.Uploaded && (
                      <button
                        type="button"
                        className="py-2 px-2 bg-white rounded-md border-2 border-[#D9D9D9] text-sm text-gray-700"
                        disabled
                      >
                        Uploaded
                      </button>
                    )}
                    {uploadState === UploadState.Uploading && (
                      <UploadProgress progress={uploadProgress} />
                    )}
                  </form>
                </div>

                <div className="flex justify-center">
                  <form onSubmit={handleGenerateAnalysis}>
                    <button
                      type="submit"
                      className="border-2 border-[#D9D9D9] bg-white px-5 py-2 rounded-md text-sm text-gray-700"
                    >
                      Start Analysis
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
