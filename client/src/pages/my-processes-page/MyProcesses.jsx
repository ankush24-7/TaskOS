import dateUtils from "@/utils/dateUtils";
import { useEffect, useState } from "react";
import processAPI from "@/services/api/processAPI";
import MyProcessesHeader from "./components/MyProcessesHeader";
import { processCardIcons, priorityIcons } from "@/assets/icons/icons";

const renderPriority = (priority) => {
  switch (priority) {
    case 1:
      return (
        <span className="flex items-center pl-1 pr-1.5 py-0.5 gap-1 mt-auto w-fit rounded-full bg-white">
          <priorityIcons.HighPriority className="w-4 h-4" />
          <p className="text-sm text-neutral-900">High</p>
        </span>
      );
    case 2:
      return (
        <span className="flex items-center pl-1 pr-1.5 py-0.5 gap-1 mt-auto w-fit rounded-full bg-white">
          <priorityIcons.MediumPriority className="w-4 h-4" />
          <p className="text-sm text-neutral-900">Medium</p>
        </span>
      );
    case 3:
      return (
        <span className="flex items-center pl-1 pr-1.5 py-0.5 gap-1 mt-auto w-fit rounded-full bg-white">
          <priorityIcons.LowPriority className="w-4 h-4" />
          <p className="text-sm text-neutral-900">Low</p>
        </span>
      );
    default:
      return (
        <span className="flex items-center pl-1 pr-1.5 py-0.5 gap-1 mt-auto w-fit rounded-full bg-white">
          <priorityIcons.DefaultPriority className="w-4 h-4" />
          <p className="text-sm text-neutral-900">Trivial</p>
        </span>
      );
  }
};

const MyProcesses = () => {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const getProcesses = async () => {
      const { status, processes } = await processAPI.getProcessesByUser();
      if (status === 200) {
        setProcesses(processes);
      } else {
        console.error("Error fetching processes:", status);
      }
    };

    getProcesses();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col pb-4 px-5 overflow-y-hidden bg-gradient-to-r from-grad-l to-grad-r">
      <MyProcessesHeader />

      <div className="p-2 flex-grow vertical-scrollbar overflow-y-scroll rounded-2xl bg-neutral-800">
        {processes.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {processes.map((process) => {
              const duration = (process.endsAt && process.startsAt && (new Date(process.endsAt) - new Date(process.startsAt)) / 60000) || 0;
              return (
                <div
                  onClick={() => {}}
                  key={process._id}
                  style={{ backgroundColor: process.color.hex, willChange: "transform"}}
                  className="w-72 h-40 flex flex-col px-2.5 py-2 rounded-2xl cursor-pointer transition-normal duration-400 
                  linear drop-shadow-[4px_4px_5px_rgba(0,0,0,0.4)] hover:drop-shadow-[6px_6px_12px_rgba(0,0,0,0.8)]">
                  <div className="flex justify-between items-center">
                    <p className="text-[15px] max-w-28 text-ellipsis overflow-hidden whitespace-nowrap text-neutral-900">{process.projectId.title}</p>
                    <processCardIcons.Star className={`stroke-[1.5] stroke-prim-black ${process.starred && "fill-amber-300"}`} />
                  </div>

                  <p className="truncate-3-lines text-md leading-6 text-neutral-900">
                    {process.title}
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    {renderPriority(process.priority)}
                    <span className="flex items-center gap-3">
                      {process.deadline && (
                        <span className="flex items-end gap-1">
                          <processCardIcons.CalendarIcon className="w-4 h-4 stroke-neutral-900" />
                          <p className="text-sm leading-none text-neutral-900">
                            {dateUtils.formatDDMon(process.deadline)}
                          </p>
                        </span>
                      )}
                      {duration > 0 && (
                        <span className="flex items-end gap-1">
                          <processCardIcons.StopwatchIcon className="w-4 h-4 stroke-neutral-900" />
                          <p className="text-sm leading-none text-neutral-900">
                            {dateUtils.formatDuration(duration)}
                          </p>
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-2xl text-white">
            No processes assigned to you.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProcesses;
