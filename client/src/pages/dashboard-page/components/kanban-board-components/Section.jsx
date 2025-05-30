import { CSS } from "@dnd-kit/utilities";
import ProcessCard from "./ProcessCard.jsx";
import { AddTask } from "@/assets/icons/icons";
import SectionHeader from "./SectionHeader.jsx";
import { useDashboard } from "@/contexts/DashboardContext.jsx";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

function Section({ section, processes }) {
  const { setShowProcessModal, setSelectedProcess, setSelectedSection, setProcessPosition } = useDashboard();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section._id,
    data: {
      type: "section",
      section: section,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[19rem] h-full rounded-lg bg-white/20"></div>
    );
  }

  const openModal = (process) => {
    setSelectedProcess(process);
    setSelectedSection(section);
    setShowProcessModal(true);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative w-[19rem] h-full rounded-xl bg-black/20">
      <SectionHeader section={section} attributes={attributes} listeners={listeners} />
      <div className="h-[88%] pb-20 overflow-y-auto vertical-scrollbar">
        <div className="flex flex-col items-center px-3">
          <SortableContext items={processes.map((process) => process._id)}>
            {processes.map((process) => {
              return (
                <ProcessCard
                  key={process._id}
                  process={process}
                  openModal={openModal}
                />
              );
            })}
          </SortableContext>

          <button
            onClick={() => {
              openModal();
              setProcessPosition(processes.slice(-1)[0]?.pos + 1 || 1);
            }}
            className={`w-full h-40 group flex flex-col items-center justify-center gap-2 mx-auto px-2 py-2.5 rounded-2xl 
              cursor-pointer border-dashed border-2 border-gray-400 hover:border-white hover:bg-prim-black/10 
              ${ processes.length ? "mt-4" : "mt-3" } hover:scale-101 transition-all duration-200 ease-in-out
            `}>
            <AddTask className="w-16 h-16 stroke-1 stroke-gray-400 group-hover:stroke-white" />
            <p className="text-md text-gray-400 group-hover:text-white">
              Add Process
            </p>
          </button>

          {processes.length === 0 && (
            <div className="absolute inset-5 top-1/2">
              <p className="w-full line-clamp-6 text-center text-ellipsis overflow-hidden text-gray-400">
                {section.description || "No description"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Section;
