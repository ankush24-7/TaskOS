import axiosInstance from "@/utils/axiosInstance";

const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return { status: 200, user: response.data.user };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response?.data?.message,
    };
  }
};

const updateUserInfo = async (user) => {
  try {
    const response = await axiosInstance.put("/user", user);
    return { status: 200, user: response.data.user ,message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
}

const searchUsers = async (search) => {
  try {
    const response = await axiosInstance.get(`/user/search?search=${search}`);
    return { status: 200, data: response.data.users };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response?.data?.message,
    };
  }
};

const postDisplayPicture = async (formData) => {
  try {
    const response = await axiosInstance.post("/user/dp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    return { 
      status: 200, 
      publicId: response.data.publicId, 
      message: response.data.message 
    };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
}

const deleteDisplayPicture = async () => {
  try {
    const response = await axiosInstance.delete("/user/dp");
    return { status: 200, message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
}

const removeConnection = async (userId) => {
  try {
    await axiosInstance.delete(`/user/network/${userId}`);
    return { status: 200, message: "Connection removed" };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};

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
};

const userAPI = {
  getUser,
  searchUsers,
  getPreference,
  updateUserInfo,
  removeConnection,
  updatePreferences,
  postDisplayPicture,
  deleteDisplayPicture,
};

export default userAPI;
