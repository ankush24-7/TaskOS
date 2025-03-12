import { Link } from "react-router-dom";
import dateUtils from "@/utils/dateUtils";

const ProjectRow = ({ title, _id, teamMembers, status, updatedAt, deadline, userId }) => {
  const renderMembers = () => {
    const team = teamMembers.filter((member) => member._id !== userId._id);
    return team.map((member) => member.name.firstName).join(", ");
  };

  return (
    <Link
      to={`/projects/${_id}/dashboard`}
      className="flex sm:rounded-lg hover:bg-stone-950">
      <tr className="w-full flex justify-between items-center border-b sm:min-h-14 hover:border-transparent border-gray-400 text-white">
        <td className="w-full sm:pl-3 sm:w-[32%]">
          <p> {title} </p>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis text-xs w-[95%]">
            {renderMembers()}
          </p>
        </td>
        <td className="hidden w-[17%] sm:block sm:pl-3">
          <p>{status}</p>
        </td>
        <td className="hidden w-[17%] sm:block sm:pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {dateUtils.formatProjectDate(updatedAt)}
          </p>
        </td>
        <td className="hidden w-[17%] sm:block sm:pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {dateUtils.formatProjectDate(deadline)}
          </p>
        </td>
        <td className="hidden w-[17%] sm:block sm:pl-3">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {userId.name.firstName}
          </p>
        </td>
      </tr>
    </Link>
  );
};

export default ProjectRow;
