import * as navbarComp from "@navbtns";
import { projectNavIcons } from "@icons";
import User from "@/components/ui/User";
import SearchBtn from "@components/ui/SearchBtn";

const ProjectNav = () => {
  return (
    <header className="flex justify-between items-center flex-col gap-6 py-2 px-3 sm:flex-row sm:py-5 sm:px-0">
      <h1 className="text-white text-3xl sm:text-4xl">Projects</h1>
      <SearchBtn />
      
      <nav className="flex items-center gap-8">
        <navbarComp.IconBtn
          label="Add Project"
          Icon={() => (
            <projectNavIcons.Sparkles className="w-5 h-5" stroke="#fff" />
          )}
        />
        <navbarComp.RoundBtn Icon={projectNavIcons.Bell} />
        <User />
      </nav>

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
