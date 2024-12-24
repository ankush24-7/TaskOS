import * as navbarComp from "../navbars/navbar-items/NavbarComp";

const HeroSectionGuest = () => {
  return (
    <div className="flex flex-col flex-grow px-5 sm:px-10">
      <div className="guest-hero relative z-10 font-lato pt-10 sm:pl-24 sm:pt-14">
        <h1 className="text-white z-10 font-semibold text-center tracking-normal text-4xl w-full leading-[2.7rem]">
          Operate Smoothly, Achieve Seamlessly
        </h1>
        <p className="text-white z-10 tracking-normal text-lg mt-6 w-full text-center leading-6 px-5">
          Transform the way you manage projects, from planning to completion, with effortless control.
        </p>
      </div>

      <ul className="flex items-center justify-center gap-4 pt-6 pb-16 sm:hidden sm:gap-8">
        <navbarComp.NonIconBtn label="Login" to='/login' />
        <navbarComp.NonIconBtn label="Sign Up" to='/sign-up' />
      </ul>

      <img
        src="src\assets\Screenshot 2024-10-13 122519.png"
        alt="dashboard image"
        className="hero-img rotate w-[48rem] mx-auto rounded-xl relative right-4"
      />
    </div>
  );
};

export default HeroSectionGuest;
