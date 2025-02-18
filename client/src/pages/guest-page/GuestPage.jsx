import "@styles/animations.css";
import GuestNav from "./components/GuestNav";
import GuestHeroSection from "./components/GuestHeroSection";

const GuestPage = () => {
  return (
    <div className="h-dvh w-full relative flex flex-col flex-grow bg-gradient-to-r from-grad-l to-grad-r">
      <GuestNav />
      <GuestHeroSection />
    </div>
  );
};

export default GuestPage;
