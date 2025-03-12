import useModal from "@/hooks/useModal";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useContext, useState, createContext } from "react";
import ProcessModal from "@/components/modals/process-modal/ProcessModal";

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ projectId, children }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [sections, setSections] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [processPosition, setProcessPosition] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const { showModal: showProcessModal, setShowModal: setShowProcessModal } = useModal({ modalState: false });

  const fetchProject = async () => {
    try {
      const response = await axiosInstance.get(`/project/${projectId}`);
      if (response.status === 200) setProject(response.data.project);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateProject = async (project) => {
    try {
      const response = await axiosInstance.put(`/project/${projectId}`, project);
      if (response.status === 200) {
        await fetchProject();
        return response.data.id;
      }
      else throw new Error(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProjectTimestamp = async () => {
    try {
      await axiosInstance.put(`/project/${projectId}`, { updatedAt: new Date() });
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProject = async () => {
    try {
      const response = await axiosInstance.delete(`/project/${projectId}`)
      if (response.status === 200) navigate("/projects");
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
      const response = await axiosInstance.get("/process", { params: { projectId }});
      if (response.status === 200) setProcesses(response.data);
      else return null;
    } catch (error) {
      console.log(error);
    }
  }

  const fetchProcessesBySection = async (sectionId) => {
    try {
      const processes = await axiosInstance.get(`/process/${sectionId}`, { params: { sectionId, projectId }});
      if (processes.status === 200) return processes.data;
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
            updateProcess({ ...process, pos: process.pos + 1 }, sectionId);
          }
        }))
      }

      process.pos = processPosition;
    
      const response = await axiosInstance.post("/process", process, { params: { sectionId, projectId }});
      if (response.status === 201) {
        await fetchSections();
        await fetchProcesses();
        await updateProjectTimestamp();
        setToastMessage({ message: response.data.message, type: "success" });
      }
      else throw new Error(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const updateProcess = async (process, sectionId, reRender = true) => {
    try {
      const response = await axiosInstance.put(`/process/${process._id}`, process, {
        params: { sectionId, projectId },
      });
      if (response.status === 200) {
        if (reRender) await fetchProcesses();
        await updateProjectTimestamp();
      }
      else setToastMessage({ message: "Could not update process", type: "error" });
    } catch (error) {
      console.log(error);
    }
  }

  const updateProcessOrder = async (processes) => {
    try {
      Promise.all(processes.map((process, index) => {
        updateProcess({ ...process, pos: index }, process.sectionId, false);
      }))
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProcess = async (processId, sectionId) => {
    try {
      const response = await axiosInstance.delete(`/process/${processId}`, {
        params: { sectionId, projectId },
      });
      if (response.status === 200) {
        await fetchSections();
        await fetchProcesses();
        await updateProjectTimestamp();
        setToastMessage({ message: response.data.message, type: "success" });
        return response;
      }
      else throw new Error(response.data.message);
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

  useEffect(() => {
    if (toastMessage) {
      const { type, message } = toastMessage;
      if (type === "success") toast.success(message);
      else toast.error(message);
    }
  }, [toastMessage]);

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
      <Toaster richColors position="bottom-right" />
    </DashboardContext.Provider>
  );
};
