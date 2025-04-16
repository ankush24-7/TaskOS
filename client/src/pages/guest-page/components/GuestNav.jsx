import Logo from "@/components/ui/Logo";
import * as navBtns from "@/components/ui/NavbarBtns";
import { activityBarIcons } from "@/assets/icons/icons";

const GuestNav = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-3 border-b border-white sm:px-10 sm:py-5 sm:border-0">
      <Logo />
      <ul className="sm:flex items-center gap-4 hidden sm:gap-8">
        <navBtns.NonIconBtn label="Login" to="/login" />
        <navBtns.NonIconBtn label="Sign Up" to="/sign-up" />
      </ul>

      <activityBarIcons.Menu stroke="white" className="sm:hidden" />
    </nav>
  );
};

export default GuestNav;
