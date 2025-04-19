import authAPI from "@/services/authAPI";
import { useEffect, useState } from "react";
import GuestNav from "./components/GuestNav";
import { useNavigate } from "react-router-dom";
import GuestHeroSection from "./components/GuestHeroSection";
import SpinLoader from "@/components/loaders/SpinLoader";

const GuestPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const response = await authAPI.refresh();
      if (response) {
        navigate("/home", { replace: true });
      }
      setIsLoading(false);
    }

    checkToken();
  }, []);

  return (
    <div className="h-dvh w-full bg-gradient-to-r from-grad-l to-grad-r">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center pb-6">
          <SpinLoader width="40px" height="40px" />
        </div>
      ) : (
        <div className="w-full h-full relative flex flex-col">
          <GuestNav />
          <GuestHeroSection />
        </div>
      )}
    </div>
  );
};

export default GuestPage;
