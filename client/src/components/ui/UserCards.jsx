import { useState } from "react";
import userAPI from "@/services/api/userAPI";
import DisplayPicture from "./DisplayPicture";
import SpinLoader from "../loaders/SpinLoader";
import { useUser } from "@/contexts/UserContext";

export function FoundUserCard({ user, label }) {
  const { setNetwork } = useUser();
  const [text, setText] = useState(label);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    const response = await userAPI.sendConnectRequest(user._id);
    if (response.status === 200) setText("Requested");
    setIsLoading(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);
    const response = await userAPI.cancelConnectRequest(user._id);
    if (response.status === 200) setText("Connect");
    setIsLoading(false);
  };

  const handleRemove = async () => {
    setIsLoading(true);
    const response = await userAPI.removeConnection(user._id);
    if (response.status === 200) {
      setText("Connect");
      setNetwork((prev) => prev.filter((u) => u._id !== user._id));
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-between items-center px-2 py-1.5 rounded-lg odd:bg-prim-black/50">
      <div className="flex items-center gap-2">
        <DisplayPicture
          radius="44px"
          color={user.color}
          firstName={user.name.firstName}
          publicId={user.displayPicture.publicId}
        />
        <span className="flex flex-col">
          <p className="text-white">{user.username}</p>
          <p className="text-sm text-gray-300">
            {user.name.firstName + " " + (user.name.lastName || "")}
          </p>
        </span>
      </div>

      {isLoading ? (
        <SpinLoader width="1.5rem" height="1.5rem" />
      ) : (  
        <span className="flex gap-3">
          {text === "Connect" && (
            <button
              onClick={handleConnect}
              className="px-2 py-1 rounded-lg cursor-pointer text-white bg-prim-yellow-250 hover:bg-prim-yellow-200 hover:scale-101">
              Connect
            </button>
          )}

          {text === "Requested" && (
            <button
              onClick={handleCancel}
              className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 text-white border-1 border-white">
              Requested
            </button>
          )}

          {text === "Connected" && (
            <button
              onClick={handleRemove}
              className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 text-white border-1 border-white">
              Connected
            </button>
          )}
        </span>
      )}
    </div>
  );
}

export function NetworkUserCard({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setNetwork, setSelectedProfile, setShowModal } = useUser();

  const handleRemove = async () => {
    setIsLoading(true);
    const response = await userAPI.removeConnection(user._id);
    if (response.status === 200) setNetwork((prev) => prev.filter((u) => u._id !== user._id));
    setIsLoading(false);
  };

  const handleShowProfile = () => {
    setSelectedProfile(user);
    setShowModal(true);
  }
  
  return (
    <div className="flex justify-between items-center px-2 py-1.5 rounded-lg odd:bg-prim-black/50">
      <button 
        onClick={handleShowProfile}
        className="flex group items-center gap-2 cursor-pointer">
        <DisplayPicture
          radius="44px"
          color={user.color}
          firstName={user.name.firstName}
          publicId={user.displayPicture.publicId}
        />
        <span className="flex flex-col items-start">
          <p className="group-hover:underline text-white">{user.username}</p>
          <p className="text-sm text-gray-300">
            {user.name.firstName + " " + (user.name.lastName || "")}
          </p>
        </span>
      </button>

      {isLoading ? (
        <SpinLoader width="1.5rem" height="1.5rem" />
      ) : (
        <button
          onClick={handleRemove}
          className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 text-white border-1 border-white">
          Connected
        </button>
      )}
    </div>
  );
};
