import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import sectionAPI from "@/services/api/sectionAPI";
import projectAPI from "@/services/api/projectAPI";
import processAPI from "@/services/api/processAPI";
import { useEffect, useContext, useState, createContext } from "react";

/*
  [ ] Fetch processes by projectId and filter by sections 
*/

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ projectId, children }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [sections, setSections] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [notification, setNotification] = useState(null);

  const fetchProject = async () => {
    try {
      const projectResponse = await projectAPI.getProject(projectId);
      if (projectResponse.status === 200) setProject(projectResponse.data);
      else console.log("Error:", projectResponse.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateProject = async (project) => {
    try {
      const response = await projectAPI.updateProject(projectId, project);
      if (response.status === 200) await fetchProject();
      else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async () => {
    try {
      const response = await projectAPI.deleteProject(projectId);
      if (response.status === 200) {
        navigate("/projects");
      } else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSections = async () => {
    try {
      const sectionResponse = await sectionAPI.getSections(projectId);
      if (sectionResponse.status === 200) setSections(sectionResponse.data);
      else console.log("Error:", sectionResponse.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const createSection = async () => {
    const section = { name: "New Section", pos: sections.length };
    try {
      const response = await sectionAPI.createSection(section, projectId);
      if (response.status === 201) await fetchSections();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const updateSection = async (section) => {
    try {
      const response = await sectionAPI.updateSection(section, projectId);
      if (response.status === 200) await fetchSections();
      else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSectionOrder = async (sections) => {
    try {
      await Promise.all(
        sections.map((section, index) => {
          if (section.pos === index) return
          sectionAPI.updateSection({ ...section, pos: index }, projectId)
        })
      );
      // await fetchSections();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      const response = await sectionAPI.deleteSection(sectionId, projectId);
      if (response.status === 200) await fetchSections();
      else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProcesses = async () => {
    try {
      const processResponse = await processAPI.getProcesses(projectId);
      if (processResponse.status === 200) setProcesses(processResponse.data);
      else console.log("Error:", processResponse.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const createProcess = async (process) => {
    try {
      const response = await processAPI.createProcess(process, projectId);
      if (response.status === 201) await fetchProcesses();
      else console.log(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProject();
        await fetchSections();
        // const processResponse = await processAPI.getProcesses(projectId);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, [projectId]);

  useEffect(() => {
    if (notification) {
      const { type, message } = notification;
      if (type === "success") toast.success(message);
      else toast.error(message);
    }
  }, [notification]);

  const projectCRUD = { updateProject, deleteProject };
  const sectionCRUD = { createSection, updateSection, updateSectionOrder, deleteSection };
  const processCRUD = { createProcess };

  return (
    <DashboardContext.Provider
      value={{ 
        project, 
        setProject, 
        projectCRUD, 
        sections, 
        setSections, 
        sectionCRUD, 
        processes, 
        setProcesses, 
        processCRUD,
        setNotification
      }}>
      {children}
      <Toaster richColors position="bottom-right" />
    </DashboardContext.Provider>
  );
};
