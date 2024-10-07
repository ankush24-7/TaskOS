import { useState } from 'react';
import React, { useMemo } from 'react';
import Sections from "./sections/Sections.jsx";
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sections as intitialDashboard } from "../../utils/Section-Data.jsx";

function KanbanBoard() {
  const [sections, setSections] = useState(intitialDashboard);
  const sectionId = useMemo(() => sections.map((section) => section.id), [sections]);

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
    <div className="h-full overflow-x-scroll overflow-y-hidden scrollbar-hide bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <DndContext onDragEnd={onDragEnd} modifiers={[restrictToHorizontalAxis]} sensors={sensors} >
        <div className="flex h-full w-fit gap-2 px-2 pt-1">
          <SortableContext items={sectionId}>
            {sections.map((section) => (
              <Sections
                key={section.id}
                section={section}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
