import ProjectTable from "../components/project-table/ProjectTable";
import ProjectNav from "../components/navbars/ProjectNav";

const Projects = () => {
  return (
    <div className="w-full px-10 bg-gradient-to-r from-[#0f3460] to-[#35639a]">
      <ProjectNav />
      <ProjectTable />
    </div>
  );
};

export default Projects;
