import User from "./navbar-items/User";
import { Link } from "react-router-dom";
import * as navbarComp from "./navbar-items/NavbarComp";
import { homeNavIcons, activityBarIcons } from "../../assets/icons/icons";

const HomeUserNav = () => {
  return (
    <nav className='flex gap-8 px-3 py-5 justify-between items-center sm:px-10'>
      <Link to="/home" className='flex items-end -translate-x-3 scale-95 sm:hidden'>
        <activityBarIcons.LogoIcon className="w-12 h-12 fixed translate-x-1 -translate-y-1.5" />
        <p className="text-white act-bar-label text-4xl ml-[2.75rem] overflow-hidden font-inconsolata">
          TaskOS
        </p>
      </Link>
      
      <span className="hidden sm:flex">
        <navbarComp.IconBtn 
          label="Customize"
          Icon={() => <homeNavIcons.Pen className="w-4 h-4" stroke="#fff" />}
          gap='2' 
        />
      </span>

      <ul className="flex items-center sm:gap-8">
        <span className="hidden gap-8 sm:flex">
          <navbarComp.RoundBtn Icon={ homeNavIcons.Bell } />
          <navbarComp.RoundBtn Icon={ homeNavIcons.AddTask } />
        </span>
        <User />
      </ul>
    </nav>
  );
};

export default HomeUserNav;
