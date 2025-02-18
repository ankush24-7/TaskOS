import sectionAPI from "@/services/api/sectionAPI";
import projectAPI from "@/services/api/projectAPI";
import { useEffect, useContext, useState, createContext } from "react";

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ projectId, children }) => {
  const [project, setProject] = useState({});
  const [sections, setSections] = useState([]);
  const [processes, setProcesses] = useState([]);

  const fetchProjects = async () => {
    try {
      const projectResponse = await projectAPI.getProject(projectId);
      if(projectResponse.status === 200) setProject(projectResponse.data);
      else console.log("Error:", projectResponse.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchSections = async () => {
    try {
      const sectionResponse = await sectionAPI.getSections(projectId);
      if(sectionResponse.status === 200) setSections(sectionResponse.data);
      else console.log("Error:", sectionResponse.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const addSection = async () => {
    const section = { name: "New Section", pos: sections.length };
    try {
      const response = await sectionAPI.createSection(section, projectId);
      if (response.status === 200) await fetchSections();
      else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  const updateSection = async (section) => {
    try {
      const response = await sectionAPI.updateSection(section, projectId);
      if (response.status === 200) await fetchSections();
      else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteSection = async (sectionId) => {
    try {
      const response = await sectionAPI.deleteSection(sectionId, projectId);
      if (response.status === 200) await fetchSections();
      else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        await fetchProjects();
        await fetchSections();
        // const processResponse = await processAPI.getProcesses(projectId);
      } catch (error) {
        console.log("Error:", error);
      }
    } 
    fetchData();
  }, [projectId]);

  return (
    <DashboardContext.Provider value={{ project, setProject, sections, setSections, addSection, updateSection, deleteSection }}>
      {children}
    </DashboardContext.Provider>
  );
};
