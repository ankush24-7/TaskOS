import React from "react";
import HomeNav from "./components/HomeNav";
import HomeHeroSection from "./components/HomeHeroSection";

const HomePage = () => {
  return (
    <div className="w-full flex-grow bg-gradient-to-r from-grad-l to-grad-r">
      <HomeNav />
      <HomeHeroSection />
    </div>
  );
};

export default HomePage;
