import Header from "./Header";
import { useState } from "react";
import Task from "./Task/Task.jsx";
import Modal from "./Task/Modal.jsx";
import { Plus } from "../../../../assets/icons/icons.jsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Section(props) {    
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
        <div className="flex flex-col mb-6 items-center">

          {count == 0 ?
            <div className="absolute flex mt-40 flex-col items-center justify-center w-36 aspect-video border-white border-[1px]">
            </div>
          :
            renderTasks()
          }

          { isModalOpen && <Modal task={selectedTask} onClose={closeModal} /> }

          <button 
            onClick={ () => handleTaskClick() }
            className="bg-white rounded-full mx-auto mt-4 mb-6 w-6 h-6"
          >
            <Plus className="mx-auto w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;