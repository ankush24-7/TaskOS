import { Link } from "react-router-dom";
import dateUtils from "@/utils/dateUtils";
import renderMembers from "@/utils/renderMembers";
import { useEffect, useRef, useState } from "react";
import { projectCardIcons } from "@/assets/icons/icons";

const ProjectCard = ({ title, _id, teamMembers, status, updatedAt, deadline, userId }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");
  const [expanded, setExpanded] = useState(false);
  const color =
    status === "Completed"
      ? "#00c951"
      : status === "Pending"
      ? "#fb2c36"
      : status === "Inactive"
      ? "#99a1af"
      : "#fbbd23";

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [expanded]);

  return (
    <div className="w-full flex flex-col justify-center px-3 py-2 pb-2.5 mt-1.5 rounded-2xl bg-prim-black">
      <div className="w-full flex justify-between items-center">
        <span className="flex gap-2.5 items-end">
          <p className="text-lg leading-none text-white">{title}</p>
          <p
            style={{ borderColor: color, color }}
            className="text-sm h-fit px-2 py-0.5 rounded-2xl leading-none border">
            {status}
          </p>
        </span>
        <span className="flex gap-4 items-center">
          <Link to={`/projects/${_id}/dashboard`}>
            <projectCardIcons.ExternalLink className="w-5 h-5 stroke-white bg-" />
          </Link>
          <button
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer">
            <projectCardIcons.ChevronDown
              className={`w-7 h-7 stroke-white transition-transform duration-200 ease-in-out ${
                expanded && " rotate-180"
              }`}
            />
          </button>
        </span>
      </div>

      <div
        style={{ height }}
        className="overflow-hidden transition-all duration:300 ease-in-out">
        <div ref={contentRef} className="w-full flex flex-col">
          <p className="text-md leading-6 line-clamp-2 text-ellipsis w-full mt-1 text-gray-300">
            {renderMembers(teamMembers, userId)}
          </p>

          <span className="flex justify-between items-center mt-2.5">
            <span className="flex items-start gap-1">
              <projectCardIcons.LastUpdatedIcon className="w-4 h-4 stroke-white" />
              <p className="leading-none text-white">
                {dateUtils.formatProjectDate(updatedAt)}
              </p>
            </span>
            {deadline && (
              <span className="flex gap-1.5">
                <projectCardIcons.CalendarIcon className="w-4 h-4 mt-0.5 stroke-white" />
                <p className="text-white">
                  {dateUtils.formatProjectDate(deadline)}
                </p>
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
