const userService = require("../services/userService");

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(400).json({ message: "Cookie or token not found" });
  const refreshToken = cookies.jwt;

  try {
    const accessToken = await userService.refreshUser(refreshToken);
    return res.json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: error.message });
  }
};

module.exports = handleRefresh;
