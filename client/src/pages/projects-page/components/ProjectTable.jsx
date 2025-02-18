import AddBtn from "@components/ui/AddBtn";
import { SortIcon } from "@/assets/icons/icons";

const ProjectTable = ({ projects, sort, setSort, order, setOrder }) => {
  const titles = [
    ["Title", "32%"],
    ["Status", "17%"],
    ["Updated At", "17%"],
    ["Deadline", "17%"],
    ["Created By", "17%"],
  ];

  const handleSortChange = (title) => {
    if(title === sort) return;
    setSort(title.replaceAll(" ", "").toLowerCase());
    setOrder("desc");
  }

  const handleOrderChange = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  }

  const isSelected = (title) => {
    return title.replaceAll(" ", "").toLowerCase() === sort.toLowerCase();
  }

  const renderHeader = () => {
    return titles.map(([title, width], index) => (
      <th key={index} style={{ width }} className="pl-3 flex items-center gap-3">
        <button
          onClick={() => handleSortChange(title)}
          className="text-gray-300 hover:text-white font-normal">
          {title}
        </button>
        <button onClick={handleOrderChange}>
          {isSelected(title) && (
            <SortIcon className={`w-[0.9rem] h-[0.9rem] fill-prim-yellow-200 hover:fill-prim-yellow-50 
              ${ order === "desc" ? "rotate-180" : "" }`}
            />
          )}
        </button>
      </th>
    ));
  };

  return (
    <>
      <table className="flex flex-col flex-grow max-h-[31rem] mt-1 pb-2 rounded-lg sm:bg-prim-black/10">
        <thead>
          <tr className="w-full hidden sm:flex p-2 text-lg rounded-t-lg divide-x-[1px] divide-opacity-0 hover:divide-opacity-100 divide-gray-400 bg-prim-black"> 
            {renderHeader()}
          </tr>
        </thead>

        <tbody className="w-full px-2 overflow-y-scroll vertical-scrollbar">
          {projects}
        </tbody>

      </table>
      <AddBtn />
    </>
  );
};

export default ProjectTable;
