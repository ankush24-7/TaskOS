import ProjectRow from "./ProjectRow";
import { projectData } from "../../utils/Project-Data";

const ProjectTable = () => {
  const renderProjectRows = () => {
    let projects = [];
    for (let i = 0; i < projectData.length; i++) {
      projects.push(<ProjectRow key={i} id={i} />);
    }
    return projects;
  };
  
  return (
    <div className="flex flex-col h-[31rem] mt-2 pb-2 rounded-lg overflow-y-scroll scrollbar-hide bg-[#111]/10">
      <div className="flex justify-between p-2 mb-1 font-medium text-lg rounded-t-lg divide-x-[1px] divide-[#fff]/0 hover:divide-white text-white bg-[#111]/60">
        <div className="w-[32%] pl-3">
          <p>
            <span className="mr-3">#</span> Title
          </p>
        </div>
        <div className="w-[17%] pl-3">
          <p>Status</p>
        </div>
        <div className="w-[17%] pl-3">
          <p>Date Created</p>
        </div>
        <div className="w-[17%] pl-3">
          <p>Deadline</p>
        </div>
        <div className="w-[17%] pl-3">
          <p>Created By</p>
        </div>
      </div>

      { renderProjectRows() }
    </div>
  );
};

export default ProjectTable;
