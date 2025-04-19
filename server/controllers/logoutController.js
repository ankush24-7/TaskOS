const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", { 
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });
    return res.sendStatus(204);
  }

  user.refreshToken = "";
  const response = await user.save();
  res.clearCookie("jwt", { 
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });
  
  res.status(204).json({ status: "Success", response });
};

module.exports = handleLogout;
