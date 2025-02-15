import axios from "../utils/axiosInstance";

const authenticate = async (user, route) => {
  try {
    const response = await axios.post(`/auth/${route}`, user);
    return response.data.accessToken;
  } catch (error) {
    return error.response.data.message;
  }
};

const auth = { 
  authenticate,
}; 

export default auth;
