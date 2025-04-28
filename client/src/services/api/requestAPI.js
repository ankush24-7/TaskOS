import axiosInstance from "@/utils/axiosInstance";

const sendConnectRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`/request/connect/sender/${userId}`);
    return { status: response.status, message: response.data.message };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const cancelConnectRequest = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/request/connect/sender/${userId}`);
    return { status: response.status, message: response.data.message };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const acceptConnectRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`/request/connect/reciever/${userId}`);
    return { status: response.status, message: response.data.message };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const dismissConnectRequest = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/request/connect/reciever/${userId}`);
    return { status: response.status, message: response.data.message };
  } catch (error) {
    return {
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

const requestAPI = {
  sendConnectRequest,
  cancelConnectRequest,
  acceptConnectRequest,
  dismissConnectRequest,
}

export default requestAPI;
