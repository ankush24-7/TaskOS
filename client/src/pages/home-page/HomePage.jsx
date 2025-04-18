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
    <div className="w-full flex-grow">
      <HomeNav greeting={greeting} />
      <div className="w-full flex-grow h-full flex flex-col p-3 pb-20 gap-4 sm:flex-row sm:justify-between sm:p-10 sm:gap-0">
        <Clock />
        <HomeHub />
      </div>
    </div>
  );
};

export default HomePage;
