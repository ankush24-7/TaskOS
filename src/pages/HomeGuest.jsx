import "../styles/animations.css";
import HomeGuestNav from "../components/navbars/HomeGuestNav";
import HeroSectionGuest from "../components/home-guest-comp/HeroSectionGuest";

const HomeGuest = () => {
  return (
    <div className="w-full relative flex flex-col flex-grow bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <HomeGuestNav />
      <HeroSectionGuest />
    </div>
  );
};

export default HomeGuest;
