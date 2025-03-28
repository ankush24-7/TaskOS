import { CSS } from "@dnd-kit/utilities";
import dateUtils from "@/utils/dateUtils";
import { useSortable } from "@dnd-kit/sortable";
import { taskIcons, priorityIcons } from "@icons";
import { useDashboard } from "@/contexts/DashboardContext";

function ProcessCard({ process, openModal }) {
  const { setProcessPosition } = useDashboard();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: process._id,
    data: {
      type: "process",
      process: process,
    },
    attributes: {
      role: "edit process",
      tabIndex: 0,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{ ...style }}
        {...attributes}
        {...listeners}
        className="w-full">
        <div className="w-full mt-3 h-40 rounded-2xl bg-white/30"></div>
      </div>
    );
  }

  const renderPriority = (priority) => {
    switch (priority) {
      case 1:
        return (
          <span className="flex items-center pl-1 pr-1.5 py-0.5 gap-1 mt-auto w-fit rounded-full bg-white">
            <priorityIcons.HighPriority className="w-4 h-4" />
            <p className="text-sm text-neutral-900">High</p>
          </span>
        );
      case 2:
        return (
          <span className="flex items-center pl-1 pr-1.5 py-0.5 gap-1 mt-auto w-fit rounded-full bg-white">
            <priorityIcons.MediumPriority className="w-4 h-4" />
            <p className="text-sm text-neutral-900">Medium</p>
          </span>
        );
      case 3:
        return (
          <span className="flex items-center pl-1 pr-1.5 py-0.5 gap-1 mt-auto w-fit rounded-full bg-white">
            <priorityIcons.LowPriority className="w-4 h-4" />
            <p className="text-sm text-neutral-900">Low</p>
          </span>
        );
      default:
        return (
          <span className="flex items-center pl-1 pr-1.5 py-0.5 gap-1 mt-auto w-fit rounded-full bg-white">
            <priorityIcons.DefaultPriority className="w-4 h-4" />
            <p className="text-sm text-neutral-900">Trivial</p>
          </span>
        );
    }
  };

  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className="w-full flex flex-col">
      <span className="group relative h-3">
        <button 
          onClick={() => {
            openModal();
            console.log("setting", process.pos);
            setProcessPosition(process.pos);
          }}
          className="absolute z-20 left-1/2 -translate-x-1/2 -translate-y-2 p-0.5 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 bg-white">
            <taskIcons.Plus className="stroke-neutral-900" />
        </button>
      </span>

      <div
        onClick={() => openModal(process)}
        id={process._id}
        style={{ backgroundColor: process.color.hex, willChange: "transform" }}
        className="w-full h-40 flex flex-col px-2.5 py-2 rounded-2xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[101%] drop-shadow-[4px_4px_5px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 mt-auto">
            <taskIcons.Profile className="w-7 h-7 stroke-1 stroke-neutral-900" />
            <p className="text-[15px] mt-[2px] leading-none text-neutral-900">
              {process.assignedTo?.name?.firstName || "Assign"}
            </p>
          </span>
          <taskIcons.Star
            className={`stroke-[1.5] stroke-prim-black ${process.starred && "fill-amber-300"}`}
          />
        </div>

        <p className="truncate-3-lines mt-2 text-md leading-6 text-neutral-900">
          {process.title}
        </p>

        <div className="flex justify-between items-center mt-auto">
          {renderPriority(process.priority)}
          <span className="flex items-center gap-3">
            {process.deadline && (
              <span className="flex items-end gap-1">
                <taskIcons.CalendarIcon className="w-4 h-4 stroke-neutral-900" />
                <p className="text-sm leading-none text-neutral-900">
                  {dateUtils.formatDDMon(process.deadline)}
                </p>
              </span>
            )}
            {process.duration !== 0 && (
              <span className="flex items-end gap-1">
                <taskIcons.StopwatchIcon className="w-4 h-4 stroke-neutral-900" />
                <p className="text-sm leading-none text-neutral-900">
                  {dateUtils.formatDuration(process.duration)}
                </p>
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProcessCard;
