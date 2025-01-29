import "@styles/animations.css";
import GuestNav from "./components/GuestNav";
import GuestHeroSection from "./components/GuestHeroSection";

const GuestPage = () => {
  return (
    <div className="w-full relative flex flex-col flex-grow bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <GuestNav />
      <GuestHeroSection />
    </div>
  );
};

export default GuestPage;
