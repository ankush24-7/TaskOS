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
    <div className="w-full flex-grow bg-gradient-to-r from-grad-l to-grad-r">
      <HomeNav greeting={greeting} />
      <div className="w-full flex py-10 sm:justify-between sm:px-10">
        <Clock />
        <HomeHub />
      </div>
    </div>
  );
};

export default HomePage;
