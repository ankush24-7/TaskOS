import Logo from "@/components/ui/Logo";
import { NonIconBtn } from "@/components/ui/NavbarBtns";

const GuestNav = () => {
  return (
    <header className="flex justify-between items-center px-2 py-3 lg:px-10 lg:py-5">
      <span className="scale-90 -translate-x-3 md:scale-100 lg:-translate-x-0">
        <Logo />
      </span>
      <ul className="hidden lg:flex lg:items-center lg:gap-8">
        <NonIconBtn label="Login" to="/login" />
        <NonIconBtn label="Sign Up" to="/sign-up" />
      </ul>
    </header>
  );
};

export default GuestNav;
