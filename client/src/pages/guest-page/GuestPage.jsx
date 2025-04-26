import Logo from "@/components/ui/Logo";
import authAPI from "@/services/authAPI";
import { useEffect, useState } from "react";
import GuestNav from "./components/GuestNav";
import { useNavigate } from "react-router-dom";
import GuestHeroSection from "./components/GuestHeroSection";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
    };

    checkToken();
  }, []);

  return (
    <div className="h-dvh w-full bg-gradient-to-r from-grad-l to-grad-r">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center pt-20">
          <span className="absolute top-5 left-10">
            <Logo />
          </span>
          <DotLottieReact
            className="w-1/2 h-1/2"
            src="https://lottie.host/32b41da0-a43e-49f0-b6f8-136e591cc97a/LfYxELDKLA.lottie"
            loop
            autoplay
            backgroundColor="transparent"
            speed={1.25}
          />
          <h2 className="text-3xl mt-5 mb-2 text-white">Waking up the server...</h2>
          <p className="text-lg text-center max-w-140 leading-6 text-white">Thank you for your patience. This usually takes a minute or two!</p>
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
