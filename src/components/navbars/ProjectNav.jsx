import User from "./navbar-items/User";
import { projectNavIcons } from "../../assets/icons/icons";
import * as navbarComp from "./navbar-items/NavbarComp";

const ProjectNav = () => {
  return (
    <nav className="flex gap-8 py-5 items-center justify-between">
      <h1 className="text-white text-3xl">Projects</h1>

      <div className="flex items-center gap-8">
        <ul className="flex flex-row-reverse gap-4 items-center">
          <navbarComp.IconBtn
            label="New Project"
            Icon={() => (
              <projectNavIcons.Sparkles className="w-5 h-5" stroke="#fff" />
            )}
          />
          <navbarComp.IconBtn
            label="Customize"
            Icon={() => (
              <projectNavIcons.Pen className="w-4 h-4" stroke="#fff" />
            )}
          />
        </ul>

        <ul className="flex flex-row-reverse gap-8 items-center">
          <User />
          <navbarComp.RoundBtn Icon={projectNavIcons.AddTask} />
          <navbarComp.RoundBtn Icon={projectNavIcons.Bell} />
        </ul>
      </div>
    </nav>
  );
};

export default ProjectNav;
