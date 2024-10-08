import Header from "./Header.jsx";
import Task from "./tasks/Task.jsx";
import Modal from "./tasks/Modal.jsx";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Plus } from "../../../assets/icons/icons.jsx";

function Sections(props) {    
  const { name, id, count } = props.section;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
    data: {
      type: "section",
      section: props.section,
    },
    attributes: {
      role: name,
      roleDescription: "sectionData.desc",
      tabIndex: props.index,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const renderTasks = () => {
    const tasks = [];
    for (let i = 0; i < count; i++) {
      tasks.push(<Task key={i} onClick={ handleTaskClick } />);
    }
    return tasks;
  };

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
      className="w-[19rem] h-full relative">

      <Header 
        sectionData={props.section} 
        attributes={attributes}
        listeners={listeners}
      />

      <div className=" h-[calc(100%-7.5rem)] overflow-y-scroll scroll-smooth scrollbar-hide">
        <div className="flex flex-col mb-10 items-center px-3">

          {renderTasks()}

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