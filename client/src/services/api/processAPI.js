import axiosInstance from "@/utils/axiosInstance";

const createProcess = async (process, sectionId, projectId) => {
  try {
    const response = await axiosInstance.post("/process", process, { params: { sectionId, projectId }});
    return { status: 201, message: response.data.message };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
};

const getProcessesByProject = async (projectId) => {
  try {
    const response = await axiosInstance.get("/process", { params: { projectId }});
    return { status: 200, processes: response.data };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
};

const getProcessesByUser = async () => {
  try {
    const response = await axiosInstance.get("/process/my-processes");
    return { status: 200, processes: response.data };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
}

const getProcessesBySection = async (sectionId, projectId) => {
  try {
    const response = await axiosInstance.get(`/process/${sectionId}`, { params: { sectionId, projectId }});
    return { status: 200, processes: response.data };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
};

const getProcessesForTimeline = async () => {
  try {
    const response = await axiosInstance.get("/process/timeline");
    return { status: 200, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data.message };
  }
}

const updateProcess = async (process) => {
  try {
    await axiosInstance.put(`/process/${process._id}`, process, {
      params: { sectionId: process.sectionId, projectId: process.projectId },
    });
    return { status: 200 };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
};

const deleteProcess = async (processId, sectionId, projectId) => {
  try {
    await axiosInstance.delete(`/process/${processId}`, {
      params: { sectionId, projectId },
    });
    return { status: 200 };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
};

const processAPI = {
  createProcess,
  getProcessesByUser,
  getProcessesByProject,
  getProcessesBySection,
  getProcessesForTimeline,
  updateProcess,
  deleteProcess
}

export default processAPI;