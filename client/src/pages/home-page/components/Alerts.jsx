import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { ConnectCard, InviteCard } from "./AlertCards";
import AlertLoader from "@/components/loaders/AlertLoader";

const Alerts = () => {
  const { requests } = useUser();
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAlerts = async () => {
      try {
        if (!requests) return;
        setIsLoading(false);
        requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const alertCards = requests.map((req, i) => {
          if (req.type === "connect") return <ConnectCard key={i} req={req} />;
          else if (req.type === "invite") return <InviteCard key={i} req={req} />;
        });
        setAlerts(alertCards);
      } catch (error) {
        console.log(error);
      }
    };

    getAlerts();
  }, [requests]);

  return (
    <div className="max-h-96 pl-1 py-1 overflow-y-scroll vertical-scrollbar">
      {isLoading ? (
        <div className="flex flex-col gap-1">
          <AlertLoader />
          <AlertLoader />
          <AlertLoader />
        </div>
      ) : (
        <div className="flex flex-col pr-1 gap-1">
          {alerts.length ? (
            alerts
          ) : (
            <p className="text-xl text-center pt-52 sm:pt-36 text-gray-400">
              No new alerts
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Alerts;
