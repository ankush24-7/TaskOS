import User from "./navbar-items/User";
import * as navbarComp from "./navbar-items/NavbarComp";
import { projectNavIcons } from "../../assets/icons/icons";

const ProjectNav = () => {
  return (
    <nav className="flex gap-8 py-5 justify-between">
      <h1 className="text-white text-4xl">Projects</h1>

      <div className="flex items-center gap-8">
        <ul className="flex gap-4 items-center">
          <navbarComp.IconBtn
            label="Add Project"
            Icon={() => (
              <projectNavIcons.Sparkles className="w-5 h-5" stroke="#fff" />
            )}
          />
        </ul>

        <ul className="flex gap-8 items-center">
          <navbarComp.SearchBtn />
          <navbarComp.RoundBtn Icon={projectNavIcons.Bell} />
          <navbarComp.RoundBtn Icon={projectNavIcons.AddTask} />
          <User />
        </ul>
      </div>
    </nav>
  );
};

export default ProjectNav;
