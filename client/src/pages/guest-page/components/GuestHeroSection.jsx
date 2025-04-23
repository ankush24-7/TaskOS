import * as navBtns from "@/components/ui/NavbarBtns";

const GuestHeroSection = () => {
  return (
    <div className="flex flex-col flex-grow lg:px-10">
      <div className="w-full relative z-10 font-lato pt-4 md:pt-0 lg:pl-24 lg:pt-8">
        <h1 
          className="max-w-80 md:max-w-105 lg:max-w-80 md:font-medium lg:font-semibold text-center lg:text-start 
          mx-auto lg:mx-0 text-3xl md:text-5xl lg:text-6xl text-white">
          Operate Smoothly, Achieve Seamlessly
        </h1>
        <p className="max-w-90 md:max-w-120 lg:max-w-100 text-lg md:text-2xl -tracking-tighter leading-5.5 md:leading-7 mx-auto lg:mx-0 text-center lg:text-left mt-4 text-white">
          Transform the way you manage projects, from planning to completion,
          with effortless control.
        </p>
      </div>

      <ul className="flex items-center justify-center gap-4 pt-6 pb-12 lg:hidden lg:gap-8">
        <navBtns.NonIconBtn label="Login" to="/login" />
        <navBtns.NonIconBtn label="Sign Up" to="/sign-up" />
      </ul>

      <img
        src={"https://res.cloudinary.com/dcm0pdfet/image/upload/v1744834312/Screenshot_2025-04-17_013824_hp2zox.png"}
        alt="dashboard image"
        className="relative right-4 w-[35rem] lg:absolute lg:top-1/5 lg:right-1/20 lg:w-[48rem] perspective-rotate mx-auto rounded-xl shadow-[1rem_0rem_1.5rem_rgba(0,0,0,0.5)]"
      />
    </div>
  );
};

export default GuestHeroSection;
