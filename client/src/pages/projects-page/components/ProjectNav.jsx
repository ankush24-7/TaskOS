import User from "@/components/ui/User";
import { useNavigate } from "react-router-dom";
import SearchBtn from "@/components/ui/SearchBtn";
import projectAPI from "@/services/api/projectAPI";
import * as navbarComp from "@/components/ui/NavbarBtns";
import { projectHeaderIcons } from "@/assets/icons/icons";

const ProjectNav = ({ search, setSearch, showArchived, setShowArchived }) => {
  const navigate = useNavigate();

  const toggleArchived = () => setShowArchived(!showArchived);

  const openNewProject = async () => {
    const response = await projectAPI.createProject({ title: "untitled" });
    if (response.status === 201) navigate(`/projects/${response._id}/dashboard/?new=true`);
    else console.log(response.data);
  };

  return (
    <header className="flex flex-col justify-between items-center gap-3 py-2 px-3 sm:flex-row sm:py-3 sm:px-0">
      <div className="w-full flex justify-between items-center">
        <span className="flex items-center sm:gap-6">
          <h1 className="text-white text-3xl sm:text-4xl">Projects</h1>
          <span className="hidden sm:block">
            <SearchBtn 
              placeholder="Find a project..."
              search={search} 
              setSearch={setSearch}
            />
          </span>
        </span>
        
        <div className="flex items-center gap-4 sm:gap-8">
          <navbarComp.IconBtn
            onClick={openNewProject}
            label="New"
            Icon={() => (
              <projectHeaderIcons.Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:stroke-prim-yellow-50" stroke="#fff" />
            )}
          />
          <button
            aria-label={showArchived ? "Hide Archived" : "Show Archived"}
            onClick={toggleArchived}
            style={{ backgroundColor: showArchived ? "#111" : "" }}
            className="round-btn-hov-expand w-9 h-9 flex cursor-pointer items-center justify-center rounded-3xl hover:bg-prim-black active:bg-prim-black/10">
            <projectHeaderIcons.Archive />
          </button>
          <User />
        </div>
      </div>

      <div className="flex w-full sm:hidden">
        <SearchBtn 
          placeholder="Find a project..."
          search={search} 
          setSearch={setSearch}
        />
      </div>
    </header>
  );
};

export default ProjectNav;
