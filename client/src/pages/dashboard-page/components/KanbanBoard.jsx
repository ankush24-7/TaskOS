import { useState } from "react";
import { createPortal } from "react-dom";
import Section from "./kanban-board-components/Section";
import Task from "./kanban-board-components/ProcessCard";
import { useDashboard } from "@/contexts/DashboardContext";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";

function KanbanBoard() {
  const [activeSection, setActiveSection] = useState(null);
  const [activeProcess, setActiveProcess] = useState(null);
  const { sections, setSections, sectionCRUD, processes, setProcesses, processCRUD } = useDashboard();

  const onDragStart = (event) => {
    event.active.data.current.type === "process"
      ? setActiveProcess(event.active.data.current.process)
      : setActiveSection(event.active.data.current.section);
  };

  const onDragOver = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      for (let process of processes) {
        if (process._id === activeProcess._id) {
          process = activeProcess;
          return;
        }
      }
      return;
    }

    const isActiveProcess = active.data.current.type === "process";
    const isOverProcess = over.data.current.type === "process";
    const isOverSection = over.data.current.type === "section";

    if (!isActiveProcess) return;

    if (isActiveProcess && isOverProcess) {
      const activeProcess = active.data.current.process;
      const overProcess = over.data.current.process;

      const getNewOrder = (processes) => {
        const indexActive = processes.findIndex(process => process._id === activeProcess._id);
        const indexOver = processes.findIndex(process => process._id === overProcess._id);
        processes[indexActive].sectionId = processes[indexOver].sectionId;
        processes = arrayMove(processes, indexActive, indexOver);
        return processes;
      };

      const newOrder = getNewOrder(processes);
      setProcesses(newOrder);
    }

    if (isActiveProcess && isOverSection) {
      setProcesses(processes => {
        const indexActive = processes.findIndex(process => process._id === active.data.current.process._id);
        const sectionId = over.data.current.section._id;
        processes[indexActive].sectionId = sectionId;
        return arrayMove(processes, indexActive, indexActive);
      });
    }
  };

  const onDragEnd = async (event) => {
    setActiveProcess(null);
    setActiveSection(null);
    const { active, over } = event;
    if (over && active.data.current.type === "process") {
      processCRUD.updateProcessOrder(processes);
    }

    if (!over || active.id === over.id) return;
    if (active.data.current.type === "section") {
      const newSections = arrayMove(
        sections,
        sections.findIndex((section) => section._id === active.id),
        sections.findIndex((section) => section._id === over.id)
      );
      setSections(newSections);
      await sectionCRUD.updateSectionOrder(newSections);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  return (
    <div className="lg:mx-3.5 px-1.5 lg:pt-0.25 flex-grow horizontal-scrollbar overflow-x-scroll rounded-2xl overflow-y-hidden bg-neutral-800">
      <DndContext
        sensors={sensors}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        collisionDetection={closestCorners}>
        <div className="flex h-full w-fit pt-1 gap-1">
          <SortableContext items={sections.map((section) => section._id)}>
            {sections.map((section) => (
              <Section
                key={section._id}
                section={section}
                processes={processes.filter(
                  (process) => process.sectionId === section._id
                )}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeProcess && (
              <Task key={activeProcess._id} process={activeProcess} />
            )}
            {activeSection && (
              <Section
                key={activeSection.id}
                section={activeSection}
                processes={processes.filter(
                  (process) => process.sectionId === activeSection._id
                )}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
