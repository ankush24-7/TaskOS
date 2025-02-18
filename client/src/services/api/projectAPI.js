import axiosInstance from "@/utils/axiosInstance";

const createProject = async (project) => {
  try {
    const response = await axiosInstance.post("/project", project);
    return { status: 200, _id: response.data._id};
  } catch (error) {
    return { status: error.response.status, _id: error.response?.data?._id };
  }
};

const getProjectPage = async ({ page = 1, search = "", sort = "updatedat", order = "desc" }) => {
  try {
    const response = await axiosInstance.get(`/project?page=${page}&search=${search}&sort=${sort}&order=${order}`);
    return { status: 200, data: response.data};
  } catch (error) {
    return { status: error.response.status, data: error.response?.data?.message };
  }
};

const getProject = async (id) => {
  try {
    const response = await axiosInstance.get(`/project/${id}`);
    return { status: 200, data: response.data.project};
  } catch (error) {
    return { status: error.response.status, data: error.response?.data?.message };
  }
}

const updateProject = async (id, project) => {
  try {
    const response = await axiosInstance.put(`/project/${id}`, project);
    return response.data.message;
  } catch (error) {
    return { status: error.response.status, message: error.response?.data?.message };
  }
}

const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`/project/${id}`);
    return response.data.message;
  } catch (error) {
    return { status: error.response.status, message: error.response?.data?.message };
  }
}

const projectAPI = {
  createProject,
  getProject,
  getProjectPage,
  updateProject,
  deleteProject
}

export default projectAPI;