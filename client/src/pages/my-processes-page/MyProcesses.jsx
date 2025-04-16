import dateUtils from "@/utils/dateUtils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckBox from "@/components/ui/CheckBox";
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
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [sortBy, setSortBy] = useState({ sortBy: "", order: 0 });
  
  const handleCheckbox = (index) => {
    setProjects((prevProjects) =>
      prevProjects.map((p, i) =>
        i === index ? { ...p, checked: !p.checked } : p
      )
    );
  }

  const handleClick = (process) => {
    navigate(`/projects/${process.projectId._id}/dashboard/`, {
      state: {
        selectedProcess: process, 
        showProcessModal: true,
      },
    });
  }  

  useEffect(() => {
    const updateProcesses = () => {
      const filteredProcesses = processes.map((process) => {
        const project = projects.find((project) => project.title === process.projectId.title);
        process.checked = project?.checked
        return process;
      });
      setProcesses(filteredProcesses);
    }

    updateProcesses();
  }, [projects]);

  useEffect(() => {
    const sortProcesses = () => {
      const sortedProcesses = [...processes].sort((a, b) => {
        if (sortBy.sortBy === "Priority") {
          return (a.priority - b.priority) * sortBy.order;
        } else if (sortBy.sortBy === "Deadline") {
          return (new Date(a.deadline) - new Date(b.deadline)) * sortBy.order;
        } else if (sortBy.sortBy === "Start Date") {
          return (new Date(a.startsAt) - new Date(b.startsAt)) * sortBy.order;
        }
        return 0;
      });
      setProcesses(sortedProcesses);
    }

    sortProcesses();
  }, [sortBy]);

  useEffect(() => {
    const getProcesses = async () => {
      const { status, processes } = await processAPI.getProcessesByUser();
      if (status === 200) {
        setProcesses(processes.map((process) => ({ ...process, checked: true })));
        const projectTitles = new Set(processes.map((process) => process.projectId.title));
        setProjects(Array.from(projectTitles).map((project) => ({ title: project, checked: true })));
      } else {
        console.error("Error fetching processes:", status);
      }
    };

    getProcesses();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col pb-4 px-10 overflow-y-hidden bg-gradient-to-r from-grad-l to-grad-r">
      <MyProcessesHeader 
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {processes.length > 0 ? (
        <div className="w-full h-130 flex divide-x-2 rounded-2xl divide-white/20 bg-neutral-800">
          <div className="px-3 py-3 w-4/5 vertical-scrollbar overflow-y-scroll rounded-l-2xl">
            <div className="flex flex-wrap gap-5">
              {processes.map((process) => {
                if (!process.checked) return null;
                const duration = (process.endsAt && process.startsAt && (new Date(process.endsAt) - new Date(process.startsAt)) / 60000) || 0;
                return (
                  <div
                    onClick={() => handleClick(process)}
                    key={process._id}
                    style={{ backgroundColor: process.color.hex, willChange: "transform"}}
                    className="w-[277px] h-40 flex flex-col px-2.5 py-2 rounded-2xl cursor-pointer transition-normal duration-400 
                    linear drop-shadow-[4px_4px_4px_rgba(0,0,0,0.8)] hover:drop-shadow-[6px_6px_6px_rgba(0,0,0)] hover:scale-101">
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
          </div>
          
          {projects.length > 0 && (
            <div className="flex flex-col flex-grow px-2 py-3 rounded-r-2xl">
              <h2 className="text-xl text-center text-white">Projects</h2>
              <div className="flex flex-col gap-1 mt-4">
                {projects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-2 rounded-xl bg-neutral-700">
                    <p className="text-white">{project.title}</p>
                    <CheckBox 
                      checked={project.checked}
                      handleClick={() => handleCheckbox(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-130 w-full mt-2 flex justify-center rounded-2xl text-gray-400 bg-neutral-800">
          <p className="mt-52 text-2xl">No assigned processes</p>
        </div>
      )}
    </div>
  );
};

export default MyProcesses;
