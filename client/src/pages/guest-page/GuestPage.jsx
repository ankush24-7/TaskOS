import { useEffect } from "react";
import authAPI from "@/services/authAPI";
import GuestNav from "./components/GuestNav";
import { useNavigate } from "react-router-dom";
import GuestHeroSection from "./components/GuestHeroSection";

const GuestPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const response = await authAPI.refresh();
      if (response) {
        navigate("/home", { replace: true });
      }
    }

    checkToken();
  }, []);

  return (
    <div className="h-dvh w-full relative flex flex-col flex-grow bg-gradient-to-r from-grad-l to-grad-r">
      <GuestNav />
      <GuestHeroSection />
    </div>
  );
};

export default GuestPage;
