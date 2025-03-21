import axiosInstance from "@/utils/axiosInstance";

const getAlerts = async () => {
  try {
    const response = await axiosInstance.get("/alert");
    return { status: 200, data: response.data.alerts };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response?.data?.message,
    };
  }
};

const createAlert = async ({ user, type, content = "" }) => {
  try {
    const response = await axiosInstance.post("/alert", {
      user,
      type,
      content,
    });
    return { status: 201, message: response.data.message };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
};

const deleteAlert = async (usedId) => {
  try {
    await axiosInstance.delete(`/alert/${usedId}`);
    return { status: 200, message: "Alert deleted" };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message,
    };
  }
};

const alertAPI = {
  getAlerts,
  createAlert,
  deleteAlert,
};

export default alertAPI;
