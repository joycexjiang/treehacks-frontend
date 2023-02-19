import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MeetingSidebar({ data }: any) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-96 bg-white h-screen px-10 py-10">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl">{data?.title ?? ""}</h2>
        <button
          onClick={() => setOpen(false)}
          className="bg-white rounded-full p-2"
        >
          Done
        </button>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-1 text-sm">About the user</h3>
        <textarea
          className="w-full h-20 border-2 border-gray-300 rounded-lg p-2"
          value={data?.aboutUser ?? ""}
        />
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-1 text-sm">Learning Objectives</h3>
        <textarea
          className="w-full h-48 border-2 border-gray-300 rounded-lg p-2"
          value={data?.learningObjectives ?? ""}
        />
      </div>
    </div>
  );
}
