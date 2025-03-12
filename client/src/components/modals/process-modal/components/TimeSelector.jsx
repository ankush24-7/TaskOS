import dateUtils from "@/utils/dateUtils";
import useDropDown from "@/hooks/useDropDown";
import { useEffect, useRef, useState } from "react";

const TimeSelector = ({ dateTime, setDateTime }) => {
  const {
    isOpen: showTime,
    setIsOpen: setTime,
    dropdownRef: timeRef,
  } = useDropDown();

  const initialRender = useRef(true);
  const [hour, setHour] = useState(dateTime?.getHours() || "HH");
  const [minute, setMinute] = useState(dateTime?.getMinutes() || "MM");

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const updateTime = () => {
      const updatedTime = new Date(dateTime);
      updatedTime.setHours(hour);
      updatedTime.setMinutes(minute);
      setDateTime(updatedTime);
    }

    updateTime();
  }, [hour, minute]);

  return (
    <div ref={timeRef} className="relative">
      <button
        onClick={() => setTime(!showTime)}
        style={{ backgroundColor: showTime && "#fff" }}
        className="flex items-center gap-2 px-3 py-[0.33rem] rounded-lg cursor-pointer text-neutral-500 bg-white/60 hover:bg-white">
        <p className="w-6">{dateUtils.padZero(hour)}</p>
        <p>:</p>
        <p className="w-6">{dateUtils.padZero(minute)}</p>
      </button>

      {showTime && (
        <div className="absolute z-20 left-0 right-0 translate-y-0.5 flex gap-2 max-h-52 w-fit rounded-lg shadow-md bg-white">
          <div className="flex flex-col overflow-y-scroll scrollbar-hide">
            {[...Array(24).keys()].map((h) => (
              <button
                key={h}
                onClick={() => setHour(h)}
                className="px-3 py-0.5 rounded-lg cursor-pointer hover:bg-gray-100">
                <p className="text-neutral-500">{dateUtils.padZero(h)}</p>
              </button>
            ))}
          </div>
          <div className="flex flex-col overflow-y-scroll scrollbar-hide">
            {[...Array(60).keys()].map((m) => (
              <button
                key={m}
                onClick={() => setMinute(m)}
                className="px-3 py-0.5 rounded-lg cursor-pointer hover:bg-gray-100">
                <p className="text-neutral-500">{dateUtils.padZero(m)}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSelector;
