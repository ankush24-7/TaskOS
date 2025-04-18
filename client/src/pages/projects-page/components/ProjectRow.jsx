import { Link } from "react-router-dom";
import dateUtils from "@/utils/dateUtils";
import renderMembers from "@/utils/renderMembers";

const ProjectRow = ({ title, _id, teamMembers, status, updatedAt, deadline, userId }) => {
  return (
    <Link
      to={`/projects/${_id}/dashboard`}
      className="flex sm:rounded-lg hover:bg-prim-black/50">
      <div className="w-full flex justify-between items-center border-b sm:min-h-14 hover:border-transparent border-gray-400 text-white">
        <span className="w-full sm:pl-3 sm:w-[32%]">
          <p> {title} </p>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis text-xs w-[95%]">
            {renderMembers(teamMembers, userId)}
          </p>
        </span>
        <span className="hidden w-[17%] sm:block sm:pl-3">
          <p>{status}</p>
        </span>
        <span className="hidden w-[17%] sm:block sm:pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {dateUtils.formatProjectDate(updatedAt)}
          </p>
        </span>
        <span className="hidden w-[17%] sm:block sm:pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {dateUtils.formatProjectDate(deadline)}
          </p>
        </span>
        <span className="hidden w-[17%] sm:block sm:pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {userId.username}
          </p>
        </span>
      </div>
    </Link>
  );
};

export default ProjectRow;
