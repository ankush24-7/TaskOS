import React, { useState } from "react";
import { SearchIcon, Close } from "@icons";

const SearchBtn = ({ SearchBtn }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search"
        className={`expand-left rounded-l-full px-4 focus:outline-none text-white placeholder:text-[#dcdcdc] bg-[#111] ${
          isSearchExpanded ? "w-44" : "w-0 absolute -z-10"
        }`}
      />
      <button
        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
        className={`p-1.5 w-fit rounded-3xl hover:bg-[#111] ${
          isSearchExpanded && "bg-[#111] rounded-r-full py-2.5"
        }`}>
        {isSearchExpanded ? (
          <Close stroke="#fff" className="w-5 h-5" />
        ) : (
          <SearchIcon />
        )}
      </button>
    </div>
  );
};

export default SearchBtn;
