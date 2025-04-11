import dateUtils from "@/utils/dateUtils";
import { useEffect, useRef, useState } from "react";
import useDropDown from "@/hooks/useDropDown";

const DurationSelector = ({ duration, setDuration }) => {
  const {
    isOpen: showTime,
    setIsOpen: setTime,
    dropdownRef: timeRef,
  } = useDropDown();

  const initialRender = useRef(true);
  const [hour, setHour] = useState(Math.floor(duration/60));
  const [minute, setMinute] = useState(duration%60);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const updateDuration = () => {
      setDuration(hour*60 + minute);
    }

    updateDuration();
  }, [hour, minute]);

  return (
    <div ref={timeRef} className="relative">
      <button
        onClick={() => setTime(!showTime)}
        className="flex py-1.5 rounded-lg cursor-pointer text-neutral-500 bg-white">
        <p className="px-1.5">{dateUtils.padZero(hour)}</p>
        <p>:</p>
        <p className="px-1.5">{dateUtils.padZero(minute)}</p>
      </button>

      {showTime && (
        <div className="absolute z-20 left-0 right-0 translate-y-0.5 flex gap-0.5 max-h-52 w-fit rounded-lg shadow-md bg-white">
          <div className="flex flex-col overflow-y-scroll scrollbar-hide">
            {[...Array(100).keys()].map((h) => (
              <button
                key={h}
                onClick={() => setHour(h)}
                className="px-1.5 py-0.5 rounded-lg cursor-pointer hover:bg-gray-100">
                <p className="text-neutral-500">{dateUtils.padZero(h)}</p>
              </button>
            ))}
          </div>
          <div className="flex flex-col overflow-y-scroll scrollbar-hide">
            {[...Array(4).keys()].map((m) => (
              <button
                key={m}
                onClick={() => setMinute(m * 15)}
                className="px-1.5 py-0.5 rounded-lg cursor-pointer hover:bg-gray-100">
                <p className="text-neutral-500">{dateUtils.padZero(m * 15)}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DurationSelector;
