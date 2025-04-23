import User from "@/components/ui/User";
import useDropDown from "@/hooks/useDropDown";
import { useNavigate } from "react-router-dom";
import SearchBtn from "@/components/ui/SearchBtn";
import projectAPI from "@/services/api/projectAPI";
import * as navbarComp from "@/components/ui/NavbarBtns";
import { projectHeaderIcons } from "@/assets/icons/icons";
import MobileDropDown from "@/components/dropdowns/MobileDropDown";

const ProjectNav = ({ sort, setSort, order, setOrder, search, setSearch, showArchived, setShowArchived }) => {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useDropDown();

  const openNewProject = async () => {
    const response = await projectAPI.createProject({ title: "untitled" });
    if (response.status === 201) navigate(`/projects/${response._id}/dashboard/?new=true`);
    else console.log(response.data);
  };

  const sortDropdownBtn = (title) => {
    const isSelected = title.replaceAll(" ", "").toLowerCase() === sort.toLowerCase();
    return (
      <button
        onClick={() => {
          setSort(title.replaceAll(" ", "").toLowerCase());
          setOrder(isSelected && order === "desc" ? "asc" : "desc");
          setIsOpen(false);
        }}
        className="w-full flex px-5 py-3.5 items-center justify-between cursor-pointer rounded-xl bg-black/50">
        <p className={`text-xl ${isSelected ? "text-prim-yellow-100" : "text-white"}`}>{title}</p>
        {isSelected && (
          <projectHeaderIcons.ArrowIcon className={`w-4 h-4 stroke-3 stroke-prim-yellow-100 ${order === "asc" && "rotate-180"}`} />
        )}
      </button>
    );
  }

  return (
    <header className="flex flex-col justify-between items-center gap-2 md:flex-row pt-1 md:py-3">
      <div className="w-full flex justify-between items-center">
        <span className="flex items-center md:gap-4 lg:gap-6">
          <h1 className="text-white text-3xl md:text-4xl">Projects</h1>
          <span className="hidden md:block">
            <SearchBtn 
              placeholder="Find project..."
              search={search} 
              setSearch={setSearch}
            />
          </span>
        </span>
        
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <navbarComp.IconBtn
            onClick={openNewProject}
            label= {window.innerWidth > 768 ? "New Project" : "New"}
            Icon={() => (
              <projectHeaderIcons.Sparkles className="w-4.5 h-4.5 md:w-5 md:h-5 group-hover:stroke-prim-yellow-50" stroke="#fff" />
            )}
          />
          <button
            aria-label={showArchived ? "Hide Archived" : "Show Archived"}
            onClick={() => setShowArchived(!showArchived)}
            style={{ backgroundColor: showArchived ? "#111" : "" }}
            className="round-btn-hov-expand w-9 h-9 flex cursor-pointer items-center justify-center rounded-3xl hover:bg-prim-black active:bg-prim-black/10">
            <projectHeaderIcons.Archive />
          </button>
          <User />
        </div>
      </div>

      <div className="flex items-center gap-4 pr-2 justify-between w-full md:hidden">
        <SearchBtn 
          placeholder="Find a project..."
          search={search} 
          setSearch={setSearch}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center cursor-pointer">
          <projectHeaderIcons.SortIcon className="w-7 h-7 stroke-white" />
        </button>

        {isOpen && (
          <MobileDropDown
            header="Sort By"
            bgColor="#1c1917"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            children={
              <div className="flex flex-col p-1 pb-4 gap-1.5 bg-stone-900">
                {sortDropdownBtn("Title")}
                {sortDropdownBtn("Status")}
                {sortDropdownBtn("Updated At")}
                {sortDropdownBtn("Deadline")}
                {sortDropdownBtn("Created By")}
              </div>
            }
          />
        )}
      </div>
    </header>
  );
};

export default ProjectNav;
