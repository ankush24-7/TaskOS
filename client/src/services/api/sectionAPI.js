import axiosInstance from "@/utils/axiosInstance";

const createSection = async (section, projectId) => {
  try {
    const response = await axiosInstance.post("/section", section, { params: { projectId }});
    await axiosInstance.put(`/project/${projectId}`, { updatedAt: new Date()});
    return { status: 200, id: response.data.id, message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
};

const getSections = async (projectId) => {
  try {
    const response = await axiosInstance.get("/section", {
      params: { projectId },
    });
    return { status: 200, data: response.data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response?.data?.message,
    };
  }
};

const updateSection = async (section, projectId) => {
  try {
    const response = await axiosInstance.put(`/section/${section._id}`, section, { params: { projectId }});
    await axiosInstance.put(`/project/${projectId}`, { updatedAt: new Date()});
    return { status: 200, message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
};

const deleteSection = async (sectionId, projectId) => {
  try {
    const response = await axiosInstance.delete(`/section/${sectionId}`, { params: { projectId }});
    await axiosInstance.put(`/project/${projectId}`, { updatedAt: new Date()});
    return { status: 200, message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
};

const sectionAPI = {
  createSection,
  getSections,
  updateSection,
  deleteSection,
};

export default sectionAPI;
