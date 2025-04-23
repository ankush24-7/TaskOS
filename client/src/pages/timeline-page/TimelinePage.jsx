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
    <TimelineProvider processes={processes}>
      <div className="flex flex-col w-full justify-between overflow-y-hidden pb-2 md:pb-6 md:justify-start lg:pb-0 px-2 md:px-4 lg:px-10">
        <TimelineHeader />
        <Timeline />
      </div>
    </TimelineProvider>
  );
};

export default TimelinePage;
