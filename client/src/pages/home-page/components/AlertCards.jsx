import userAPI from "@/services/api/userAPI";
import { useUser } from "@/contexts/UserContext";
import DisplayPicture from "@/components/ui/DisplayPicture";

export function ConnectCard({ req }) {
  const { setRequests, setNetwork } = useUser();

  const updateRequests = () => setRequests((prev) => prev.filter((r) => r._id !== req._id));

  const handleConnect = async () => {
    await userAPI.acceptRequest(req.sender._id);
    setNetwork((prev) => [...prev, req.sender]);
    updateRequests();
  };

  const handleDismiss = async () => {
    await userAPI.dismissRequest(req.sender._id);
    updateRequests();
  };

  return (
    <div className="flex items-center justify-between px-2 py-3 rounded-lg bg-prim-black/50">
      <span className="flex items-center gap-2">
        <DisplayPicture 
          radius="44px"
          color={req.sender.color}
          firstName={req.sender.name.firstName}
          publicId={req.sender.displayPicture.publicId}
        />
        <p className="leading-5 text-white">
          <span className="font-medium">{req.sender.username}</span> wants to connect with you
        </p>
      </span>

      <span className="flex gap-3">
        <button
          onClick={handleConnect}
          className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 text-white bg-prim-yellow-250 hover:bg-prim-yellow-200">
          Connect
        </button>
        <button
          onClick={handleDismiss}
          className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 border border-white text-white hover:bg-red-600 hover:border-red-600">
          Dismiss
        </button>
      </span>
    </div>
  );
};

export function InviteCard({ req }) {}
