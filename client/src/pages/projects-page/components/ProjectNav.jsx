import * as navbarComp from "@navbtns";
import User from "@components/ui/User";
import { Link, useNavigate } from "react-router-dom";
import { projectNavIcons } from "@icons";
import SearchBtn from "@components/ui/SearchBtn";
import projectAPI from "@/services/api/projectAPI";

const ProjectNav = ({ search, setSearch }) => {
  const navigate = useNavigate();

  const openNewProject = async () => {
    const project = { title: "untitled" };
    const { status, _id } = await projectAPI.createProject(project);
    if (status === 200) {
      navigate(`/projects/${_id}/dashboard/`);
    } else {
      console.log(`Error ${status}: ${message}`);
    }
  }

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
