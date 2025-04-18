import { TriangleIcon } from "@/assets/icons/icons";
import ProjectCardLoader from "@/components/loaders/ProjectCardLoader";
import ProjectTableLoader from "@/components/loaders/ProjectTableLoader";

const ProjectTable = ({ projects, sort, setSort, order, setOrder, isLoading, showArchived }) => {
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
      <span key={index} style={{ width }} className="pl-3 flex items-center gap-3">
        <button
          onClick={() => handleSortChange(title)}
          className="cursor-pointer font-normal text-gray-300 hover:text-white">
          {title}
        </button>
        <button className="cursor-pointer" onClick={handleOrderChange}>
          {isSelected(title) && (
            <TriangleIcon className={`w-[0.9rem] h-[0.9rem] fill-prim-yellow-200 hover:fill-prim-yellow-50 
              ${ order === "desc" ? "rotate-180" : "" }`}
            />
          )}
        </button>
      </span>
    ));
  };

  return (
    <div className="flex flex-col flex-grow max-h-[31rem] mt-1 py-0.5 sm:py-0 mx-3 sm:mx-0 rounded-2xl sm:rounded-3xl bg-stone-900">
      <div className="w-full hidden sm:flex p-2 text-lg rounded-t-3xl divide-x divide-gray-400/0 hover:divide-gray-400 bg-prim-black"> 
        {renderHeader()}
      </div>

      <div className="w-full px-2 pt-0.5 overflow-y-scroll vertical-scrollbar">
        {isLoading ? (
          <div className="flex flex-col gap-0.5">
            <ProjectTableLoader />
            <ProjectTableLoader />
            <ProjectTableLoader />
            <ProjectCardLoader />
            <ProjectCardLoader />
            <ProjectCardLoader />
          </div>
        ) : (
          projects.length === 0 ? (
            <p className="text-xl text-center mt-40 text-gray-400 whitespace-pre-line">
              {showArchived 
                ? "No archived projects" 
                : `No projects found.\n Start a new project to see it here !`
              }
            </p>
          ): (
            projects
          )
        )}
      </div>
    </div>
  );
};

export default ProjectTable;
