import { useEffect, useRef, useState, useContext, createContext } from "react";

const TimelineContext = createContext();

export const useTimeline = () => useContext(TimelineContext);

export const TimelineProvider = ({ processes, children }) => {
  const refreshRef = useRef(null);
  const [year, setYear] = useState("");
  const [dates, setDates] = useState([]);
  const [month, setMonth] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentWeekProcesses, setCurrentWeekProcesses] = useState([]);
  const [days, setDays] = useState(window.innerWidth > 1024 ? 7 : 4);

  useEffect(() => {
    const getRange = () => {
      let result = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (offset) today.setDate(today.getDate() + offset);
      if (days === 7) today.setDate(today.getDate() - today.getDay());

      result.push(today);
      for (let i = 1; i < days; i++) {
        const next = new Date(today);
        next.setDate(today.getDate() + i);
        if (i === days - 1) next.setHours(23, 59, 59, 999);
        result.push(next);
      }

      setDates(result);
      setYear(today.getFullYear());
      setMonth(today.toLocaleString("default", { month: "long" }));
    };

    refreshRef.current = getRange;
    getRange();
  }, [days, processes, offset]);

  useEffect(() => {
    const getProcessesInRange = () => {
      const filteredProcesses = processes.filter((process) => {
        const startsAt = new Date(process.startsAt);
        const endsAt = new Date(process.endsAt);
        const start = new Date(dates[0].toString());
        const end = new Date(dates[days - 1].toString());
        return start <= startsAt && startsAt <= end || start <= endsAt && endsAt <= end;
      });
      
      setCurrentWeekProcesses(filteredProcesses);
    };

    getProcessesInRange();
  }, [dates]);

  return (
    <TimelineContext.Provider
      value={{
        refreshRef,
        month,
        year,
        dates,
        offset,
        setOffset,
        days,
        setDays,
        currentWeekProcesses,
      }}>
      {children}
    </TimelineContext.Provider>
  );
};
