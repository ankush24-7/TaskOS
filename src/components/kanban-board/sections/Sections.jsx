import { useState } from "react";
import Header from "./Header.jsx";
import Task from "./tasks/Task.jsx";
import Modal from "./tasks/Modal.jsx";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Plus } from "../../../assets/icons/icons.jsx";

function Sections({ section, tasks, isModalOpen, setIsModalOpen }) {    
  const { name, id, count } = section;
  const [selectedTask, setSelectedTask] = useState(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
    data: {
      type: "section",
      section: section,
    },
    attributes: {
      role: name,
      roleDescription: "sectionData.desc",
      tabIndex: section.index,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="w-[19rem] h-full rounded-lg bg-black/20">

      <Header 
        sectionData={section} 
        attributes={attributes}
        listeners={listeners}
      />

      <div className="h-full pb-28 overflow-y-scroll scroll-smooth scrollbar-hide">
        <div className="flex flex-col items-center px-3">
          { 
            tasks.map(task => {
              return (
                <Task 
                  key={task.taskId} 
                  task={task} 
                  onClick={ () => handleTaskClick(task) } 
                  />
                );
              })
          }
          { isModalOpen && <Modal task={selectedTask} onClose={closeModal} /> }

          <button 
            onClick={ () => handleTaskClick() }
            className="w-full rounded-2xl mx-auto mt-2 h-[7.75rem] border-2 border-white border-dashed"
          >
            <Plus className="mx-auto h-10 w-10 stroke-[1px]" stroke="#ffffff" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sections;