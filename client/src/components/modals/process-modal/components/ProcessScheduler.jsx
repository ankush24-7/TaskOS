import { useEffect } from "react";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import { TraingleAlert } from "@/assets/icons/icons";
import useDateSelector from "@/hooks/useDateSelector";

const ProcessScheduler = ({ startsAt, setStartsAt, endsAt, setEndsAt, assignedTo }) => {
  const {
    day: startDate,
    setDay: setStartDate,
    month: startMonth,
    setMonth: setStartMonth,
    year: startYear,
    setYear: setStartYear,
    hour: startHour,
    setHour: setStartHour,
    minute: startMinute,
    setMinute: setStartMinute,
  } = useDateSelector({ date: startsAt, setDate: setStartsAt });

  const {
    day: endDate,
    setDay: setEndDate,
    month: endMonth,
    setMonth: setEndMonth,
    year: endYear,
    setYear: setEndYear,
    hour: endHour,
    setHour: setEndHour,
    minute: endMinute,
    setMinute: setEndMinute,
  } = useDateSelector({ date: endsAt, setDate: setEndsAt });

  useEffect(() => {
    if (!startsAt) setEndHour(startHour + 1);
    else {
      if (startsAt > endsAt) {
        const newEndTime = new Date(startsAt);
        newEndTime.setHours(startHour + 1);
        setEndsAt(newEndTime);
        setEndDate(newEndTime.getDate());
        setEndMonth(newEndTime.getMonth());
        setEndYear(newEndTime.getFullYear());
        setEndHour(newEndTime.getHours());
        setEndMinute(newEndTime.getMinutes());
      }
    }
  }, [startsAt])

  useEffect(() => {
    if (startsAt > endsAt){
      const duration = (startsAt - endsAt);
      console.log(duration);
      const newStartTime = new Date(endsAt - duration);
      setStartsAt(newStartTime);
      setStartDate(newStartTime.getDate());
      setStartMonth(newStartTime.getMonth());
      setStartYear(newStartTime.getFullYear());
      setStartHour(newStartTime.getHours());
      setStartMinute(newStartTime.getMinutes());
    }
  }, [endsAt]);

  return (
    <div className="flex flex-col pb-2">
      <p className="text-md text-neutral-900 mb-1">Start</p>
      <div className="flex items-center justify-center gap-1.5 pb-2">
        <DateSelector
          day={startDate}
          month={startMonth}
          year={startYear}
          setDay={setStartDate}
          setMonth={setStartMonth}
          setYear={setStartYear}
        />
        <TimeSelector
          hour={startHour}
          setHour={setStartHour}
          minute={startMinute}
          setMinute={setStartMinute}
        />
      </div>
      <p className="text-md text-neutral-900 mb-1">End</p>
      <div className="flex items-center justify-center gap-1.5">
        <DateSelector
          day={endDate}
          setDay={setEndDate}
          month={endMonth}
          setMonth={setEndMonth}
          year={endYear}
          setYear={setEndYear}
        />
        <TimeSelector
          hour={endHour}
          setHour={setEndHour}
          minute={endMinute}
          setMinute={setEndMinute}
        />
      </div>
      {!assignedTo && (
        <div className="flex items-end mt-2 gap-0.5">
          <TraingleAlert className="w-3.5 h-3.5 stroke-red-700" />
          <p className="text-xs leading-none text-red-700">
            Assign process to show on timeline
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcessScheduler;
