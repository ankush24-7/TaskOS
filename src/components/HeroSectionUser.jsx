import { Plus } from "../assets/icons/icons";
import React, { useState, useEffect } from "react";

const HeroSectionUser = () => {
  const user = "Ankush";
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 800);

    return () => clearInterval(intervalId);
  });

  const formatTime = (time) => {
    const hourFormat24 = time.getHours();
    const hourFormat12 = ("0" + (time.getHours() % 12)).slice(-2);
    const min = ("0" + time.getMinutes()).slice(-2);
    const meridiem = hourFormat24 < 12 ? "AM" : "PM";
    return `${hourFormat12 === "00" ? "12" : hourFormat12}:${min} ${meridiem}`;
  };

  const formatDate = (time) => {
    const day = time.toLocaleDateString("default", { weekday: "long" });
    const date = time.getDate();
    const month = time.toLocaleDateString("default", { month: "long" });
    return `${day}, ${date} ${month}`;
  };

  const getGreetings = (time) => {
    const hour = time.getHours();
    if (hour >= 4 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="w-full flex gap-20 sm:justify-evenly">
      <div className="mt-20 px-4 w-full">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <h2 className="text-white leading-none text-2xl sm:text-3xl sm:tracking-tight">
            {`${getGreetings(currentTime)}, ${user}!`}
          </h2>
          <h1 className="text-white font-medium tracking-wide leading-none -translate-x-1.5 text-7xl sm:text-[90px] sm:font-semibold">
            {formatTime(currentTime)}
          </h1>
          <h2 className="text-white leading-none text-2xl sm:text-3xl sm:tracking-tight">
            {formatDate(currentTime)}
          </h2>
        </div>
      </div>

      <section className="bg-[#111]/10 w-80 h-96 rounded-lg mt-20 hidden sm:block">
        <div className="rounded-t-lg p-3 bg-[#111]/40">
          <p className="text-white text-lg">Deadlines</p>
        </div>
      </section>

      <button className="bg-[#111] w-12 aspect-square rounded-full flex items-center justify-center absolute right-3 bottom-20 sm:hidden">
        <Plus className="w-8 h-8" stroke="#fff" />
      </button>
    </div>
  );
};

export default HeroSectionUser;
