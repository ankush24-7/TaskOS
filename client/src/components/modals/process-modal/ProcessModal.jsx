import { useState } from "react";
import useDropDown from "@/hooks/useDropDown";
import CloseBtn from "@/components/ui/CloseBtn";
import { modalIcons, priorityIcons } from "@icons";
import DateSelector from "./components/DateSelector";
import RadioSwitch from "@/components/ui/RadioSwitch";
import useDateSelector from "@/hooks/useDateSelector";
import { validateProcessName } from "@/utils/validateForm";
import { useDashboard } from "@/contexts/DashboardContext";
import DisplayPicture from "@/components/ui/DisplayPicture";
import ProcessScheduler from "./components/ProcessScheduler";
import ProcessDescription from "./components/ProcessDescription";
import ProcessColorDropDown from "./components/ProcessColorDropDown";
import ProcessAssigneeDropDown from "./components/ProcessAssigneeDropDown";
import ProcessPriorityDropDown from "./components/ProcessPriorityDropDown";

const renderPriority = (priority) => {
  switch (priority) {
    case 1:
      return (
        <span className="flex items-center p-1.5 gap-1.5 rounded-full bg-white hover:scale-101">
          <priorityIcons.HighPriority className="w-6 h-6" />
          <p className="text-neutral-900">High Priority</p>
        </span>
      );
    case 2:
      return (
        <span className="flex items-center p-1.5 gap-1.5 rounded-full bg-white hover:scale-101">
          <priorityIcons.MediumPriority className="w-6 h-6" />
          <p className="text-neutral-900">Medium Priority</p>
        </span>
      );
    case 3:
      return (
        <span className="flex items-center justify-center p-1.5 gap-1.5 rounded-full bg-white hover:scale-101">
          <priorityIcons.LowPriority className="w-6 h-6" />
          <p className="text-neutral-900">Low Priority</p>
        </span>
      );
    default:
      return (
        <span className="flex items-center p-1.5 gap-1.5 rounded-full bg-white hover:scale-101">
          <priorityIcons.DefaultPriority className="w-6 h-6" />
          <p className="text-neutral-900">Trivial Priority</p>
        </span>
      );
  }
};

