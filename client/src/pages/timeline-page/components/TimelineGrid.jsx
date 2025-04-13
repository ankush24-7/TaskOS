import TimelineCards from "./TimelineCards";
import { useNavigate } from "react-router-dom";
import { useTimeline } from "@/contexts/TimelineContext";

const TimelineGrid = () => {
  const navigate = useNavigate();
  const { days, dates, currentWeekProcesses } = useTimeline();

  const pos = Math.floor(
    ((new Date().getHours() * 60 + new Date().getMinutes()) / (24 * 60)) * 100
  );

  const handleClick = (process) => {
    navigate(`/projects/${process.projectId}/dashboard/`, {
      state: {
        selectedProcess: process, 
        showProcessModal: true,
      },
    });
  }

  const TimelineColumn = ({ date, i }) => {
    return (
      <div 
        key={i}
        style={{ width: `${100 / days}%` }}
        className="relative flex flex-col h-fit border-r last:border-r-0 border-r-gray-400/30">
        {[...Array(24).keys()].map((i) => (
          <span key={i} className="flex w-full min-h-15 border-b last:border-b-0 border-b-gray-400/30" />
        ))}

        {date.toDateString() === new Date().toDateString() && (
          <span
            style={{ top: `${pos}%` }}
            className="absolute w-full z-30 flex items-center">
            <span className="w-2 h-2 rounded-full bg-prim-yellow-50" />
            <span className="h-0.5 w-full rounded-full bg-prim-yellow-50" />
          </span>
        )}

        {currentWeekProcesses.map((process, i) => {
          const startsAt = new Date(process.startsAt);
          const endsAt = new Date(process.endsAt);
          if (startsAt.getDate() === date.getDate()) {
            const duration = (endsAt.getTime() - startsAt.getTime()) / 60000;
            const pos = ((startsAt.getHours() * 60 + startsAt.getMinutes()) / (1440)) * 100;
            if (duration === 15) {
              return (
                <TimelineCards.FifteenMinutesProcess
                  key={i}
                  pos={pos}
                  startsAt={startsAt}
                  title={process.title}
                  backgroundColor={process.color.hex}
                  handleClick={() => handleClick(process)}
                />
              );
            } else if (duration === 30) {
              return (
                <TimelineCards.ThirtyMinutesProcess
                  key={i}
                  pos={pos}
                  process={process}
                  endsAt={endsAt}
                  startsAt={startsAt}
                  title={process.title}
                  backgroundColor={process.color.hex}
                  handleClick={() => handleClick(process)}
                />
              );
            } else if (duration === 45) {
              return (
                <TimelineCards.ThreeQuatersHourProcess
                  key={i}
                  pos={pos}
                  process={process}
                  endsAt={endsAt}
                  startsAt={startsAt}
                  title={process.title}
                  backgroundColor={process.color.hex}
                  handleClick={() => handleClick(process)}
                />
              );
            } else {
              return (
                <TimelineCards.HourProcess
                  key={i}
                  pos={pos}
                  process={process}
                  endsAt={endsAt}
                  startsAt={startsAt}
                  title={process.title}
                  backgroundColor={process.color.hex}
                  handleClick={() => handleClick(process)}
                  />
              );
            }
          }
        })}
      </div>
    );
  };

  return dates.map((date, i) => TimelineColumn({ date, i }));
};

export default TimelineGrid;
