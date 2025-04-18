import * as navBtns from "@/components/ui/NavbarBtns";

const GuestHeroSection = () => {
  return (
    <div className="flex flex-col flex-grow sm:px-10">
      <div className="guest-hero relative z-10 font-lato pt-8 sm:pl-24 sm:pt-14">
        <h1 className="text-white z-10 font-semibold text-center tracking-normal text-4xl w-full leading-[2.7rem]">
          Operate Smoothly, Achieve Seamlessly
        </h1>
        <p className="text-white z-10 tracking-normal text-lg mt-6 w-full text-center leading-6 px-5">
          Transform the way you manage projects, from planning to completion,
          with effortless control.
        </p>
      </div>

      <ul className="flex items-center justify-center gap-4 pt-6 pb-16 sm:hidden sm:gap-8">
        <navBtns.NonIconBtn label="Login" to="/login" />
        <navBtns.NonIconBtn label="Sign Up" to="/sign-up" />
      </ul>

      <img
        src={"https://res.cloudinary.com/dcm0pdfet/image/upload/v1744834312/Screenshot_2025-04-17_013824_hp2zox.png"}
        alt="dashboard image"
        className="hero-img perspective-rotate w-[48rem] mx-auto rounded-xl relative right-4 shadow-[1rem_0rem_1.5rem_rgba(0,0,0,0.5)]"
      />
    </div>
  );
};

export default GuestHeroSection;
