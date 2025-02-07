import * as navBtns from "@navbtns";
import { projectNavIcons } from "@icons";
import User from "@/components/ui/User";
import SearchBtn from "@/components/ui/SearchBtn";

const NotesNav = () => {
  return (
    <nav className="flex justify-between gap-8 py-2 sm:py-5">
      <h1 className="text-white text-3xl sm:text-4xl">Notes</h1>

      <div className="hidden sm:flex items-center gap-8">
        <ul className="flex gap-4 items-center">
          <navBtns.IconBtn
            label="Add Note"
            Icon={() => (
              <projectNavIcons.Sparkles className="w-5 h-5" stroke="#fff" />
            )}
          />
        </ul>

        <ul className="flex gap-8 items-center">
          <SearchBtn />
          <navBtns.RoundBtn Icon={projectNavIcons.Bell} />
          <navBtns.RoundBtn Icon={projectNavIcons.AddTask} />
          <User />
        </ul>
      </div>

      <span className="sm:hidden">
        <User />
      </span>
    </nav>
  );
};

export default NotesNav;
