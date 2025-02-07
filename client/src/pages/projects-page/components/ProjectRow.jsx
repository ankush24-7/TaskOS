import { Link } from "react-router-dom";
import { projectData } from "@data/Project-Data";

const ProjectRow = ({ id }) => {
  const { title, status, dateCreated, deadline, createdBy } = projectData[id];
  const suffix = title.toLowerCase().replaceAll(" ", "-");

  return (
    <Link
      to={"/projects/dashboard/" + suffix}
      className="flex justify-between pt-3 pb-2 mx-3 sm:mx-2 sm:rounded-md border-b border-white/40 sm:border-b-0 text-white hover:bg-[#111]/30"
    >
      <div className="w-full sm:pl-3 sm:w-[32%]">
        <p className="font-medium"> { title } </p>
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
  );
};

export default ProjectRow;