import dateUtils from "@/utils/dateUtils";
import { useEffect, useRef, useState } from "react";
import useDropDown from "@/hooks/useDropDown";

const DateSelector = ({ date, setDate }) => {
  const {
    isOpen: showDay,
    setIsOpen: setDay,
    dropdownRef: dayRef,
  } = useDropDown();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const initialRender = useRef(true);
  const [border, setBorder] = useState("transparent");
  const [DD, setDD] = useState(date ? date.getDate() : "DD");
  const [month, setMonth] = useState(date ? date.getMonth() : new Date().getMonth());
  const [year, setYear] = useState(date ? date.getFullYear() : new Date().getFullYear());

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const validateDate = () => {
      if (DD === "DD") return;
      const totalDays = new Date(year, month + 1, 0).getDate();
      if (DD > 0 && DD <= totalDays) {
        setBorder("transparent");
        setDate(new Date(year, month, DD));
      } else {
        setBorder("#ff0000");
      }
    }

    validateDate();
  }, [DD, month, year]);

  return (
    <div ref={dayRef} className="relative w-fit">
      <button
        onClick={() => setDay(!showDay)}
        style={{ backgroundColor: showDay && "#fff" }}
        className="flex items-center rounded-lg cursor-pointer text-md text-neutral-500 bg-white/60 hover:bg-white ">
        <p 
          style={{ borderColor: border }}
          className="px-2 py-1 rounded-lg border-1">
          {dateUtils.padZero(DD)}
        </p>
        <p className="px-2 py-1 rounded-lg w-12">{months[month]}</p>
        <p className="px-2 py-1 rounded-lg">{year}</p>
      </button>

      {showDay && (
        <div className="absolute z-20 left-0 right-0 translate-y-0.5 flex max-h-60 rounded-lg shadow-md bg-white">
          <div className="flex flex-col overflow-y-scroll scrollbar-hide overflow-x-hidden">
            {[...Array(31).keys()].map((d) => (
              <button 
                key={d} 
                onClick={() => setDD(d + 1)}
                className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
                <p className="text-neutral-500">{dateUtils.padZero(d + 1)}</p>
              </button>
            ))}
          </div>

          <div className="flex flex-col overflow-y-scroll scrollbar-hide overflow-x-hidden">
            {[...Array(12).keys()].map((m) => (
              <button 
                key={m} 
                onClick={() => setMonth(m)}
                className="px-2 py-2 rounded-lg cursor-pointer w-fit text-neutral-500 hover:bg-gray-100">
                <p className="text-left">{months[m]}</p>
              </button>
            ))}
          </div>

          <div className="flex flex-col overflow-y-scroll scrollbar-hide overflow-x-hidden">
            {[...Array(10).keys()].map((y) => (
              <button 
                key={y} 
                onClick={() => setYear(new Date().getFullYear() + y)}
                className="px-3 py-2 rounded-lg cursor-pointer w-fit text-neutral-500 hover:bg-gray-100">
                <p className="text-left">{new Date().getFullYear() + y}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
