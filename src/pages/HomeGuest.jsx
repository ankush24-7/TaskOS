import "../styles/animations.css";
import HomeGuestNav from "../components/navbars/HomeGuestNav";
import HeroSectionGuest from "../components/home-guest-comp/HeroSectionGuest";

const HomeGuest = () => {
  return (
    <div className="relative w-full h-full px-10 bg-gradient-to-r from-[#0f3460] to-[#35639a]">
      <HomeGuestNav />
      <HeroSectionGuest />
    </div>
  );
};

export default HomeGuest;
