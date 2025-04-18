import Logo from "@/components/ui/Logo";
import * as navBtns from "@/components/ui/NavbarBtns";

const GuestNav = () => {
  return (
    <nav className="flex justify-between items-center py-2 sm:px-10 sm:py-5">
      <span className="scale-90 -translate-x-3 sm:scale-100 sm:-translate-x-0">
        <Logo />
      </span>
      <ul className="hidden sm:flex sm:items-center sm:gap-8">
        <navBtns.NonIconBtn label="Login" to="/login" />
        <navBtns.NonIconBtn label="Sign Up" to="/sign-up" />
      </ul>
    </nav>
  );
};

export default GuestNav;
