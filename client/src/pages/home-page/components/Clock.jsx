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
    <div className="hidden md:flex flex-col lg:gap-1 items-start">
      <h1 className="text-white font-medium leading-[4.5rem] -translate-x-1.5 text-7xl md:pl-1 lg-pl-0 lg:text-[90px] lg:font-semibold">
        {dateTime.time}
      </h1>
      <h2 className="text-white text-2xl lg:text-3xl lg:leading-12">{dateTime.date}</h2>
    </div>
  );
};

export default Clock;
