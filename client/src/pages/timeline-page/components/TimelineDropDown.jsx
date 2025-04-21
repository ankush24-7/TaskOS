import DropDown from "@/components/dropdowns/DropDown";
import { useTimeline } from "@/contexts/TimelineContext";

const TimelineDropDown = () => {
  const { setDays } = useTimeline();
  
  return (
    <DropDown
      showHeader={false}
      width="90px"
      position="bottom-right"
      children={
        <div className="flex flex-col p-0.75 rounded-xl bg-neutral-800">
          <button
            onClick={() => setDays(1)}
            className="w-full flex items-center justify-center sm:justify-between p-1 sm:1.5 rounded-lg cursor-pointer text-white hover:bg-neutral-900">
            <p>Day</p>
            <p className="hidden sm:inline">D</p>
          </button>
          <button
            onClick={() => setDays(4)}
            className="w-full flex items-center justify-center sm:justify-between p-1 sm:1.5 rounded-lg cursor-pointer text-white hover:bg-neutral-900">
            <p>4 days</p>
            <p className="hidden sm:inline">X</p>
          </button>
          <button
            onClick={() => setDays(7)}
            className="w-full flex items-center justify-center sm:justify-between p-1 sm:1.5 rounded-lg cursor-pointer text-white hover:bg-neutral-900">
            <p>Week</p>
            <p className="hidden sm:inline">W</p>
          </button>
        </div>
      }
    />
  );
};

export default TimelineDropDown;
