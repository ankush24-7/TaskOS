import Task from "./Task.jsx";
import "@styles/scrollbars.css";
import { useState } from "react";
import Header from "./Header.jsx";
import { Plus, AddTask } from "@icons";
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
      <Header section={section} attributes={attributes} listeners={listeners} />
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
            className="w-full h-[7.75rem] group flex flex-col items-center mx-auto mt-2 px-2 py-2.5 rounded-2xl cursor-pointer border-dashed border-2 border-gray-400 hover:border-white hover:bg-prim-black/10">
            <button className="cursor-pointer flex flex-col items-center w-full h-full gap-2">
              <p className="text-gray-400 group-hover:text-white">
                Add Process
              </p>
              <AddTask className="w-14 h-14 stroke-1 stroke-gray-400 group-hover:stroke-white" />
            </button>
          </button>

          {tasks.length === 0 && (
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

export default Sections;
