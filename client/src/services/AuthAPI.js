import axiosInstance from "@/utils/axiosInstance";

const authenticate = async (user, route) => {
  try {
    const response = await axiosInstance.post(`/auth/${route}`, user);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.status;
  } catch (error) {
    return error.message;
  }
};

const logout = async () => {
  try {
    await axiosInstance.post("/logout");
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error(error);
  }
}

const refresh = async () => {
  try {
    const response = await axiosInstance.post("/refresh");
    return response.data.accessToken;
  } catch (error) {
    console.error(error);
  }
}

const authAPI = { 
  logout, 
  refresh,
  authenticate,
}; 

export default authAPI;
