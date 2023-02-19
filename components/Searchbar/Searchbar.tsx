import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../Header";

export default function Searchbar() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="flex-grow border-2 flex-row border-[#D9D9D9] bg-white py-2 rounded-xl text-md px-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="inline focus:outline-none w-full"
        ></input>
      </form>
    </div>
  );
}
