import React, { useState, useEffect } from 'react'

const Landing = () => {
  const user = "Ankush";
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 800);

    return () => clearInterval(intervalId);
  });

  const formatTime = (time) => {
    const hourFormat24 = time.getHours();
    const hourFormat12 = ('0' + (time.getHours() % 12)).slice(-2);
    const min = ('0' + time.getMinutes()).slice(-2);
    const meridiem = hourFormat24 < 12 ? "AM": "PM";
    return `${hourFormat12 === '00' ? '12': hourFormat12}:${min} ${meridiem}`;
  }
  
  const formatDate = (time) => {
    const day = time.toLocaleDateString('default', { weekday: 'long' });
    const date = time.getDate();
    const month = time.toLocaleDateString('default', { month: 'long' });
    return `${day}, ${date} ${month} ${time.getFullYear()}`;
  }

  const getGreetings = (time) => {
    const hour = time.getHours();
    if (hour >= 4 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  }
  
  return (
    <div className='bg-gradient-to-r from-[#0f3460] to-[#35639a] w-full flex justify-between'>
      <div className='mt-28 ml-10'>
        <div className='flex flex-col items-start '>
          <p className='text-white text-3xl leading-none tracking-tight' >{`${getGreetings(currentTime)}, ${user}!`}</p>
          <p className='text-white text-[90px] font-semibold tracking-wide leading-none'>{ formatTime(currentTime) }</p>
          <p className='text-white text-3xl'>{ formatDate(currentTime) }</p>
        </div>

        <div className='w-[400px] mt-20'>
          <p className='text-white text-lg'>"Always be a first-rate version of yourself, instead of a second-rate version of somebody else."</p>
          <p className="text-white text-lg mt-2">Judy Garland</p>
        </div>
      </div>

      <div className='flex flex-col w-80 bg-black opacity-10 mt-24 mb-10 mr-20 rounded-xl'>

      </div>
    </div>
  )
}

export default Landing