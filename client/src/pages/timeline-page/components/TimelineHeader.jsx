import User from "@/components/ui/User";
import useDropDown from "@/hooks/useDropDown";
import TimelineDropDown from "./TimelineDropDown";
import { useTimeline } from "@/contexts/TimelineContext";
import { timelineHeaderIcons } from "@/assets/icons/icons";

const TimelineHeader = () => {
  const { days, month, year, setOffset, refreshRef } = useTimeline();
  const { isOpen: showTimelineDropDown, setIsOpen: setShowTimelineDropDown, dropdownRef: timelineDropDownRef } = useDropDown();
  
  return (
    <header className="flex justify-between items-center py-2 px-1.5 sm:py-3 sm:px-0">
      <span className="flex items-center gap-3 sm:gap-5">
        <p className="text-xl sm:text-2xl text-white">{month + " " + year}</p>
        <span className="flex items-center sm:ml-1 sm:gap-2">
          <button 
            onClick={() => setOffset(prev => prev - days)}
            className="p-1 rounded-full cursor-pointer hover:bg-prim-black/50">
            <timelineHeaderIcons.ChevronLeft className="w-7 h-7 -translate-x-0.5 stroke-white" />
          </button>
          <button 
            onClick={() => setOffset(prev => prev + days)}
            className="p-1 rounded-full cursor-pointer hover:bg-prim-black/50">
            <timelineHeaderIcons.ChevronRight className="w-7 h-7 translate-x-0.5 stroke-white" />
          </button>
        </span>
        <button
          onClick={() => setOffset(0)}
          className="h-fit px-2.5 py-1.5 rounded-full cursor-pointer border-[1.5px] sm:py-2 sm:px-5 border-white hover:bg-prim-black/50">
          <p className="text-lg leading-none text-white">Today</p>
        </button>
      </span>
      <span className="flex items-center gap-2 sm:gap-8">
        <div className="relative" ref={timelineDropDownRef}>
          <button
            onClick={() => setShowTimelineDropDown(!showTimelineDropDown)}
            className="flex items-center h-fit gap-1 py-1 px-1.5 pl-1.5 rounded-full cursor-pointer border-[1.5px] sm:gap-2.5 sm:py-2 sm:pl-5 sm:pr-3 border-white hover:bg-prim-black/50">
            <p className="text-lg leading-none text-white">
              {days === 1 ? "Day" : days === 3 ? "3 days" : days === 4 ? "4 days" : "Week"}
            </p>
            <timelineHeaderIcons.ChevronDown className="w-5 h-5 -translate-x-0.5 stroke-0 fill-white" />
          </button>

          {showTimelineDropDown && <TimelineDropDown />}
        </div>

        <button
          onClick={() => refreshRef.current()}
          className="p-2 rounded-full cursor-pointer hover:bg-prim-black/50">
          <timelineHeaderIcons.RefreshIcon className="w-6 h-6 stroke-white" />
        </button>
        <span className="hidden sm:block">
         <User />
        </span>
      </span>
    </header>
  );
};

export default TimelineHeader;
