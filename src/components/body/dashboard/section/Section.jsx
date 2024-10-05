import Header from "./Header";
import { useState } from "react";
import Task from "./Task/Task.jsx";
import Modal from "./Task/Modal.jsx";
import { Plus } from "../../../../assets/icons/icons.jsx";

function Section(props) {  
  const { name, count, headerColor, Icon } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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
    <div className="w-[19rem] h-full relative">
      <Header name={name} count={count} color={headerColor} Icon={Icon} />

      <div className="mt-[3.75rem] h-[calc(100%-7.5rem)] overflow-y-scroll scroll-smooth scrollbar-hide">
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