import DropDown from "@/components/ui/DropDown";
import { useTimeline } from "@/contexts/TimelineContext";

const TimelineDropDown = () => {
  const { setDays } = useTimeline();
  
  return (
    <DropDown
      showHeader={false}
      width={7}
      position="bottom-left"
      children={
        <div className="flex flex-col p-0.75 rounded-xl bg-neutral-800">
          <button
            onClick={() => setDays(1)}
            className="w-full flex items-center justify-between p-1.5 rounded-lg cursor-pointer text-white hover:bg-neutral-900">
            <p>Day</p>
            <p>D</p>
          </button>
          <button
            onClick={() => setDays(4)}
            className="w-full flex items-center justify-between p-1.5 rounded-lg cursor-pointer text-white hover:bg-neutral-900">
            <p>4 days</p>
            <p>X</p>
          </button>
          <button
            onClick={() => setDays(7)}
            className="w-full flex items-center justify-between p-1.5 rounded-lg cursor-pointer text-white hover:bg-neutral-900">
            <p>Week</p>
            <p>W</p>
          </button>
        </div>
      }
    />
  );
};

export default TimelineDropDown;
