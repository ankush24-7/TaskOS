import { useMemo } from "react";
import { Link } from "react-router-dom";
import { projectData } from "@data/Project-Data";

const ProjectRow = ({ id }) => {
  const { title, projectId, team, status, dateCreated, deadline, createdBy } = projectData[id];

  const renderMembers = useMemo(() => {
    return team.join(", ");
  }, [team]);

  return (
    <tr className="mx-3 sm:mx-2 sm:rounded-lg text-white hover:bg-[#111]/30">
      <Link
        to={`/projects/${projectId}/dashboard`}
        className="flex justify-between items-center pt-3 pb-2 border-b border-gray-400 hover:border-transparent"
      >
        <div className="w-full sm:pl-3 sm:w-[32%]">
          <p> { title } </p>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis text-xs w-[95%]">
            { renderMembers }
          </p> 
        </div>
        <div className="hidden project-row">
          <p>{ status }</p>
        </div>
        <div className="hidden project-row">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">{ dateCreated }</p>
        </div>
        <div className="hidden project-row">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">{ deadline }</p>
        </div>
        <div className="hidden project-row">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">{ createdBy }</p>
        </div>
      </Link>
    </tr>
  );
};

export default ProjectRow;