const formatTime = (time) => {
  const hourFormat24 = time.getHours();
  const hourFormat12 = time.getHours() % 12;
  const min = ("0" + time.getMinutes()).slice(-2);
  const meridiem = hourFormat24 < 12 ? "AM" : "PM";
  return `${hourFormat12 === "00" ? "12" : hourFormat12}:${min} ${meridiem}`;
};

const formatDate = (time) => {
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

const dateUtils = {
  formatTime,
  formatDate,
  getGreetings,
};

export default dateUtils;
