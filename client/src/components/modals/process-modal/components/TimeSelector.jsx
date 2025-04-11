import dateUtils from "@/utils/dateUtils";
import useDropDown from "@/hooks/useDropDown";

const TimeSelector = ({ hour, setHour, minute, setMinute }) => {
  const { isOpen: showTime, setIsOpen: setShowTime, dropdownRef: timeRef } = useDropDown();
 
  return (
    <div ref={timeRef} className="relative">
      <button
        onClick={() => setShowTime(!showTime)}
        className="flex items-center gap-2 px-3 py-[0.33rem] rounded-lg cursor-pointer text-neutral-500 bg-white">
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
            {[...Array(4).keys()].map((m) => (
              <button
                key={m}
                onClick={() => setMinute(m * 15)}
                className="px-3 py-0.5 rounded-lg cursor-pointer hover:bg-gray-100">
                <p className="text-neutral-500">{dateUtils.padZero(m * 15)}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSelector;
