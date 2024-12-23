import React from "react";
import Tags from "./Tags.jsx";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { taskIcons, priorityIcons } from "../../../../assets/icons/icons.jsx";

function Task({ task, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task: task,
    },
    attributes: {
      role: name,
      roleDescription: "taskCard.desc",
      tabIndex: task.index,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  }

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="w-full"
      >
        <div className="w-full h-2"></div>
        <div className="w-full h-[7.75rem] rounded-2xl bg-white/30"></div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full"
    >
      <div className="group w-full h-2 flex justify-center">
        <button 
          className="relative z-20 rounded-full mx-auto w-6 h-6 opacity-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] -translate-y-1 bg-white group-hover:opacity-100"
          onClick={ () => onClick() }  
        >
          <taskIcons.Plus className="mx-auto w-4" />
        </button>
      </div>

      <div 
        className="flex flex-col py-2 w-full h-[7.75rem] rounded-2xl justify-between cursor-pointer drop-shadow-[4px_4px_5px_rgba(0,0,0,0.4)] bg-white"
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
    </div>
  );
}

export default Task;