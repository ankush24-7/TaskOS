import { useMemo } from "react";
import { projectData } from "../utils/Project-Data";
import ProjectNav from "../components/navbars/ProjectNav";
import ProjectRow from "../components/project-table/ProjectRow";
import ProjectTable from "../components/project-table/ProjectTable";

const Projects = () => {
  let projects = [];
  useMemo(() => {
    projectData.forEach((_, i) => {
      projects.push(<ProjectRow key={i} id={i} />);
    });
  }, [projectData]);

  return (
    <div className="w-full px-10 bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <ProjectNav />
      <ProjectTable projects={projects} />
    </div>
  );
};

export default Projects;
