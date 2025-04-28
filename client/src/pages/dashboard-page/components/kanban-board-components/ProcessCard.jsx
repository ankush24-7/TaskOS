import { CSS } from "@dnd-kit/utilities";
import dateUtils from "@/utils/dateUtils";
import { useSortable } from "@dnd-kit/sortable";
import { useDashboard } from "@/contexts/DashboardContext";
import DisplayPicture from "@/components/ui/DisplayPicture";
import { processCardIcons, priorityIcons } from "@/assets/icons/icons";

function ProcessCard({ process, openModal }) {
  const { setProcessPosition } = useDashboard();
  const duration = process.endsAt && process.startsAt && (new Date(process.endsAt) - new Date(process.startsAt)) / 60000 || 0;

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
            setProcessPosition(process.pos);
          }}
          className="absolute z-20 left-1/2 -translate-x-1/2 -translate-y-2 p-0.5 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 bg-white">
            <processCardIcons.Plus className="stroke-[2.5px] stroke-neutral-900" />
        </button>
      </span>

      <div
        onClick={() => openModal(process)}
        id={process._id}
        style={{ backgroundColor: process.color.hex, willChange: "transform" }}
        className="w-full h-40 flex flex-col px-2.5 py-2 rounded-2xl cursor-pointer transition-transform duration-200 
        ease-in-out hover:scale-101 drop-shadow-[4px_4px_5px_rgba(0,0,0,0.4)] hover:drop-shadow-[6px_6px_12px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center">
          {process.assignedTo ? (
            <span className="flex items-center gap-1">
              <DisplayPicture
                radius={"24px"}
                color={process.assignedTo.color || "#B1401B"}
                firstName={process.assignedTo.name.firstName}
                publicId={process.assignedTo.displayPicture.publicId || ""}
              />
              <p className="text-[15px] mt-[2px] max-w-28 leading-none text-ellipsis overflow-hidden whitespace-nowrap text-neutral-900">
                {process.assignedTo.username}
              </p>
            </span>
          ) : (
            <span className="flex items-center gap-1 mt-auto">
              <processCardIcons.Profile className="w-7 h-7 stroke-1 stroke-neutral-900" />
              <p className="text-[15px] mt-[2px] leading-none text-neutral-900">
                Assign
              </p>
            </span>
          )}
          <processCardIcons.Star
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
                <processCardIcons.CalendarIcon className="w-4 h-4 stroke-neutral-900" />
                <p className="text-sm leading-none text-neutral-900">
                  {dateUtils.formatDDMon(process.deadline)}
                </p>
              </span>
            )}
            {duration > 0 && (
              <span className="flex items-end gap-1">
                <processCardIcons.StopwatchIcon className="w-4 h-4 stroke-neutral-900" />
                <p className="text-sm leading-none text-neutral-900">
                  {dateUtils.formatDuration(duration)}
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
