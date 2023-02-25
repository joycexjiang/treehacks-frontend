import Link from "next/link";
import { Cog8ToothIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Searchbar from "../Searchbar";
import { useEffect, useState } from "react";
import NewMeetingModal from "../NewMeetingModal";
import UploadMeetingModal from "../UploadMeetingModal";

type HeaderProps = {};

const DesktopMenu = () => {
  const [newModalIsOpen, setNewModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

  const handleNewMeetingClick = () => {
    setNewModalIsOpen(true);
  };

  const handleUploadMeetingClick = () => {
    setUploadModalIsOpen(true);
  };

  return (
    <nav className="hidden md:flex flex-grow items-center whitespace-nowrap">
      <Searchbar />
      <div className="flex ml-4 space-x-4">
        <button
          onClick={handleNewMeetingClick}
          className="border-2 border-[#D9D9D9] bg-white px-5 py-2 rounded-xl text-md text-gray-700 overflow-ellipsis text-overflow-ellipsis truncate"
        >
          <span className="hidden md:block">New Meeting</span>
          <span className="md:hidden">New</span>
        </button>
        <button
          onClick={handleUploadMeetingClick}
          className="border-2 border-[#D9D9D9] bg-white px-5 py-2 rounded-xl text-md text-gray-700 overflow-ellipsis text-overflow-ellipsis truncate"
        >
          <span className="hidden md:block">Upload Meeting</span>
          <span className="md:hidden">Upload</span>
        </button>
      </div>
      <NewMeetingModal isOpen={newModalIsOpen} setIsOpen={setNewModalIsOpen} />
      <UploadMeetingModal
        isOpen={uploadModalIsOpen}
        setIsOpen={setUploadModalIsOpen}
      />
    </nav>
  );
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onCloseMobileMenu: () => void;
};

const MobileMenu = ({
  isOpen,
  onClose,
  onCloseMobileMenu,
}: MobileMenuProps) => {
  const [newModalIsOpen, setNewModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

  const handleNewMeetingClick = () => {
    setNewModalIsOpen(true);
    onClose();
    onCloseMobileMenu();
  };

  const handleUploadMeetingClick = () => {
    setUploadModalIsOpen(true);
    onClose();
    onCloseMobileMenu();
  };

  return (
    <nav className={`${isOpen ? "block" : "hidden"} pt-2 pb-4`}>
      <Searchbar />
      <div className="mt-4 space-y-2">
        <button
          onClick={handleNewMeetingClick}
          className="w-full block text-left px-5 py-2 rounded-xl border-2 border-[#D9D9D9] bg-white text-md text-gray-700 overflow-ellipsis text-overflow-ellipsis truncate"
        >
          New Meeting
        </button>
        <button
          onClick={handleUploadMeetingClick}
          className="w-full block text-left px-5 py-2 rounded-xl border-2 border-[#D9D9D9] bg-white text-md text-gray-700 overflow-ellipsis text-overflow-ellipsis truncate"
        >
          Upload Meeting
        </button>
      </div>
      <NewMeetingModal isOpen={newModalIsOpen} setIsOpen={setNewModalIsOpen} />
      <UploadMeetingModal
        isOpen={uploadModalIsOpen}
        setIsOpen={setUploadModalIsOpen}
      />
    </nav>
  );
};

const Header = (props: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        handleCloseMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="px-6 py-8 border-b-2 border-gray-300">
      <div className="flex justify-between">
        <div className="w-64 text-lg">
          <div className="flex flex-col justify-center">
            <Link href="/">Feedback Geenie</Link>
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={handleMobileMenuClick}
            className="text-gray-600 focus:outline-none"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <DesktopMenu />
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        onCloseMobileMenu={handleCloseMobileMenu}
      />
    </header>
  );
};

export default Header;
