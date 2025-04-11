import User from "@/components/ui/User";
import useDropDown from "@/hooks/useDropDown";
import TimelineDropDown from "./TimelineDropDown";
import { useTimeline } from "@/contexts/TimelineContext";
import { timelineHeaderIcons } from "@/assets/icons/icons";

const TimelineHeader = () => {
  const { days, month, year, setOffset, refreshRef } = useTimeline();
  const { isOpen: showTimelineDropDown, setIsOpen: setShowTimelineDropDown, dropdownRef: timelineDropDownRef } = useDropDown();
  
  return (
    <header className="flex justify-between items-center py-2 px-3 sm:py-3 sm:px-0">
      <span className="flex items-center gap-4">
        <button className="group flex items-center py-0.5 pl-3 pr-2 gap-0.5 rounded-full cursor-pointer hover:bg-prim-black/50">
          <p className="text-2xl text-white">{month + " " + year}</p>
          <timelineHeaderIcons.ChevronDown className="w-5 h-5 opacity-0 group-hover:opacity-100" />
        </button>
        <span className="flex items-center gap-2">
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
          className="h-fit py-2 px-5 ml-5 rounded-full cursor-pointer border-[1.5px] border-white hover:bg-prim-black/50">
          <p className="text-lg leading-none text-white">Today</p>
        </button>
      </span>
      <span className="flex items-center gap-8">
        <div className="relative" ref={timelineDropDownRef}>
          <button
            onClick={() => setShowTimelineDropDown(!showTimelineDropDown)}
            className="flex items-center gap-2.5 h-fit py-2 pl-5 pr-3 rounded-full cursor-pointer border-[1.5px] border-white hover:bg-prim-black/50">
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
        <User />
      </span>
    </header>
  );
};

export default TimelineHeader;
