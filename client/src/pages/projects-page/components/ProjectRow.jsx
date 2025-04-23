import { Link } from "react-router-dom";
import dateUtils from "@/utils/dateUtils";
import renderMembers from "@/utils/renderMembers";

const ProjectRow = ({ title, _id, teamMembers, status, updatedAt, deadline, userId }) => {
  return (
    <Link
      to={`/projects/${_id}/dashboard`}
      className="flex rounded-xl hover:bg-prim-black/80">
      <div 
        className="w-full flex justify-between items-center border-b min-h-14 hover:border-transparent border-gray-400 
        text-white transition-border duration-300 ease-in-out">
        <span className="pl-3 w-[32%]">
          <p> {title} </p>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis text-xs w-[95%]">
            {renderMembers(teamMembers, userId)}
          </p>
        </span>
        <span className="w-[17%] block pl-3">
          <p>{status}</p>
        </span>
        <span className="w-[17%] block pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {dateUtils.formatProjectDate(updatedAt)}
          </p>
        </span>
        <span className="w-[17%] block pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {dateUtils.formatProjectDate(deadline)}
          </p>
        </span>
        <span className="w-[17%] block pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {userId.username}
          </p>
        </span>
      </div>
    </Link>
  );
};

export default ProjectRow;
