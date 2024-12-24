import { Link } from "react-router-dom";
import * as navbarComp from "./navbar-items/NavbarComp";
import { activityBarIcons } from "../../assets/icons/icons";

const HomeGuestNav = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-3 border-b border-white sm:px-10 sm:py-5 sm:border-0">
      <Link to="/home" className='flex items-center -translate-x-4 sm:scale-100'>
        <activityBarIcons.LogoIcon className="logo w-8 h-8 fixed translate-x-4 -translate-y-1" />
        <p className="text-white act-bar-label text-3xl ml-[2.75rem] font-inconsolata sm:text-4xl">
          TaskOS
        </p>
      </Link>

      <ul className="sm:flex items-center gap-4 hidden sm:gap-8">
        <navbarComp.NonIconBtn label="Login" to='/login' />
        <navbarComp.NonIconBtn label="Sign Up" to='/sign-up' />
      </ul>

      <activityBarIcons.Menu stroke="white" className="sm:hidden" />
    </nav>
  );
};

export default HomeGuestNav;
