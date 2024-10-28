import "../../styles/kanban.css";
import Sections from "./sections/Sections.jsx";
import React, { useState, useMemo } from 'react';
import { tasks } from "../../utils/TaskData.jsx";
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { sections as intitialDashboard } from "../../utils/Section-Data.jsx";
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

function KanbanBoard() {
  const [sections, setSections] = useState(intitialDashboard);
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const [taskData, setTaskData] = useState(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragEnd = (event) => {
    const {active, over} = event;
    if (active.id !== over.id) {
      const indexActive = sections.findIndex(section => section.id === active.id);
      const indexOver = sections.findIndex(section => section.id === over.id);
      setSections(arrayMove(sections, indexActive, indexOver));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 }
    })
  );

  return (
    <div className="flex-grow scrollbar scroll-smooth overflow-x-scroll overflow-y-hidden">
      <DndContext onDragEnd={onDragEnd} modifiers={[restrictToHorizontalAxis]} sensors={sensors} >
        <div className="flex h-full w-fit gap-2 px-2 pt-1">
          <SortableContext items={sectionIds}>
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
      </DndContext>
    </div>
  );
}

export default KanbanBoard;