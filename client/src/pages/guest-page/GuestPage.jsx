import { useEffect } from "react";
import GuestNav from "./components/GuestNav";
import { useNavigate } from "react-router-dom";
import GuestHeroSection from "./components/GuestHeroSection";

const GuestPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <div className="h-dvh w-full relative flex flex-col flex-grow bg-gradient-to-r from-grad-l to-grad-r">
      <GuestNav />
      <GuestHeroSection />
    </div>
  );
};

export default GuestPage;
