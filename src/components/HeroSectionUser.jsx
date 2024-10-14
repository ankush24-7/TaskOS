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
    <div className="w-full flex gap-20 justify-evenly">
      <div className="mt-20">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-white text-3xl leading-none tracking-tight">
            {`${getGreetings(currentTime)}, ${user}!`}
          </h2>
          <h1 className="text-white text-[90px] font-semibold tracking-wide leading-none -translate-x-1.5">
            {formatTime(currentTime)}
          </h1>
          <h2 className="text-white text-3xl leading-none tracking-tight">
            {formatDate(currentTime)}
          </h2>
        </div>

        <div className="w-[400px] mt-20">
          <p className="text-white text-lg">
            "Always be a first-rate version of yourself, instead of a
            second-rate version of somebody else."
          </p>
          <p className="text-white text-lg mt-3.5">Judy Garland</p>
        </div>
      </div>

      <section className="bg-[#111]/10 w-80 h-96 rounded-lg mt-20">
        <div className="rounded-t-lg p-3 bg-[#111]/40">
          <p className="text-white text-lg">Deadlines</p>
        </div>
      </section>
    </div>
  );
};

export default HeroSectionUser;
