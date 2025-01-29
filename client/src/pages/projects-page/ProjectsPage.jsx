import { useMemo } from "react";
import { projectData } from "@utils/Project-Data";
import ProjectNav from "./components/ProjectNav";
import ProjectRow from "./components/ProjectRow";
import ProjectTable from "./components/ProjectTable";

const ProjectsPage = () => {
  let projects = [];
  useMemo(() => {
    projectData.forEach((_, i) => {
      projects.push(<ProjectRow key={i} id={i} />);
    });
  }, [projectData]);

  return (
    <div className="w-full flex-grow bg-gradient-to-r from-grad-b-1 to-grad-b-2 sm:px-10">
      <ProjectNav />
      <ProjectTable projects={projects} />
    </div>
  );
};

export default ProjectsPage;
