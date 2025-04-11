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
      displayPicture: response.data.displayPicture, 
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

const sendConnectRequest = async (userId) => {
  try {
    await axiosInstance.post(`/user/sender/connect-request/${userId}`);
    return { status: 200, message: "Request sent" };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};

const cancelConnectRequest = async (userId) => {
  try {
    await axiosInstance.delete(`/user/sender/connect-request/${userId}`);
    return { status: 200, message: "Request cancelled" };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};

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

const acceptRequest = async (senderId) => {
  try {
    await axiosInstance.post(`/user/reciever/connect-request/${senderId}`);
    return { status: 200, message: "Request accepted" };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const dismissRequest = async (senderId) => {
  try {
    await axiosInstance.delete(`/user/reciever/connect-request/${senderId}`);
    return { status: 200, message: "Request dismissed" };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

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
  postDisplayPicture,
  deleteDisplayPicture,
  sendConnectRequest,
  cancelConnectRequest,
  acceptRequest,
  dismissRequest,
  getPreference,
  removeConnection,
  updatePreferences,
};

export default userAPI;
