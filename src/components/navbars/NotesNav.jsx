import User from "./navbar-items/User";
import { projectNavIcons } from "../../assets/icons/icons";
import * as navbarComp from "./navbar-items/NavbarComp";

const NotesNav = () => {
  return (
    <nav className="flex gap-8 py-5 justify-between">
      <h1 className="text-white text-4xl">Notes</h1>

      <div className="flex items-center gap-8">
        <ul className="flex gap-4 items-center">
          <navbarComp.IconBtn
            label="Add Note"
            Icon={() => (
              <projectNavIcons.Sparkles className="w-5 h-5" stroke="#fff" />
            )}
          />
        </ul>

        <ul className="flex gap-8 items-center">
          <navbarComp.RoundBtn Icon={projectNavIcons.Bell} />
          <navbarComp.RoundBtn Icon={projectNavIcons.AddTask} />
          <User />
        </ul>
      </div>
    </nav>
  );
};

export default NotesNav;
