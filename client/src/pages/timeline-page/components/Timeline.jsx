import { useEffect } from "react";
import TimelineGrid from "./TimelineGrid";
import { useTimeline } from "@/contexts/TimelineContext";

const Timeline = () => {
  const { days, setDays, dates } = useTimeline();

  const renderHeader = () => {
    return dates.map((date, i) => {
      const isToday = date.toDateString() === new Date().toDateString();
      return (
        <span
          key={i}
          style={{ width: `${100 / days}%` }}
          className="flex flex-col items-center pb-1 leading-snug">
          <p
            style={{ color: isToday ? "#FCCF5F" : "#FFF" }}
            className="text-sm">
            {date.toString().split(" ")[0]}
          </p>
          <p
            style={{
              backgroundColor: isToday ? "#FCCF5F" : "transparent",
              color: isToday ? "#a65f00" : "#FFF",
            }}
            className="text-xl w-8 h-8 flex items-center justify-center rounded-full text-white">
            {date.getDate()}
          </p>
        </span>
      );
    });
  };

  const renderTime = () => {
    let isAM = true;
    return [...Array(24).keys()].map((hour, i) => {
      if (!hour) return;
      if (hour === 12) isAM = false;
      return (
        <span key={i}>
          <p className="text-[10px] text-gray-300">
            {`${hour % 12 ? hour % 12 : 12} ${isAM ? "AM" : "PM"}`}
          </p>
        </span>
      );
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'D' || e.key === 'd') setDays(1);
      else if (e.key === 'W' || e.key === 'w') setDays(7);
      else if (e.key === 'X' || e.key === 'x') setDays(4);    
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full flex flex-col flex-grow max-h-154 sm:rounded-2xl sm:max-h-130 bg-stone-900/80">
      <div className="flex pt-1 pl-8.25 sm:rounded-t-2xl bg-prim-black">
        {renderHeader()}
      </div>
      <div className="flex overflow-y-scroll scrollbar-hide last:border-r-0">
        <div className="flex flex-col text-right text-nowrap h-fit pt-13 pb-8 pr-1 gap-11.25">
          {renderTime()}
        </div>
        <TimelineGrid />
      </div>
    </div>
  );
};

export default Timeline;
