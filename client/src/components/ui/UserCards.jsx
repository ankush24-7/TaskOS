import { useState } from "react";
import userAPI from "@/services/api/userAPI";
import SpinLoader from "../loaders/SpinLoader";
import { Profile } from "@/assets/icons/icons";
import { useUser } from "@/contexts/UserContext";

export function FoundUserCard({ user, backgroundColor, label }) {
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
    <div
      style={{ backgroundColor }}
      className="flex justify-between items-center px-2 py-1.5 rounded-lg">
      <div className="flex items-center gap-2">
        <Profile className="w-10 h-10 stroke-1 stroke-white" />
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

export function NetworkUserCard({ user, backgroundColor }) {
  const { setNetwork } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    const response = await userAPI.removeConnection(user._id);
    if (response.status === 200) setNetwork((prev) => prev.filter((u) => u._id !== user._id));
    setIsLoading(false);
  };
  
  return (
    <div
      style={{ backgroundColor }}
      className="flex justify-between items-center px-2 py-1.5 rounded-lg">
      <div className="flex items-center gap-2">
        <Profile className="w-10 h-10 stroke-1 stroke-white" />
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
        <button
          onClick={handleRemove}
          className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 text-white border-1 border-white">
          Connected
        </button>
      )}
    </div>
  );
};
