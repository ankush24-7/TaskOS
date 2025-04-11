import DropDown from "@/components/ui/DropDown";
import { useTimeline } from "@/contexts/TimelineContext";

const TimelineDropDown = () => {
  const { setDays } = useTimeline();
  
  return (
    <DropDown
      showHeader={false}
      width={7}
      position="bottom-left"
      bgColor="#fff"
      children={
        <div className="flex flex-col p-0.5">
          <button
            onClick={() => setDays(1)}
            className="flex items-center justify-between px-2 py-1.5 rounded-xl cursor-pointer text-neutral-900 hover:bg-prim-black/15">
            <p>Day</p>
            <p>D</p>
          </button>
          <button
            onClick={() => setDays(4)}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer text-neutral-900 hover:bg-prim-black/15">
            <p>4 days</p>
            <p>X</p>
          </button>
          <button
            onClick={() => setDays(7)}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer text-neutral-900 hover:bg-prim-black/15">
            <p>Week</p>
            <p>W</p>
          </button>
        </div>
      }
    />
  );
};

export default TimelineDropDown;
