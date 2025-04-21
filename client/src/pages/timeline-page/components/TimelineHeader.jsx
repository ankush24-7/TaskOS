import User from "@/components/ui/User";
import useDropDown from "@/hooks/useDropDown";
import TimelineDropDown from "./TimelineDropDown";
import { useTimeline } from "@/contexts/TimelineContext";
import { timelineHeaderIcons } from "@/assets/icons/icons";
import MobileDropDown from "@/components/dropdowns/MobileDropDown";

const TimelineHeader = () => {
  const { days, month, year, setOffset, refreshRef } = useTimeline();
  const { isOpen: showMobileDropDown, setIsOpen: setShowMobileDropDown, dropdownRef: mobileDropDownRef } = useDropDown();
  const { isOpen: showTimelineDropDown, setIsOpen: setShowTimelineDropDown, dropdownRef: timelineDropDownRef } = useDropDown();
  
  return (
    <header className="flex justify-between items-center py-2 px-1.5 sm:py-3 sm:px-0">
      <span className="flex items-center gap-3 sm:gap-5">
        <p className="text-xl sm:text-2xl hidden sm:inline text-white">{month + " " + year}</p>
        <p className="text-xl sm:text-2xl inline sm:hidden text-white">{month.slice(0,3) + " '" + year % 100}</p>
        <span className="flex items-center sm:gap-2">
          <button
            onClick={() => setOffset(prev => prev - days)}
            className="p-1 rounded-full cursor-pointer hover:bg-prim-black/50">
            <timelineHeaderIcons.ChevronLeft className="w-7 h-7 sm:-translate-x-0.5 stroke-white" />
          </button>
          <button 
            onClick={() => setOffset(prev => prev + days)}
            className="p-1 rounded-full cursor-pointer hover:bg-prim-black/50">
            <timelineHeaderIcons.ChevronRight className="w-7 h-7 sm:translate-x-0.5 stroke-white" />
          </button>
        </span>
        <button
          onClick={() => setOffset(0)}
          className="h-fit py-2 px-5 rounded-full cursor-pointer border-[1.5px] hidden sm:inline border-white hover:bg-prim-black/50">
          <p className="text-lg leading-none text-white">Today</p>
        </button>
      </span>
      <span className="flex items-center gap-2 sm:gap-8">
        <div className="relative" ref={timelineDropDownRef}>
          <button
            onClick={() => setShowTimelineDropDown(!showTimelineDropDown)}
            className="flex items-center h-fit gap-1 py-1.5 pr-0.5 pl-2 rounded-full cursor-pointer border-[1.5px] sm:gap-2.5 sm:py-2 sm:pl-5 sm:pr-3 border-white hover:bg-prim-black/50">
            <p className="text-lg leading-none text-white">
              {days === 1 ? "Day" : days === 3 ? "3 days" : days === 4 ? "4 days" : "Week"}
            </p>
            <timelineHeaderIcons.ChevronDown className="w-4.5 h-4.5 sm:w-5 sm:h-5 -translate-x-0.5 stroke-0 fill-white" />
          </button>

          {showTimelineDropDown && <TimelineDropDown />}
        </div>

        <button
          onClick={() => refreshRef.current()}
          className="p-2 rounded-full cursor-pointer hidden sm:inline hover:bg-prim-black/70">
          <timelineHeaderIcons.RefreshIcon className="w-6 h-6 stroke-white" />
        </button>
        <div ref={mobileDropDownRef} className="sm:hidden">
          <button 
            onClick={() => setShowMobileDropDown(!showMobileDropDown)}
            className="p-2 rounded-full cursor-pointer hover:bg-prim-black/50">
            <timelineHeaderIcons.Menu className="w-6.5 h-6.5 stroke-white" />
          </button>

          {showMobileDropDown && (
            <MobileDropDown
              header="Options"
              bgColor="#1c1917"
              isOpen={showMobileDropDown}
              setIsOpen={setShowMobileDropDown}
              children={
                <div className="w-full flex flex-col gap-1.5 p-1 pb-4 bg-stone-900">
                  <button
                    onClick={() => refreshRef.current()}
                    className="flex items-center gap-2 py-4 px-5 rounded-2xl cursor-pointer bg-prim-black/50">
                    <timelineHeaderIcons.RefreshIcon className="w-6 h-6 stroke-white" />
                    <p className="text-lg text-white">Refersh</p>
                  </button>
                  <button
                    onClick={() => setOffset(0)}
                    className="flex items-center gap-2 py-4 px-5 rounded-2xl cursor-pointer bg-prim-black/50">
                    <timelineHeaderIcons.CalanderSyncIcon className="w-6 h-6 stroke-white" />
                    <p className="text-lg text-white">Today</p>
                  </button>
                </div>
              }
            />
          )}
        </div>

        <span className="hidden sm:block">
         <User />
        </span>
      </span>
    </header>
  );
};

export default TimelineHeader;
