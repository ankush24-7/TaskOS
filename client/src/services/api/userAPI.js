import axiosInstance from "@/utils/axiosInstance";

const getPreference = async (key) => {
  try {
    const response = await axiosInstance.get("/user");
    const data = response.data.user.preferences[key];
    return { status: 200, data: data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response?.data?.message,
    };
  }
};

const updatePreferences = async (preferences) => {
  try {
    const response = await axiosInstance.put("/user", preferences);
    return { status: 200, message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
}

const userAPI = {
  getPreference,
  updatePreferences,
};

export default userAPI;
