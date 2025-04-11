import { Link } from "react-router-dom";

const getTimes = (process, startsAt, endsAt) => {
  let start = startsAt; 
  let end = endsAt;
  if (process.part === 1) {
    const prevEnd = new Date(process.prevEnd);
    const prevDuration = (prevEnd - startsAt) / 60000;
    end = new Date(startsAt.getTime() + prevDuration * 60000);
  }
  if (process.part === 2) start = new Date(process.prevStart);

  const endMeridiem = end.getHours() >= 12 ? "pm" : "am";
  const startMeridiem = start.getHours() >= 12 ? "pm" : "am";

  const startTime = start.getMinutes()
    ? `${start.getHours() % 12 || 12}:${start.getMinutes().toString().padStart(2, "0")}` 
    : `${start.getHours() % 12 || 12}`;
  
    const endTime = end.getMinutes()
    ? `${end.getHours() % 12 || 12}:${end.getMinutes().toString().padStart(2, "0")}`
    : `${end.getHours() % 12 || 12}`;

  return startMeridiem === endMeridiem
    ? `${startTime} - ${endTime} ${startMeridiem}`
    : `${startTime}${startMeridiem} - ${endTime}${endMeridiem}`;
};

export const FifteenMinutesProcess = ({ pos, backgroundColor, title, startsAt }) => {
  const time = startsAt.toLocaleTimeString([], {hour: "numeric", minute: "2-digit" });

  return (
    <span
      style={{
        top: `${pos}%`,
        backgroundColor,
      }}
      className="absolute left-0.5 right-1 z-20 hover:z-30 flex px-0.5 rounded-md cursor-default overflow-hidden min-h-3.5 max-h-3.5 hover:max-h-32 hover:drop-shadow-[5px_5px_5px_rgba(0,0,0,0.8)] transition-discrete duration-500 ease-in-out">
      <p className="text-xs leading-[0.95rem] text-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal text-prim-black">
        {`${title}, ${time}`}
      </p>
    </span>
  );
};

export const ThirtyMinutesProcess = ({ pos, backgroundColor, title, startsAt, endsAt, process }) => {
  return (
    <span
      style={{
        top: `${pos}%`,
        backgroundColor,
      }}
      className="absolute left-0.5 right-1 z-20 hover:z-30 flex px-0.5 rounded-md cursor-default overflow-hidden min-h-[28.75px] max-h-[28.75px] hover:max-h-32 hover:drop-shadow-[5px_5px_5px_rgba(0,0,0,0.8)] transition-discrete duration-500 ease-in-out">
      <p className="whitespace-pre-line text-xs leading-[0.95rem] line-clamp-2 hover:line-clamp-none text-prim-black">
        {`${title}
          ${getTimes(process, startsAt, endsAt)}`}
      </p>
    </span>
  );
};

export const ThreeQuatersHourProcess = ({ pos, backgroundColor, title, startsAt, endsAt, process }) => {
  return (
    <span
      style={{
        top: `${pos}%`,
        backgroundColor,
      }}
      className="absolute left-0.5 right-1 z-20 hover:z-30 flex px-0.5 rounded-md cursor-default overflow-hidden min-h-[43.75px] max-h-[43.75px] hover:max-h-32 hover:drop-shadow-[5px_5px_5px_rgba(0,0,0,0.8)] transition-discrete duration-500 ease-in-out">
      <p className="whitespace-pre-line text-xs leading-[0.95rem] line-clamp-3 hover:line-clamp-none text-prim-black">
        {`${title}
          ${getTimes(process, startsAt, endsAt)}`}
      </p>
    </span>
  );
};

export const HourProcess = ({ pos, backgroundColor, title, startsAt, endsAt, process }) => {
  const height = (endsAt.getTime() - startsAt.getTime()) / 60000;

  return (
    <div
      style={{
        top: `${pos}%`,
        minHeight: `${height - 1.25}px`,
        maxHeight: `${height - 1.25}px`,
        backgroundColor,
      }}
      className="absolute left-0.5 right-1 z-20 flex px-0.5 rounded-md overflow-hidden hover:z-30 hover:max-h-32 
      hover:drop-shadow-[2px_5px_5px_rgba(0,0,0,0.8)] transition-discrete duration-200 ease-in-out">
      <p className="whitespace-pre-line text-xs leading-[0.95rem] line-clamp-3 hover:line-clamp-none text-prim-black">
        {`${title}
          ${getTimes(process, startsAt, endsAt)}`}
      </p>
    </div>
  );
};

const TimelineCards = {
  FifteenMinutesProcess,
  ThirtyMinutesProcess,
  ThreeQuatersHourProcess,
  HourProcess,
};

export default TimelineCards;
