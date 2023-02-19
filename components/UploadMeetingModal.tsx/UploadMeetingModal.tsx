import { Dialog, Transition } from "@headlessui/react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
import { Fragment, useState } from "react";
import firebase from "../../lib/firebase";

type UploadMeetingModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function UploadMeetingModal({
  isOpen,
  setIsOpen,
}: UploadMeetingModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<
    "initial" | "uploading" | "uploaded"
  >("initial");
  const [formFields, setFormFields] = useState<{ [key: string]: string }>({});
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setUploadState("uploading");

    // upload the file.
    const storageRef = ref(firebase.storage, `meetings/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress
        console.log(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%"
        );
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setDownloadUrl(url);
            console.log(url);
            return generateAnalysis(url);
          })
          .then(({ response, url }) => {
            return postEverythingToFirebase(response, url);
          });
      }
    );

    setUploadState("uploaded");
  };

  const generateAnalysis = async (url: string) => {
    const response = { transcripts: [], questions: [] };

    return { response, url };
  };

  const postEverythingToFirebase = async (response: any, url: string) => {
    const collectionRef = collection(firebase.db, "conversations");
    const docRef = await addDoc(collectionRef, {
      title: formFields.interviewTitle,
      aboutUser: formFields.aboutUser,
      learningObjectives: formFields.learningObjectives,
      downloadUrl,
      transcripts: response.transcripts,
      questions: response.questions,
      id: nanoid(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
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

                <div>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="file"
                      onChange={(e) =>
                        setFile(e.target.files && e.target.files[0])
                      }
                    />
                    <button
                      type="submit"
                      className="py-2 px-2 bg-white rounded-md border-2 border-[#D9D9D9] text-sm text-gray-700"
                    >
                      {uploadState === "initial"
                        ? "Upload"
                        : uploadState === "uploading"
                        ? "Uploading..."
                        : "Uploaded"}
                    </button>
                  </form>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => console.log("new meeting")}
                    className="border-2 border-[#D9D9D9] bg-white px-5 py-2 rounded-md text-sm text-gray-700"
                  >
                    Start Analysis
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
