import useDropDown from "@/hooks/useDropDown";
import DropDown from "@/components/ui/DropDown";
import { priorityIcons } from "@/assets/icons/icons";

const renderPriority = (priority) => {
  switch (priority) {
    case 1:
      return (
        <span className="flex items-center p-1.5 gap-1 rounded-full bg-white">
          <priorityIcons.HighPriority className="w-5 h-5" />
          <p className="text-neutral-900">High Priority</p>
        </span>
      );
    case 2:
      return (
        <span className="flex items-center p-1.5 gap-1 rounded-full bg-white">
          <priorityIcons.MediumPriority className="w-5 h-5" />
          <p className="text-neutral-900">Medium Priority</p>
        </span>
      );
    case 3:
      return (
        <span className="flex items-center p-1.5 gap-1 rounded-full bg-white">
          <priorityIcons.LowPriority className="w-5 h-5" />
          <p className="text-neutral-900">Low Priority</p>
        </span>
      );
    default:
      return (
        <span className="flex items-center p-1.5 gap-0.5 rounded-full bg-white">
          <priorityIcons.DefaultPriority className="w-5 h-5" />
          <p className="text-neutral-900">Trivial Priority</p>
        </span>
      );
  }
};

const ProcessPriorityDropDown = ({ priority, setPriority }) => {
  const { HighPriority, MediumPriority, LowPriority, DefaultPriority } = priorityIcons;
  const { isOpen: showPriority, setIsOpen: setShowPriority, dropdownRef: priorityRef } = useDropDown();

  const priorityBtn = (priority, icon) => {
    return (
      <button
        type="button"
        onClick={() => setPriority(priority)}
        className="flex items-center gap-1.5 px-2 py-2.5 rounded-lg cursor-pointer hover:bg-prim-black/10">
        {icon}
      </button>
    );
  };

  return (
    <div className="relative w-fit" ref={priorityRef}>
      <button
        type="button"
        onClick={() => setShowPriority(!showPriority)}
        className="btn-shadow cursor-pointer w-fit rounded-full">
        {renderPriority(priority)}
      </button>

      {showPriority && (
        <DropDown
          showHeader={false}
          position="bottom-left"
          children={
            <div className="flex justify-evenly p-0.5 rounded-xl bg-white">
              {priorityBtn(1, <HighPriority className="w-4 h-4" />)}
              {priorityBtn(2, <MediumPriority className="w-4 h-4" />)}
              {priorityBtn(3, <LowPriority className="w-4 h-4" />)}
              {priorityBtn(4, <DefaultPriority className="w-4 h-4" />)}
            </div>
          }
        />
      )}
    </div>
  );
};

export default ProcessPriorityDropDown;