function ProcessModal({ selectedProcess: process, setShowProcessModal, section }) {
  const [error, setError] = useState("");
  const [border, setBorder] = useState("#ffffff25");
  const [title, setTitle] = useState(process?.title || "");
  const [priority, setPriority] = useState(process?.priority || 0);
  const [starred, setStarred] = useState(process?.starred || false);
  const [schedule, setSchedule] = useState(process?.schedule || false);
  const [completed, setCompleted] = useState(process?.completed || false);
  const [assignedTo, setAssignedTo] = useState(process?.assignedTo || null);
  const [description, setDescription] = useState(process?.description || "");
  const [showDeadline, setShowDeadline] = useState(process?.showDeadline || false);
  const [endsAt, setEndsAt] = useState(process?.endsAt && new Date(process.endsAt) || null);
  const [color, setColor] = useState(process?.color || { hex: "#C2D6EB", name: "Light blue" });
  const [startsAt, setStartsAt] = useState(process?.startsAt && new Date(process.startsAt) || null);
  const [deadline, setDeadline] = useState(process?.deadline && new Date(process.deadline) || new Date());

  const { processCRUD } = useDashboard();
  const { isOpen: showColors, setIsOpen: setShowColors, dropdownRef: colorsRef } = useDropDown();
  const { isOpen: showAssignee, setIsOpen: setShowAssignee, dropdownRef: assigneeRef } = useDropDown();
  const { isOpen: showPriority, setIsOpen: setShowPriority, dropdownRef: priorityRef } = useDropDown();
  const { day, setDay, month, setMonth, year, setYear } = useDateSelector({ date: deadline, setDate: setDeadline });

  const handleDelete = async () => {
    await processCRUD.deleteProcess(process._id, process.sectionId);
    setShowProcessModal(false);
  }

  const handleSubmit = async () => {
    if (!title) return;
    if (!process) {
      const newProcess = {
        title,
        description,
        color,
        priority,
        starred,
        completed,
        assignedTo,
        showDeadline,
        deadline,
        schedule,
        startsAt,
        endsAt,
      };
      await processCRUD.createProcess(newProcess, section._id, section.processes.length);
    }
    else {
      const updatedProcess = {
        ...process,
        title,
        description,
        color,
        priority,
        starred,
        completed,
        assignedTo,
        showDeadline,
        deadline,
        schedule,
        startsAt,
        endsAt,
      };
      await processCRUD.updateProcess(updatedProcess);
    }
    setShowProcessModal(false);
  }

  const handleCancel = () => {
    if (!process) setShowProcessModal(false);
    else if (!title) validateProcessName(title, setColor, setError);
    else setShowProcessModal(false);
  }

   return (
    <div className="absolute z-20 inset-0 flex justify-center pt-10 backdrop-blur-[1px] bg-black/5">
      <div
        style={{ backgroundColor: color.hex }}
        className="modal absolute z-30 flex flex-col w-[50rem] h-[34rem] rounded-3xl divide-y drop-shadow-[20px_20px_20px_rgba(0,0,0,0.3)] divide-black/10">
        <div className="w-full flex justify-between items-center px-4 py-2.5 rounded-t-3xl">
          <div className="relative w-fit" ref={assigneeRef}>
            <button
              type="button"
              onClick={() => setShowAssignee(!showAssignee)}
              style={{ backgroundColor: showAssignee && "#fff" }}
              className="group flex items-center justify-center rounded-full cursor-pointer bg-white/60 hover:bg-white">
              {assignedTo ? (
                <span className="flex gap-1.5 items-center justify-between py-0.5 pl-1.5 pr-3">
                  <DisplayPicture
                    radius={"24px"}
                    color={assignedTo.color || "#B1401B"}
                    firstName={assignedTo.name.firstName}
                    publicId={assignedTo.displayPicture.publicId || ""}
                  />
                  <div className="flex flex-col items-start">
                    <p className="text-xs leading-none text-neutral-700">Assigned to</p>
                    <span className="flex items-center gap-1">
                      <p className="text-[0.95rem] leading-tight text-neutral-900">{assignedTo.username}</p>
                      <modalIcons.ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 stroke-neutral-900" />
                    </span>
                  </div>
                </span>
              ) : (
                <span className="flex items-center gap-1 py-1 px-2">
                  <p className="text-neutral-900">Assign</p>
                  <modalIcons.ChevronDown className="w-5 h-5 stroke-neutral-900" />
                </span>
              )}
            </button>

            {showAssignee && (
              <ProcessAssigneeDropDown 
                assignedTo={assignedTo}
                setAssignedTo={setAssignedTo} 
                setShowAssignee={setShowAssignee}
              />
            )}
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setCompleted(!completed)}
              className={`flex pl-1 pr-2 py-1 gap-1.5 rounded-full group cursor-pointer hover:scale-101 hover:shadow-sm ${completed ? "bg-green-400": "bg-white"}`}>
              <modalIcons.Complete className={`${completed ? "stroke-white" : "stroke-green-400"}`} />
              <p className={`${completed ? "text-white" : "text-green-400"}`}>
                {completed ? "Completed" : "Complete Process"}
              </p>
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="group cursor-pointer p-1 rounded-full hover:bg-white">
              <modalIcons.Del className="stroke-neutral-900" />
            </button>
            {/* <button
              type="button"
              onClick={handleArchive}
              className="group cursor-pointer p-1 rounded-full hover:bg-white">
              <modalIcons.Archive className="stroke-neutral-900" />
            </button> */}
            <CloseBtn onClick={() => setShowProcessModal(false)} dark={false} />
          </div>
        </div>

        <div className="h-full flex divide-x divide-black/5">
          <div className="flex flex-col w-2/3 pt-4 pb-10 px-4">
            <label htmlFor="title" className="text-neutral-900">
              Title*
            </label>
            <textarea
              id="title"
              type="text"
              placeholder={"Process Title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              onBlur={() => validateProcessName(title, setBorder, setError)}
              style={{ borderColor: border }}
              className="rounded-md p-1 mt-1 text-md field-sizing-content max-h-16 focus:outline-none placeholder:text-md border-2 bg-white/60"
            />
            <p className="text-sm h-4 text-red-500">{error}</p>

            <ProcessDescription
              description={description}
              setDescription={setDescription}
            />

            <div className="flex gap-5 items-center mt-5">
              <div className="relative w-fit" ref={priorityRef}>
                <button
                  type="button"
                  onClick={() => setShowPriority(!showPriority)}
                  className="cursor-pointer w-fit">
                  {renderPriority(priority)}
                </button>

                {showPriority && <ProcessPriorityDropDown setPriority={setPriority} />}
              </div>

              <div className="relative w-fit" ref={colorsRef}>
                <button
                  type="button"
                  onClick={() => setShowColors(!showColors)}
                  className="flex item-center w-fit p-1.5 gap-1.5 cursor-pointer rounded-full bg-white hover:scale-101">
                  <span
                    style={{
                      backgroundColor: color.hex || "transparent",
                    }}
                    className="w-6 h-6 rounded-full border border-black"></span>
                  <p className="text-neutral-900">{color.name}</p>
                </button>

                {showColors && (
                  <ProcessColorDropDown
                    color={color.hex}
                    setColor={setColor}
                    setShowColors={setShowColors}
                  />
                )}
              </div>

              <button 
                onClick={() => setStarred(!starred)}
                className="flex item-center w-fit px-2 py-1.5 gap-1 cursor-pointer rounded-full bg-white hover:scale-101">
                <modalIcons.Star
                  className={`w-6 h-6 stroke-1 stroke-neutral-900 ${
                    starred && "fill-amber-300"
                  }`}
                />
                <p className="text-neutral-900">
                  {starred ? "Starred" : "Star"}
                </p>
              </button>
            </div>
          </div>

          <div className="flex flex-col grow items-center divide-y divide-black/10">
            <div className="w-full flex flex-col px-2.5 py-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <modalIcons.CalendarIcon className="w-6 h-6 stroke-[1.5] stroke-neutral-900" />
                  <p className="mt-1 leading-none text-neutral-900">Deadline</p>
                </span>
                <RadioSwitch
                  color={color.hex}
                  state={showDeadline}
                  setState={setShowDeadline}
                />
              </div>

              {showDeadline && 
                <div className="flex items-center justify-center gap-3 pt-4">
                  <p className="text-neutral-900 mb-1">Due on</p>
                  <DateSelector 
                    day={day}
                    setDay={setDay}
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                  />
                </div>
              }
            </div>

            <div className="w-full flex flex-col px-2.5 pt-4">
              <div 
                style={{ paddingBottom: schedule ? "0.5rem": "1rem" }}
                className="flex items-center justify-between">
                <span className="flex items-start gap-2">
                  <modalIcons.Timeline className="w-6 h-6 stroke-neutral-900" />
                  <p className="text-md text-neutral-900">Schedule</p>
                </span>
                <RadioSwitch 
                  state={schedule} 
                  color={color.hex}
                  setState={setSchedule} 
                />
              </div>

              {schedule && (
                <ProcessScheduler
                  startsAt={startsAt}
                  setStartsAt={setStartsAt}
                  endsAt={endsAt}
                  setEndsAt={setEndsAt}
                  assignedTo={assignedTo}
                />
              )}
            </div>

            <div className="w-full flex flex-col px-2.5 py-4 ">
              <span className="flex items-start gap-2">
                <modalIcons.LogIcon className="stroke-1 stroke-neutral-900" />
                <p className="text-md text-neutral-900">Logs</p>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 px-4 py-2">
          <button
            onClick={handleSubmit}
            className="px-3 py-1.5 rounded-lg cursor-pointer text-white bg-blue-600 hover:bg-blue-700">
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1.5 rounded-lg cursor-pointer text-white bg-red-600 hover:bg-red-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProcessModal;
