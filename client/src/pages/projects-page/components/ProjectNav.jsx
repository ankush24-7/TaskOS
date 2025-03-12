import * as navbarComp from "@navbtns";
import User from "@components/ui/User";
import { projectNavIcons } from "@icons";
import { useNavigate } from "react-router-dom";
import SearchBtn from "@components/ui/SearchBtn";
import projectAPI from "@/services/api/projectAPI";

const ProjectNav = ({ search, setSearch, showArchived, setShowArchived }) => {
  const navigate = useNavigate();

  const toggleArchived = () => setShowArchived(!showArchived);
  const openNewProject = async () => {
    const response = await projectAPI.createProject({ title: "untitled" });
    if (response.status === 201) navigate(`/projects/${response._id}/dashboard/?new=true`);
    else console.log(response.data);
  };

  return (
    <header className="flex justify-between items-center flex-col gap-6 py-2 px-3 sm:flex-row sm:py-3 sm:px-0">
      <h1 className="text-white text-3xl sm:text-4xl">Projects</h1>
      <SearchBtn 
        placeholder="Find a project..."
        search={search} 
        setSearch={setSearch}
      />
      
      <div className="flex items-center gap-8">
        <navbarComp.IconBtn
          onClick={openNewProject}
          label="New Project"
          Icon={() => (
            <projectNavIcons.Sparkles className="w-5 h-5 group-hover:stroke-prim-yellow-50" stroke="#fff" />
          )}
        />
        <button
          aria-label={showArchived ? "Hide Archived" : "Show Archived"}
          onClick={toggleArchived}
          style={{ backgroundColor: showArchived ? "#111" : "" }}
          className="round-btn-hov-expand w-9 h-9 flex cursor-pointer items-center justify-center rounded-3xl hover:bg-prim-black active:bg-prim-black/10">
          <projectNavIcons.Archive />
        </button>
        <navbarComp.RoundBtn Icon={projectNavIcons.Bell} />
        <User />
      </div>

      <div className="relative w-full sm:hidden">
        <projectNavIcons.SearchIcon className="absolute top-1/2 -translate-y-1/2 ml-1 stroke-prim-black" />
        <input
          type="text"
          placeholder="Search"
          // onChange={handleChange}
          className="w-full rounded-lg pl-8 pr-2 py-2 focus:outline-none"
        />
      </div>
    </header>
  );
};

export default ProjectNav;
