import React from "react";
import HomeNav from "./components/HomeNav";
import HomeHeroSection from "./components/HomeHeroSection";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-grad-b-1 to-grad-b-2 w-full flex-grow">
      <HomeNav />
      <HomeHeroSection />
    </div>
  );
};

export default HomePage;
