const HeroSectionGuest = () => {
  return (
    <>
      <div className="pl-20 pt-16 pb-24 relative z-10 font-lato">
        <h1 className="text-white z-10 text-6xl font-semibold max-w-80 tracking-wider">
          Operate Smoothly, Achieve Seamlessly
        </h1>
        <p className="text-white z-10 text-2xl mt-4 max-w-[25rem] tracking-wider">
          Transform the way you manage projects, from planning to completion,
          with effortless control.
        </p>
      </div>

      <img
        src="src\assets\Screenshot 2024-10-13 122519.png"
        alt="dashboard image"
        className="absolute top-[17%] right-[7%] rotate w-[48rem] mt-10 mx-auto rounded-xl"
      />
    </>
  );
};

export default HeroSectionGuest;
