import dateUtils from "@/utils/dateUtils";
import { useEffect, useState } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setDateTime({
      date: dateUtils.formatDayDDMonth(currentTime),
      time: dateUtils.formatTime(currentTime)
    })
  }, [currentTime])

  return (
    <div className="hidden sm:flex flex-col gap-1 items-start">
      <h1 className="text-white font-medium leading-[4.5rem] -translate-x-1.5 text-7xl sm:text-[90px] sm:font-semibold">
        {dateTime.time}
      </h1>
      <h2 className="text-white text-2xl sm:text-3xl sm:leading-12">{dateTime.date}</h2>
    </div>
  );
};

export default Clock;
