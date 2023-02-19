import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import Searchbar from "../Searchbar";
import { useState } from "react";
import NewMeetingModal from "../NewMeetingModal/NewMeetingModal";

export default function Header() {
  const [modalisOpen, setModalisOpen] = useState(false);

  return (
    <>
      <div className="px-6 py-8 border-b-2">
        <div className="flex justify-between">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col justify-center">
              <button
                onClick={() => console.log("new meeting")}
                className="border-[1px] border-[#D9D9D9] bg-white px-2 py-2 rounded-full text-md text-gray-700"
              >
                <Cog8ToothIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={() => console.log("new meeting")}
                className="border-[1px] border-[#D9D9D9] bg-white px-2 py-2 rounded-full text-md text-gray-700"
              >
                <Cog8ToothIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div className="flex flex-col justify-center">
              <button
                onClick={() => console.log("new meeting")}
                className="border-[1px] border-[#D9D9D9] bg-white px-2 py-2 rounded-full text-md text-gray-700"
              >
                <Cog8ToothIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={() => console.log("new meeting")}
                className="border-[1px] border-[#D9D9D9] bg-white px-2 py-2 rounded-full text-md text-gray-700"
              >
                <Cog8ToothIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={() => console.log("new meeting")}
                className="border-[1px] border-[#D9D9D9] bg-white px-2 py-2 rounded-full text-md text-gray-700"
              >
                <Cog8ToothIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <NewMeetingModal isOpen={modalisOpen} setIsOpen={setModalisOpen} />
    </>
  );
}
