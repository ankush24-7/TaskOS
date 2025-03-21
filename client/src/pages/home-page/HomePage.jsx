import Clock from "./components/Clock";
import dateUtils from "@/utils/dateUtils";
import axios from "@/utils/axiosInstance";
import HomeHub from './components/HomeHub';
import HomeNav from "./components/HomeNav";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState("User");
  const [greeting, setGreeting] = useState("");
  
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get("/user");
        setUser(user.data.user.name);
        setGreeting(dateUtils.getGreetings(new Date()));
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  return (
    <div className="w-full flex-grow bg-gradient-to-r from-grad-l to-grad-r">
      <HomeNav greeting={greeting} user={user} />
      <div className="w-full flex py-10 sm:justify-between sm:px-10">
        <Clock />
        <HomeHub />
      </div>
    </div>
  );
};

export default HomePage;
