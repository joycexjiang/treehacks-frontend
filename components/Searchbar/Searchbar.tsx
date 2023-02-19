import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Header from "../Header";

export default function Searchbar() {
  return (
    <div className="flex-grow border-2 flex-row border-[#D9D9D9] bg-white py-2 rounded-xl text-sm ">
      <input
        type="text"
        // value={"filterText"}
        // onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search"
        className="inline focus:outline-none ml-3 flex-1"
      ></input>
    </div>
  );
}
