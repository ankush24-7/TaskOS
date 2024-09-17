import Task from "./Task";
import Header from "./Header";
import { addTask } from "../../../../assets/icons/icons.js";

function Section({ name, count, headerColor, bgColor, icon }) {  
  const renderTasks = () => {
    const tasks = [];
    for (let i = 0; i < count; i++) {
      tasks.push(<Task key={i} />);
    }
    return tasks;
  };

  return (
    <div
      className="w-[17rem] h-full relative"
      style={{ backgroundColor: bgColor }}>
      <Header name={name} count={count} color={headerColor} icon={icon} />

      <div className="mt-[3.75rem] h-[calc(100%-8rem)] overflow-y-scroll scroll-smooth scrollbar-hide">
        <div className="flex flex-col mb-6">
          {renderTasks()}

          <button className="bg-white rounded-full mx-auto mt-2 w-6 h-6">
            <img src={ addTask } alt="icon_add" className="mx-auto w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
