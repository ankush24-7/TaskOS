const authService = require("../services/authService");

const handleRegistration = async (req, res) => {
  const { name, username, email, color, password } = req.body;

  try {
    const { accessToken, refreshToken } = await authService.registerUser({
      name,
      username,
      email,
      color,
      password,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User created successfully", accessToken });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

const handleLogin = async (req, res) => {
  const { input, password } = req.body;
  
  if (!input || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const { accessToken, refreshToken } = await authService.loginUser({ input, password });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "User logged in successfully", accessToken });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(400).json({ message: "Cookie or token not found" });
  const refreshToken = cookies.jwt;

  try {
    const accessToken = await authService.refreshUser(refreshToken);
    return res.json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: error.message });
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  await authService.logoutUser(refreshToken);

  res.clearCookie("jwt", { 
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });
  
  res.sendStatus(204);
};

const check = async (req, res) => {
  return res.sendStatus(200);
};

module.exports = {
  check,
  handleLogin,
  handleLogout,
  handleRefresh,
  handleRegistration,
};
