import AddBtn from "@components/ui/AddBtn";
import { useEffect, useState } from "react";
import { SortIcon } from "@/assets/icons/icons";

/*
  1. send the updated value of sort & order to userPreferences router after fetching the data
*/

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

  useEffect(() => {
    console.log("User changed sort by");
  }, [sortBy]);

  useEffect(() => {
    console.log("User changed order");
  }, [order]);

  const renderHeader = () => {
    return titles.map(([title, width], index) => (
      <th key={index} style={{ width }} className="pl-3 flex items-center gap-3">
        <button
          onClick={() => handleSortChange(title)}
          className="text-gray-300 hover:text-white font-normal">
          {title}
        </button>
        <button onClick={handleOrderChange}>
          {title === sortBy && (
            <SortIcon className={`w-[0.9rem] h-[0.9rem] fill-prim-yellow-50 hover:fill-prim-yellow-200 ${
              order === "desc" ? "rotate-180" : ""
            }`}/>
          )}
        </button>
      </th>
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
    <>
      <table className="flex flex-col h-[31rem] mt-2 pb-2 rounded-lg sm:bg-prim-black/10">
        <thead>
          <tr className="w-full hidden sm:flex p-2 text-lg rounded-t-lg  divide-x-[1px] divide-opacity-0 hover:divide-opacity-100 divide-gray-400 bg-prim-black"> 
            {renderHeader()}
          </tr>
        </thead>

        {projects}

      </table>
      <AddBtn />
    </>
  );
};

export default ProjectTable;
