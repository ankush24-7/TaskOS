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
    <div className="flex flex-col w-full flex-grow sm:px-10 bg-gradient-to-r from-grad-l to-grad-r">
      <TimelineProvider processes={processes}>
        <TimelineHeader />
        <Timeline />
      </TimelineProvider>
    </div>
  );
};

export default TimelinePage;
