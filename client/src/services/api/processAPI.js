import axiosInstance from "@/utils/axiosInstance";

const createProcess = async (process, projectId) => {
  try {
    const response = await axiosInstance.post("/process", process, {
      params: { projectId },
    });
    await axiosInstance.put(`/project/${projectId}`, { updatedAt: new Date() });
    return { status: 201, message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
};

const processAPI = {
  createProcess,
};

export default processAPI;
