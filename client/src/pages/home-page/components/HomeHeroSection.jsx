import AddBtn from "@components/ui/AddBtn";

const HomeHeroSection = ({ date, time }) => {
  return (
    <div className="w-full flex py-10 sm:justify-between sm:px-10">
      <div className="flex flex-col items-center gap-1 sm:items-start">
        <h1 className="text-white font-medium leading-none -translate-x-1.5 text-7xl sm:text-[90px] sm:font-semibold">
          {time}
        </h1>
        <h2 className="text-white leading-none text-2xl sm:text-3xl">
          {date}
        </h2>
      </div>

      <section className="bg-[#111]/10 w-80 h-96 rounded-lg hidden sm:block">
        <div className="rounded-t-lg p-3 bg-[#111]/40">
          <p className="text-white text-lg">Deadlines</p>
        </div>
      </section>

      <AddBtn />
    </div>
  );
};

export default HomeHeroSection;
