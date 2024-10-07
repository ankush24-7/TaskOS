import React, { useState, useEffect } from 'react'

const Landing = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 800);

    return () => clearInterval(intervalId);
  });

  const hourFormat24 = currentTime.getHours();
  const hourFormat12 = ('0' + (currentTime.getHours() % 12)).slice(-2);
  const min = ('0' + currentTime.getMinutes()).slice(-2);
  const meridiem = hourFormat24 < 12 ? "AM": "PM";
  const time = `${hourFormat12}:${min} ${meridiem}`;

  const day = currentTime.toLocaleDateString('default', { weekday: 'long' });
  const date = currentTime.getDate();
  const month = currentTime.toLocaleDateString('default', { month: 'long' });
  const dmy = `${day}, ${date} ${month} ${currentTime.getFullYear()}`
  
  const user = "Ankush";
  let greetings;
  switch(hourFormat24){
    case hourFormat24 > 4 && hourFormat24 < 12:
      greetings = "Good Morning";
      break;
    case hourFormat24 > 11 && hourFormat24 < 16:
      greetings = "Good Afternoon";
      break;
    default:
      greetings = "Good Evening";
      break;
  }

  return (
    <div className='bg-gradient-to-r from-[#0f3460] to-[#35639a] w-full flex justify-between'>
      <div className='mt-32 ml-10'>
        <div className='flex flex-col items-start '>
          <p className='text-white text-3xl leading-none tracking-tight' >{`${greetings}, ${user}!`}</p>
          <p className='text-white text-[90px] font-semibold tracking-wide leading-none'>{ time }</p>
          <p className='text-white text-3xl'>{ dmy }</p>
        </div>

        <div className='w-[400px] mt-20'>
          <p className='text-white text-lg'>"Always be a first-rate version of yourself, instead of a second-rate version of somebody else."</p>
          <p className="text-white text-lg mt-2">Judy Garland</p>
        </div>
      </div>

      <div className='flex flex-col w-80 bg-black opacity-10 mt-24 mb-10 mr-10 rounded-xl'>

      </div>
    </div>
  )
}

export default Landing