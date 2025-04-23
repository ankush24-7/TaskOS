import Clock from "./components/Clock";
import dateUtils from "@/utils/dateUtils";
import HomeHub from './components/HomeHub';
import HomeNav from "./components/HomeNav";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [greeting, setGreeting] = useState("");
  
  useEffect(() => {
    const getGreetings = async () => {
      try {
        setGreeting(dateUtils.getGreetings(new Date()));
      } catch (err) {
        console.log(err);
      }
    };

    getGreetings();
  }, []);

  return (
    <div className="w-full flex-grow px-2 md:px-4 lg:px-10">
      <HomeNav greeting={greeting} />
      <div className="w-full h-full flex-grow flex mt-2 flex-col pb-18 gap-6 lg:gap-0 lg:flex-row lg:justify-between lg:p-10">
        <Clock />
        <HomeHub />
      </div>
    </div>
  );
};

export default HomePage;
