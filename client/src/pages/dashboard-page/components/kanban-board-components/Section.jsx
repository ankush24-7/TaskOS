import "@styles/scrollbars.css";
import { AddTask } from "@icons";
import Header from "./Header.jsx";
import { CSS } from "@dnd-kit/utilities";
import ProcessCard from "./ProcessCard.jsx";
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

  const closeModal = () => {
    setShowProcessModal(false);
    setSelectedProcess(null);
    setSelectedSection(null);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[19rem] h-full rounded-lg bg-black/20">
      <Header section={section} attributes={attributes} listeners={listeners} />
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
              openModal()
              setProcessPosition(processes.length)
            }}
            className={`w-full h-40 group flex flex-col items-center justify-center gap-2 mx-auto px-2 py-2.5 rounded-2xl 
              cursor-pointer border-dashed border-2 border-gray-400 hover:border-white hover:bg-prim-black/10 
              ${ processes.length ? "mt-4" : "mt-3" } hover:scale-101 transition-transform duration-200 ease-in-out
            `}>
            <AddTask className="w-16 h-16 stroke-1 stroke-gray-400 group-hover:stroke-white" />
            <p className="text-md text-gray-400 group-hover:text-white">
              Add Process
            </p>
          </button>

          {processes.length === 0 && (
            <div className="relative w-full">
              <p className="absolute left-1/2 -translate-x-1/2 max-w-60 text-ellipsis overflow-hidden mt-20 text-gray-400">
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
