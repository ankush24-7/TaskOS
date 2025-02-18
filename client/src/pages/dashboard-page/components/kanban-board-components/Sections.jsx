import { Plus } from "@icons";
import Task from "./Task.jsx";
import "@styles/scrollbars.css";
import { useState } from "react";
import Header from "./Header.jsx";
import { CSS } from "@dnd-kit/utilities";
import EditTaskModal from "./EditTaskModal.jsx";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

function Sections({ section, tasks, isModalOpen, setIsModalOpen }) {
  const [selectedTask, setSelectedTask] = useState(null);

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
    attributes: {
      role: section.name,
      roleDescription: "sectionData.desc",
      tabIndex: section.index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[19rem] h-full rounded-lg bg-white/20"></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[19rem] h-full rounded-lg bg-black/20">
      <Header
        section={section}
        attributes={attributes}
        listeners={listeners}
      />
      <div className={`h-[88%] pb-20 overflow-y-auto vertical-scrollbar`}>
        <div className="flex flex-col items-center px-3">
          <SortableContext items={tasks.map((task) => task.id)}>
            {tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onClick={() => handleTaskClick(task)}
                />
              );
            })}
          </SortableContext>

          {isModalOpen && (
            <EditTaskModal task={selectedTask} onClose={closeModal} />
          )}

          <button
            onClick={() => handleTaskClick()}
            className="group w-full rounded-2xl mx-auto mt-2 h-[7.75rem] border-2 border-dashed border-gray-400 hover:border-white hover:bg-prim-black/10">
            <Plus className="mx-auto h-10 w-10 stroke-[1px] rounded-full stroke-gray-400 group-hover:stroke-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sections;
