import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type NewMeetingModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function NewMeetingModal({
  isOpen,
  setIsOpen,
}: NewMeetingModalProps) {
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
                  <textarea className="w-full h-24 border-2 border-gray-300 rounded-lg p-2" />
                </div>
                <div className="mb-6">
                  <h3 className="font-bold mb-1 text-sm">About the user</h3>
                  <textarea className="w-full h-20 border-2 border-gray-300 rounded-lg p-2" />
                </div>
                <div className="mb-6">
                  <h3 className="font-bold mb-1 text-sm">
                    Learning Objectives
                  </h3>
                  <textarea className="w-full h-48 border-2 border-gray-300 rounded-lg p-2" />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => console.log("new meeting")}
                    className="border-2 border-[#D9D9D9] bg-white px-5 py-2 rounded-md text-sm text-gray-700"
                  >
                    Start Recording
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
