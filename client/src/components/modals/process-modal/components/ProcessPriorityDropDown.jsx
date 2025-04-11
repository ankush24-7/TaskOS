import { priorityIcons } from "@icons";
import DropDown from "@/components/ui/DropDown";

const ProcessPriorityDropDown = ({ setPriority }) => {
  return (
    <DropDown
      showHeader={false}
      position="bottom-left"
      bgColor="#fff"
      children={
        <div className="flex justify-evenly px-1 py-1.5">
          <button
            type="button"
            onClick={() => setPriority(1)}
            className="flex items-center gap-1.5 p-1.5 rounded-lg cursor-pointer hover:bg-drop-btn-active">
            <priorityIcons.HighPriority className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setPriority(2)}
            className="flex items-center gap-1.5 p-1.5 rounded-lg cursor-pointer hover:bg-drop-btn-active">
            <priorityIcons.MediumPriority className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setPriority(3)}
            className="flex items-center gap-1.5 p-1.5 rounded-lg cursor-pointer hover:bg-drop-btn-active">
            <priorityIcons.LowPriority className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setPriority(0)}
            className="flex items-center gap-1.5 p-1.5 rounded-lg cursor-pointer hover:bg-drop-btn-active">
            <priorityIcons.DefaultPriority className="w-4 h-4" />
          </button>
        </div>
      }
    />
  );
};

export default ProcessPriorityDropDown;
