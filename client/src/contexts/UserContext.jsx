import useModal from "@/hooks/useModal";
import userAPI from "@/services/api/userAPI";
import { useEffect, useState, useContext, createContext } from "react";
import ProfileModal from "@/components/modals/profile-modal/ProfileModal";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [network, setNetwork] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { showModal, setShowModal } = useModal({ modalState: false });

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProfile(null);
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userAPI.getUser();
        const filteredUser = {
          _id: response.user._id,
          bio: response.user.bio,
          name: response.user.name,
          color: response.user.color,
          email: response.user.email,
          username: response.user.username,
          organization: response.user.organization,
          displayPicture: response.user.displayPicture,
        };
        setUser(filteredUser);
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
      value={{
        user,
        setUser,
        network,
        setNetwork,
        requests,
        setRequests,
        setShowModal,
        setSelectedProfile,
      }}>

      {children}

      {showModal &&
        (selectedProfile ? (
          <ProfileModal
            user={selectedProfile}
            viewOnly={true}
            handleModalClose={handleModalClose}
          />
        ) : (
          <ProfileModal
            user={user}
            viewOnly={false}
            setUser={setUser}
            handleModalClose={handleModalClose}
          />
        )
      )}
    </UserContext.Provider>
  );
};
