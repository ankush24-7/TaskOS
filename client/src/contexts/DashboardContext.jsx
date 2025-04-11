import useModal from "@/hooks/useModal";
import { useToast } from "./ToastContext";
import axiosInstance from "@/utils/axiosInstance";
import projectAPI from "@/services/api/projectAPI";
import processAPI from "@/services/api/processAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState, createContext } from "react";
import ProcessModal from "@/components/modals/process-modal/ProcessModal";

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setToastMessage } = useToast();
  const projectId = useParams().projectId;
  const [project, setProject] = useState({});
  const [sections, setSections] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [processPosition, setProcessPosition] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const { showModal: showProcessModal, setShowModal: setShowProcessModal } = useModal({ modalState: false });

  const fetchProject = async () => {
    try {
      const { status, project } = await projectAPI.getProject(projectId);
      if (status === 200) setProject(project);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateProject = async (project) => {
    try {
      const { status, id } = await projectAPI.updateProject(projectId, project);
      if (status === 200) {
        await fetchProject();
        return id;
      }
      else throw new Error(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProjectTimestamp = async () => {
    try {
      await projectAPI.updateTimestamp(projectId);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProject = async () => {
    try {
      const { status } = await projectAPI.deleteProject(projectId);
      if (status === 200) navigate("/projects");
      else throw new Error(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axiosInstance.get("/section", {
        params: { projectId },
      });
      if (response.status === 200) setSections(response.data);
      else throw new Error(response.data.message);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const createSection = async () => {
    const section = { name: "New Section", pos: sections.length };
    try {
      const response = await axiosInstance.post("/section", section, { params: { projectId }});
      updateProjectTimestamp();
      if (response.status === 201) {
        await fetchSections();
        setToastMessage({ message: response.data.message, type: "success" });
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const updateSection = async (section) => {
    try {
      const response = await axiosInstance.put(`/section/${section._id}`, section, { params: { projectId }});
      updateProjectTimestamp();
      if (response.status === 200) await fetchSections();
      else throw new Error(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSectionOrder = async (sections) => {
    try {
      await Promise.all(
        sections.map((section, index) => {
          if (section.pos === index) return
          updateSection({ ...section, pos: index }, projectId)
        })
      );
      // await fetchSections();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      const response = await axiosInstance.delete(`/section/${sectionId}`, { params: { projectId }});
      updateProjectTimestamp();
      if (response.status === 200) await fetchSections();
      else throw new Error(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProcesses = async () => {
    try {
      const { status, processes } = await processAPI.getProcessesByProject(projectId);
      if (status === 200) setProcesses(processes);
      else return null;
    } catch (error) {
      console.log(error);
    }
  }

  const fetchProcessesBySection = async (sectionId) => {
    try {
      const { status, processes } = await processAPI.getProcessesBySection(sectionId, projectId);
      if (status === 200) return processes;
      else return null;
    } catch (error) {
      console.log(error);
    }
  }

  const createProcess = async (process, sectionId, len) => {
    try {
      if (processPosition !== len) {
        const processes = await fetchProcessesBySection(sectionId);
        Promise.all(processes.map((process) => {
          if (process.pos >= processPosition) {
            updateProcess({ ...process, pos: process.pos + 1 });
          }
        }))
      }

      process.pos = processPosition;
    
      const { status, message } = await processAPI.createProcess(process, sectionId, projectId);
      if (status === 201) {
        await fetchSections();
        await fetchProcesses();
        await updateProjectTimestamp();
        setToastMessage({ message, type: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateProcess = async (process, reRender = true) => {
    try {
      const { status } = await processAPI.updateProcess(process);
      if (status === 200) {
        if (reRender) await fetchProcesses();
        await updateProjectTimestamp();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateProcessOrder = async (processes) => {
    try {
      Promise.all(processes.map((process, index) => {
        updateProcess({ ...process, pos: index }, process.sectionId, false);
      }));
      
      Promise.all(sections.map((section) => {
        const sectionProcesses = processes.filter((process) => process.sectionId === section._id);
        updateSection({ ...section, processes: sectionProcesses.map(process => process._id) });
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProcess = async (processId, sectionId) => {
    try {
      const { status } = await processAPI.deleteProcess(processId, sectionId, projectId);
      if (status === 200) {
        await fetchSections();
        await fetchProcesses();
        await updateProjectTimestamp();
        setToastMessage({ message: "Process deleted successfully", type: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProject();
        await fetchSections();
        await fetchProcesses();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [projectId]);

  const projectCRUD = { updateProject, deleteProject };
  const sectionCRUD = { createSection, updateSection, updateSectionOrder, deleteSection };
  const processCRUD = { createProcess, updateProcess, updateProcessOrder, deleteProcess };

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
        setToastMessage,
        showProcessModal,
        setShowProcessModal,
        setProcessPosition,
        setSelectedProcess,
        setSelectedSection,
      }}>
      {children}
      { showProcessModal && (
        <ProcessModal 
          selectedProcess={selectedProcess}
          setShowProcessModal={setShowProcessModal} 
          section={selectedSection}
        />
      )}
    </DashboardContext.Provider>
  );
};
