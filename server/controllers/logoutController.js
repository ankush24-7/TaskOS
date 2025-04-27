const userService = require("../services/userService");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  await userService.logoutUser(refreshToken);

  res.clearCookie("jwt", { 
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });
  
  res.sendStatus(204);
};

module.exports = handleLogout;
