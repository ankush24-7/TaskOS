import dateUtils from "@/utils/dateUtils";
import useDropDown from "@/hooks/useDropDown";

const DateSelector = ({ day, month, year, setDay, setMonth, setYear }) => {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const { isOpen: showDay, setIsOpen: setShowDay, dropdownRef: dayRef } = useDropDown();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return (
    <div ref={dayRef} className="relative w-fit">
      <button
        onClick={() => setShowDay(!showDay)}
        className="flex items-center rounded-lg cursor-pointer text-md text-neutral-500 bg-white ">
        <p className="px-2 py-1 rounded-lg">
          {dateUtils.padZero(day)}
        </p>
        <p className="px-2 py-1 rounded-lg w-12">{months[month]}</p>
        <p className="px-2 py-1 rounded-lg">{year}</p>
      </button>

      {showDay && (
        <div className="absolute z-20 left-0 right-0 translate-y-0.5 flex max-h-52 rounded-lg shadow-md bg-white">
          <div className="flex flex-col overflow-y-scroll scrollbar-hide overflow-x-hidden">
            {[...Array(totalDays).keys()].map((d) => (
              <button 
                key={d} 
                onClick={() => setDay(d + 1)}
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
