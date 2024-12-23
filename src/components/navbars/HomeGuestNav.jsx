import * as navbarComp from "./navbar-items/NavbarComp";

const HomeGuestNav = () => {
  return (
    <nav className="flex justify-between items-center py-5">
      <h1 className="text-5xl text-white font-inconsolata">TaskOS</h1>

      <ul className="flex items-center gap-4">
        <navbarComp.NonIconBtn label="Login" to='/login' />
        <navbarComp.NonIconBtn label="Sign Up" to='/sign-up' />
      </ul>
    </nav>
  );
};

export default HomeGuestNav;
