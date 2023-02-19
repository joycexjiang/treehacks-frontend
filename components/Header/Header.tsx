import Link from "next/link";
import Image from "next/image";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import Searchbar from "../Searchbar";
import { useState } from "react";
import NewMeetingModal from "../NewMeetingModal/NewMeetingModal";
import UploadMeetingModalTsx from "../UploadMeetingModal.tsx";

export default function Header() {
  const [modalisOpen, setModalisOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

  return (
    <>
      <div className="px-6 py-8 border-b-2">
        <div className="flex justify-between">
          <div className="w-64 text-lg">
            <div className="flex flex-col justify-center">
              <Link href="/">ChatQuery</Link>
            </div>
          </div>
          <div className="flex flex-grow justify-between gap-4">
            <Searchbar />
            <div>
              <button
                onClick={() => setModalisOpen(true)}
                className="border-2 border-[#D9D9D9] bg-white px-5 py-2 rounded-xl text-md text-gray-700"
              >
                New Meeting
              </button>
            </div>
            <div>
              <button
                onClick={() => setUploadModalIsOpen(true)}
                className="border-2 border-[#D9D9D9] bg-white px-5 py-2 rounded-xl text-md text-gray-700"
              >
                Upload Meeting
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={() => console.log("open settings")}
                className="border-[1px] border-[#D9D9D9] bg-white px-2 py-2 rounded-full text-md text-gray-700"
              >
                <Cog8ToothIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <NewMeetingModal isOpen={modalisOpen} setIsOpen={setModalisOpen} />
      <UploadMeetingModalTsx
        isOpen={uploadModalIsOpen}
        setIsOpen={setUploadModalIsOpen}
      />
    </>
  );
}
