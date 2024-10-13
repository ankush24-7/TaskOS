import { Link } from "react-router-dom";
import { projectData } from "../../utils/Project-Data";

const ProjectRow = ({ id }) => {
  const { title, status, dateCreated, deadline, createdBy } = projectData[id];
  const suffix = title.toLowerCase().split(" ").join("-");

  return (
    <Link
      to={"/projects/dashboard/" + suffix}
      className="flex justify-between py-2 rounded-b-lg text-white hover:bg-[#111]/30">
      <div className="w-[32%] pl-3">
        <p>
          <span className="mr-3">{id + 1}</span> { title }
        </p>
      </div>
      <div className="w-[17%] pl-3">
        <p>{ status }</p>
      </div>
      <div className="w-[17%] pl-3">
        <p>{ dateCreated }</p>
      </div>
      <div className="w-[17%] pl-3">
        <p>{ deadline }</p>
      </div>
      <div className="w-[17%] pl-3">
        <p>{ createdBy }</p>
      </div>
    </Link>
  );
};

export default ProjectRow;
