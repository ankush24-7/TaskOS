import ProjectTable from "../components/project-table/ProjectTable";
import ProjectNav from "../components/navbars/ProjectNav";

const Projects = () => {
  return (
    <div className="w-full px-10 bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <ProjectNav />
      <ProjectTable />
    </div>
  );
};

export default Projects;
