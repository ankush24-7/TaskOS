import useModal from "@/hooks/useModal";
import userAPI from "@/services/api/userAPI";
import { useNavigate, Outlet } from "react-router-dom";
import SpinLoader from "@/components/loaders/SpinLoader";
import { useEffect, useState, useContext, createContext } from "react";
import ProfileModal from "@/components/modals/profile-modal/ProfileModal";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [network, setNetwork] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { showModal, setShowModal, modalRef: ref } = useModal();

  const handleShowModal = (user) => {
    setShowModal(true);
    setSelectedProfile(user);
  }

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProfile(null);
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userAPI.getUser();
        if (!response.user) {
          navigate("/", { replace: true });
          return;
        }

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

        setIsLoading(false);
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
        handleShowModal,
      }}>

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-grad-l to-grad-r">
          <SpinLoader width="50px" height="50px" />
        </div>
      ) : (
        <>
          <Outlet />
    
          {showModal &&
            (selectedProfile ? (
              <ProfileModal
                ref={ref}
                user={selectedProfile}
                viewOnly={true}
                handleModalClose={handleModalClose}
              />
            ) : (
              <ProfileModal
                ref={ref}
                user={user}
                viewOnly={false}
                setUser={setUser}
                handleModalClose={handleModalClose}
              />
            )
          )}
        </>
      )}
    </UserContext.Provider>
  );
};
