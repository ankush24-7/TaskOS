import React from "react";
import Tags from "./Tags.jsx";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { taskIcons, priorityIcons } from "../../../../assets/icons/icons.jsx";

function Task({ task, onClick }) {
  return (
    <>
      {/* Add button to create a new inplace task */}
      <div className="group w-full h-2 flex justify-center">
        <button 
          className="bg-white rounded-full mx-auto w-6 h-6 opacity-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] -translate-y-1 group-hover:opacity-100"
          onClick={ () => onClick() }  
        >
          <taskIcons.Plus className="mx-auto w-4" />
        </button>
      </div>

      {/* Task card */}
      <div 
        className="flex flex-col py-2 w-full h-[7.75rem] rounded-2xl bg-white justify-between cursor-pointer"
        onClick= { () => onClick(task) }
      >
        <div className="flex justify-between px-3 items-center">
          <div className="flex">
              { React.createElement(priorityIcons[task.priority]) }
              <p className="text-lg">{ task.name }</p>
          </div>

          <taskIcons.Profile addedClass="p-1.5 w-7 h-7" />
        </div>

        <div className="flex gap-2 px-3 items-center">
          <Tags />
          <Tags />
          <Tags />
        </div>
      </div>
    </>
  );
}

export default Task;