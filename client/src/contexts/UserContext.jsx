import userAPI from "@/services/api/userAPI";
import { useEffect, useState, useContext, createContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [network, setNetwork] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userAPI.getUser();
        setUser(response.user);
        setNetwork(response.user.network);
        setRequests(response.user.requests);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, network, setNetwork, requests, setRequests }}>
      {children}
    </UserContext.Provider>
  );
};
