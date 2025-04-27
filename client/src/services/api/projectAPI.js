import axiosInstance from "@/utils/axiosInstance";

const createProject = async (project) => {
  try {
    const response = await axiosInstance.post("/project", project);
    return { status: 201, _id: response.data._id};
  } catch (error) {
    return { status: error.response.status, _id: error.response?.data?._id };
  }
};

const getProjectPage = async ({ limit, page = 1, search = "", sort = "updatedat", order = "desc", archived = "false" }) => {
  try {
    const response = await axiosInstance.get(`/project?page=${page}&limit=${limit}&search=${search}&sort=${sort}&order=${order}&archived=${archived}`);
    return { status: 200, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response?.data?.message };
  }
};

const getProject = async (projectId) => {
  try {
    const response = await axiosInstance.get(`/project/${projectId}`);
    return { status: 200, project: response.data.project };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
};

const updateProject = async (projectId, project) => {
  try {
    const response = await axiosInstance.put(`/project/${projectId}`, project);
    return { status: 200, id: response.data.id };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
};

const updateTimestamp = async (projectId) => {
  try {
    await axiosInstance.put(`/project/${projectId}`, { updatedAt: new Date() });
  } catch (error) {
    console.error(error);
  }
};

const deleteProject = async (projectId) => {
  try {
    const response = await axiosInstance.delete(`/project/${projectId}`);
    return { status: response.status };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
}

const projectAPI = {
  createProject,
  getProjectPage,
  getProject,
  updateProject,
  updateTimestamp,
  deleteProject,
}

export default projectAPI;