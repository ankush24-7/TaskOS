import { useState } from "react";
import AddBtn from "@components/ui/AddBtn";
import { SortIcon } from "@/assets/icons/icons";

const ProjectTable = ({ projects }) => {
  const [sortBy, setSortBy] = useState("Created On");
  const [order, setOrder] = useState("asc");
  const titles = [
    ["Title", "32%"],
    ["Status", "17%"],
    ["Created On", "17%"],
    ["Deadline", "17%"],
    ["Created By", "17%"],
  ];

  const renderHeader = () => {
    return titles.map(([title, width], index) => (
      <div key={index} style={{ width }} className="pl-3 flex items-center gap-3">
        <button
          onClick={() => handleSortChange(title)}
          className="text-gray-300 hover:text-white">
          {title}
        </button>
        <button onClick={handleOrderChange}>
          {title === sortBy && (
            <SortIcon className={`w-[0.9rem] h-[0.9rem] hover:fill-white ${order === "desc" ? "rotate-180" : ""}`} />
          )}
        </button>
      </div>
    ));
  };

  const handleSortChange = (title) => {
    if (title === sortBy) return;
    setSortBy(title);
    setOrder("asc");
  };

  const handleOrderChange = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  return (
    <table className="flex flex-col h-[31rem] mt-2 pb-2 rounded-lg sm:bg-prim-black/10">
      <div className="w-full hidden sm:flex p-2 text-lg rounded-t-lg divide-x-[1px] divide-[#fff]/0 hover:divide-gray-400 bg-[#111]">
        {renderHeader()}
      </div>

      {projects}

      <AddBtn />
    </table>
  );
};

export default ProjectTable;
