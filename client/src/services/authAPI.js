import { base } from "@/utils/axiosInstance";
import axiosInstance from "@/utils/axiosInstance";

const authenticate = async (user, route) => {
  try {
    const response = await axiosInstance.post(`/auth/${route}`, user);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.status;
  } catch (error) {
    return error.response.data.message;
  }
};

const logout = async () => {
  try {
    console.log("Logging out...");
    await axiosInstance.post("/logout");
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error(error);
  }
}

const refresh = async () => {
  try {
    const response = await base.post("/refresh");
    return response.data.accessToken;
  } catch (error) {
    console.error(error);
  }
}

const check = async () => {
  try {
    const response = await axiosInstance.get("/auth/check");
    return response.status;
  } catch (error) {
    console.error(error);
  }
}

const authAPI = { 
  check,
  logout, 
  refresh,
  authenticate,
}; 

export default authAPI;
