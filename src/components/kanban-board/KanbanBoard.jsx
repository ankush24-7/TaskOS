import { createPortal } from "react-dom";
import Task from "./sections/tasks/Task.jsx";
import Sections from "./sections/Sections.jsx";
import React, { useMemo, useState } from 'react';
import { tasks } from "../../utils/TaskData.jsx";
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { sections as initialDashboard } from "../../utils/Section-Data.jsx";
import { DndContext, DragOverlay, PointerSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core';

function KanbanBoard() {
  const [taskData, setTaskData] = useState(tasks);
  const [activeTask, setActiveTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [sections, setSections] = useState(initialDashboard);

  const onDragStart = (event) => {
    if(event.active.data.current.type === 'task'){
      setActiveTask(event.active.data.current.task);
    }
    else setActiveSection(event.active.data.current.section);
  }

  const onDragOver = (event) => {
    const {active, over} = event;
    if(!over || active.id === over.id) return;
    
    const isActiveTask = active.data.current.type === 'task';
    const isOverTask = over.data.current.type === 'task';
    const isOverSection = over.data.current.type === 'section';

    if(!isActiveTask) return;

    if(isActiveTask && isOverTask) {
      setTaskData((taskData) => {
        const indexActive = taskData.findIndex(task => task.id === active.data.current.task.id);
        const indexOver = taskData.findIndex(task => task.id === over.data.current.task.id);
        taskData[indexActive].sectionId = taskData[indexOver].sectionId;
        return arrayMove(taskData, indexActive, indexOver);
      })
    }


    if(isActiveTask && isOverSection){
      setTaskData((tasks) => {
        const indexActive = tasks.findIndex(task => task.id === active.data.current.task.id);
        const sectionId = over.data.current.section.id;
        taskData[indexActive].sectionId = sectionId;
        return arrayMove(tasks, indexActive, indexActive);
      });
    }
  }

  const onDragEnd = (event) => {
    setActiveTask(null);
    setActiveSection(null);
    const {active, over} = event;
    if(!over || active.id === over.id) return;
    console.log(active, over);
    if(active.data.current.type === 'section'){
      setSections((sections) => {
          const indexActive = sections.findIndex(section => section.id === active.id);
          const indexOver = sections.findIndex(section => section.id === over.id);
          return arrayMove(sections, indexActive, indexOver);
        }
      );
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 }
    })
  );

  return (
    <div className="pb-0.5 flex-grow horizontal-scrollbar overflow-x-scroll overflow-y-hidden">
      <DndContext 
        sensors={sensors} 
        onDragEnd={onDragEnd} 
        onDragOver={onDragOver} 
        onDragStart={onDragStart} 
      >
        <div className="flex h-full w-fit gap-2 px-2 pt-1">
          <SortableContext items={useMemo(() => sections.map(section => section.id), [sections])}>
            {sections.map((section) => (
              <Sections
                key={section.id}
                section={section}
                tasks={taskData.filter(task => task.sectionId === section.id)}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal (
          <DragOverlay>
            {activeTask && <Task key={activeTask.id} task={activeTask} />}
            {activeSection && <Sections key={activeSection.id} section={activeSection} tasks={taskData.filter(task => task.sectionId === activeSection.id)} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;