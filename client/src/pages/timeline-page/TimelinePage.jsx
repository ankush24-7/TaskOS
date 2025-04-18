import { useEffect, useState } from "react";
import Timeline from "./components/Timeline";
import processAPI from "@/services/api/processAPI";
import TimelineHeader from "./components/TimelineHeader";
import { TimelineProvider } from "@/contexts/TimelineContext";

const TimelinePage = () => {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const getProcesses = async () => {
      try {
        const { status, data } = await processAPI.getProcessesForTimeline();
        if (status === 200) setProcesses(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProcesses();
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-between sm:justify-start sm:px-10">
      <TimelineProvider processes={processes}>
        <TimelineHeader />
        <Timeline />
      </TimelineProvider>
    </div>
  );
};

export default TimelinePage;
