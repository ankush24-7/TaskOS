import React, { useState, useEffect } from "react";
import HomeUserNav from "../components/navbars/HomeUserNav";
import HeroSectionUser from "../components/HeroSectionUser";

const HomeUser = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f3460] to-[#35639a] w-full">
      <HomeUserNav />
      <HeroSectionUser />
    </div>
  );
};

export default HomeUser;
