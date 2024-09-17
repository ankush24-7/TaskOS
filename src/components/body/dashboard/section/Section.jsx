import Header from "./Header";
import { useState } from "react";
import Task from "./Task/Task.jsx";
import Modal from "./Task/Modal.jsx";
import { addTask } from "../../../../assets/icons/icons.js";

function Section({ name, count, headerColor, bgColor, icon }) {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const renderTasks = () => {
    const tasks = [];
    for (let i = 0; i < count; i++) {
      tasks.push(<Task key={i} onClick={handleTaskClick} />);
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
    // console.log(setIsModalOpen);
  };

  return (
    <div
      className="w-[19rem] h-full relative"
      style={{ backgroundColor: bgColor }}>
      <Header name={name} count={count} color={headerColor} icon={icon} />

      <div className="mt-[3.75rem] h-[calc(100%-8rem)] overflow-y-scroll scroll-smooth scrollbar-hide">
        <div className="flex flex-col mb-6">
          { renderTasks() }
          { isModalOpen && <Modal task={selectedTask} onClose={closeModal} /> }

          <button className="bg-white rounded-full mx-auto mt-2 w-6 h-6">
            <img src={ addTask } alt="icon_add" className="mx-auto w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
