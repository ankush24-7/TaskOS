import axiosInstance from "@/utils/axiosInstance";

const createProject = async (project) => {
  try {
    const response = await axiosInstance.post("/project", project);
    return { status: 201, _id: response.data._id};
  } catch (error) {
    return { status: error.response.status, _id: error.response?.data?._id };
  }
};

const getProjectPage = async ({ page = 1, search = "", sort = "updatedat", order = "desc", archived = "false" }) => {
  try {
    const response = await axiosInstance.get(`/project?page=${page}&search=${search}&sort=${sort}&order=${order}&archived=${archived}`);
    return { status: 200, data: response.data};
  } catch (error) {
    return { status: error.response.status, data: error.response?.data?.message };
  }
};

const projectAPI = {
  createProject,
  getProjectPage,
}

export default projectAPI;