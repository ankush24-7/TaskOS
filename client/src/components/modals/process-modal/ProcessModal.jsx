import { forwardRef } from "react";
import CloseBtn from "@/components/ui/CloseBtn";
import DateSelector from "./components/DateSelector";
import useProcesModal from "@/hooks/useProcessModal";
import RadioSwitch from "@/components/ui/RadioSwitch";
import useDateSelector from "@/hooks/useDateSelector";
import { processModalIcons } from "@/assets/icons/icons";
import { useDashboard } from "@/contexts/DashboardContext";
import { validateProcessName } from "@/utils/validateForm";
import ProcessScheduler from "./components/ProcessScheduler";
import ProcessDescription from "./components/ProcessDescription";
import ProcessColorDropDown from "./components/ProcessColorDropDown";
import ProcessAssigneeDropDown from "./components/ProcessAssigneeDropDown";
import ProcessPriorityDropDown from "./components/ProcessPriorityDropDown";

const ProcessModal = forwardRef(({ selectedProcess: process, setShowProcessModal, section }, ref) => {
  const { 
    error, setError, border, setBorder, title, setTitle, priority, setPriority, starred, setStarred, schedule, 
    setSchedule, completed, setCompleted, assignedTo, setAssignedTo, description, setDescription, showDeadline,
    setShowDeadline, endsAt, setEndsAt, color, setColor, startsAt, setStartsAt, deadline, setDeadline 
  } = useProcesModal({ process });
  const { processCRUD } = useDashboard();
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
        schedule,
        startsAt,
        endsAt,
        deadline: showDeadline ? deadline : null,
      };
      await processCRUD.createProcess(newProcess, section._id);
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

  return (
    <div className="absolute z-20 inset-0 flex justify-center md:pt-10 backdrop-blur-[1px] bg-black/10">
      <div
        ref={ref}
        style={{ backgroundColor: color.hex }}
        className="modal absolute z-30 flex flex-col w-full md:w-[80%] lg:w-[50rem] h-full md:h-[80%] lg:h-[34rem] md:rounded-3xl divide-y 
        drop-shadow-[20px_20px_20px_rgba(0,0,0,0.3)] overflow-y-scroll scrollbar-hide divide-black/10">
        <div className="w-full flex justify-between items-center px-4 py-2.5 rounded-t-3xl">
          <ProcessAssigneeDropDown
            assignedTo={assignedTo}
            setAssignedTo={setAssignedTo}
          />

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setCompleted(!completed)}
              className={`btn-shadow flex pl-1 pr-2 py-1 gap-1.5 rounded-full group cursor-pointer hover:scale-101 hover:shadow-sm ${completed ? "bg-green-400": "bg-white"}`}>
              <processModalIcons.Complete className={`${completed ? "stroke-white" : "stroke-green-400"}`} />
              <p className={`${completed ? "text-white" : "text-green-400"}`}>
                {completed ? "Completed" : "Complete Process"}
              </p>
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="group cursor-pointer p-1 rounded-full hover:bg-white">
              <processModalIcons.Del className="stroke-neutral-900" />
            </button>
            <CloseBtn onClick={() => setShowProcessModal(false)} dark={false} />
          </div>
        </div>

        <div className="h-full flex flex-col md:flex-row pb-10 md:pb-0 divide-x divide-black/5">
          <div className="flex flex-col w-full md:w-2/3 pt-4 pb-10 px-4">
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
              <ProcessPriorityDropDown 
                priority={priority}
                setPriority={setPriority} 
              />

              <ProcessColorDropDown
                color={color}
                setColor={setColor}
              />

              <button 
                onClick={() => setStarred(!starred)}
                className="btn-shadow flex item-center w-fit px-2 py-1.5 gap-1 cursor-pointer rounded-full bg-white">
                <processModalIcons.Star className={`w-6 h-6 stroke-1 stroke-neutral-900 ${ starred && "fill-amber-300" }`} />
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
                  <processModalIcons.CalendarIcon className="w-6 h-6 stroke-[1.5] stroke-neutral-900" />
                  <p className="mt-1 leading-none text-neutral-900">Deadline</p>
                </span>
                <RadioSwitch
                  color={color.hex}
                  checked={showDeadline}
                  setChecked={setShowDeadline}
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
                  <processModalIcons.Timeline className="w-6 h-6 stroke-neutral-900" />
                  <p className="text-md text-neutral-900">Schedule</p>
                </span>
                <RadioSwitch 
                  color={color.hex}
                  checked={schedule} 
                  setChecked={setSchedule} 
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
                <processModalIcons.LogIcon className="stroke-1 stroke-neutral-900" />
                <p className="text-md text-neutral-900">Logs</p>
              </span>
            </div>
          </div>
        </div>

        <div 
          style={{ backgroundColor: color.hex }}
          className="sticky bottom-0 md:block px-4 py-2 rounded-b-3xl">
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={handleSubmit}
              className="px-3 py-1.5 rounded-xl cursor-pointer text-white bg-prim-yellow-100 hover:bg-prim-yellow-200">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowProcessModal(false)}
              className="px-3 py-1.5 rounded-xl cursor-pointer text-white bg-red-600 hover:bg-red-700">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
})

export default ProcessModal;
