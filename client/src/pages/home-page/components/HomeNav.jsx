import * as navBtns from "@navbtns";
import { Link } from "react-router-dom";
import User from "@components/navbar-items/User";
import { homeNavIcons, activityBarIcons } from "@icons";

const HomeNav = () => {
  return (
    <nav className="flex gap-8 justify-between py-2 px-3 sm:px-10 sm:py-5">
      <Link to="/home" className="flex items-center -translate-x-4 sm:hidden">
        <activityBarIcons.LogoIcon className="logo w-8 h-8 fixed translate-x-4 -translate-y-1" />
        <p className="text-white act-bar-label text-3xl ml-[2.75rem] font-inconsolata sm:text-4xl">
          TaskOS
        </p>
      </Link>

      <span className="hidden sm:flex">
        <navBtns.IconBtn
          label="Customize"
          Icon={() => <homeNavIcons.Pen className="w-4 h-4" stroke="#fff" />}
          gap="2"
        />
      </span>

      <ul className="flex items-center sm:gap-8">
        <span className="hidden gap-8 sm:flex">
          <navBtns.RoundBtn Icon={homeNavIcons.Bell} />
          <navBtns.RoundBtn Icon={homeNavIcons.AddTask} />
        </span>
        <User />
      </ul>
    </nav>
  );
};

export default HomeNav;
