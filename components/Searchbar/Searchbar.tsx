import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Searchbar() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching: ", searchText);
    router.push(`/search?q=${encodeURIComponent(searchText)}`);
  };

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <div className="relative flex-grow border-2 flex-row border-[#D9D9D9] bg-white py-2 rounded-xl text-md px-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="inline focus:outline-none w-full"
        />
      </form>
      {searchText && (
        <button
          onClick={handleClear}
          className="absolute top-0 right-0 h-full p-2"
        >
          <XMarkIcon className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>
  );
}
