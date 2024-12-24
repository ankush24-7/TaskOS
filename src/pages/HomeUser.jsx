import React, { useState, useEffect } from "react";
import HomeUserNav from "../components/navbars/HomeUserNav";
import HeroSectionUser from "../components/HeroSectionUser";

const HomeUser = () => {
  return (
    <div className="bg-gradient-to-r from-grad-b-1 to-grad-b-2 w-full flex-grow">
      <HomeUserNav />
      <HeroSectionUser />
    </div>
  );
};

export default HomeUser;
