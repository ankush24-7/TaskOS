import { useEffect, useState } from "react";

const useDateSelector = ({ date, setDate }) => {
  const today = new Date();
  const [day, setDay] = useState(date?.getDate() || today.getDate());
  const [month, setMonth] = useState(date?.getMonth() || today.getMonth());
  const [year, setYear] = useState(date?.getFullYear() || today.getFullYear());
  const [hour, setHour] = useState(date?.getHours() || (today.getMinutes() < 45 ? today.getHours(): today.getHours() + 1));
  const [minute, setMinute] = useState(date?.getMinutes() || (15 * Math.ceil(today.getMinutes() / 15)) % 60);

  useEffect(() => {
    const newDate = new Date(year, month, day, hour, minute);
    setDate(newDate);
  }, [day, month, year, hour, minute]);

  return { 
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    hour,
    setHour,
    minute,
    setMinute,
  };
};

export default useDateSelector;
