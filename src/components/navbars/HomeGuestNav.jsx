import * as navbarComp from "./navbar-items/NavbarComp";

const HomeGuestNav = () => {
  return (
    <nav className="flex justify-between items-center py-5">
      <navbarComp.Logo />

      <ul className="flex items-center gap-4">
        <navbarComp.NonIconBtn label="Login" to='/login' />
        <navbarComp.NonIconBtn label="Sign Up" to='/sign-up' />
      </ul>
    </nav>
  );
};

export default HomeGuestNav;
