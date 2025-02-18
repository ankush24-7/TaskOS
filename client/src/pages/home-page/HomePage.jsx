import axios from "@/utils/axiosInstance";
import dateUtils from "@/utils/dateUtils";
import HomeNav from "./components/HomeNav";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import HomeHeroSection from "./components/HomeHeroSection";

const HomePage = () => {
  const { accessToken } = useAuth();
  const [user, setUser] = useState("User");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateTimeGreeting, setDateTimeGreeting] = useState({
    date: "",
    time: "",
    greeting: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(user.data.user.name);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setDateTimeGreeting({
      date: dateUtils.formatDayDDMonth(currentTime),
      time: dateUtils.formatTime(currentTime),
      greeting: dateUtils.getGreetings(currentTime)
    });
  }, [currentTime]);

  return (
    <div className="w-full flex-grow bg-gradient-to-r from-grad-l to-grad-r">
      <HomeNav greeting={dateTimeGreeting.greeting} user={user} />
      <HomeHeroSection
        date={dateTimeGreeting.date}
        time={dateTimeGreeting.time}
      />
    </div>
  );
};

export default HomePage;
