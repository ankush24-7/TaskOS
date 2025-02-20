const formatTime = (time) => {
  const hourFormat24 = time.getHours();
  const hourFormat12 = time.getHours() % 12 === 0 ? "12" : time.getHours() % 12;
  const min = ("0" + time.getMinutes()).slice(-2);
  const meridiem = hourFormat24 < 12 ? "AM" : "PM";
  return `${hourFormat12 === "00" ? "12" : hourFormat12}:${min} ${meridiem}`;
};

const formatDayDDMonth = (time) => {
  const day = time.toLocaleDateString("default", { weekday: "long" });
  const date = time.getDate();
  const month = time.toLocaleDateString("default", { month: "long" });
  return `${day}, ${date} ${month}`;
};

const getGreetings = (time) => {
  const hour = time.getHours();
  if (hour >= 4 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const formatDDMon = (time) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const date = new Date(time);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${day} ${month}`; 
};

const formatDDMonYYYY = (time) => {
  const date = new Date(time);
  const day = date.getDate(); 
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear(); 
  return `${day} ${month} ${year}`;
};

const formatProjectDate = (time) => {
  if(!time) return "-";
  time = new Date(time);
  const now = new Date();
  if (time.toDateString() === now.toDateString()) {
    let res = formatTime(time);
    res = res.slice(0, -2) + res.slice(-2).toLowerCase();
    return res;
  } else if (time.getFullYear() === now.getFullYear()) {
    return formatDDMon(time);
  } else {
    return formatDDMonYYYY(time);
  }
};

const dateUtils = {
  formatTime,
  formatDDMon,
  getGreetings,
  formatDDMonYYYY,
  formatDayDDMonth,
  formatProjectDate,
};

export default dateUtils;
