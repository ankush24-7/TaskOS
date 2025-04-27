const userService = require("../services/userService");

const handleRegistration = async (req, res) => {
  const { name, username, email, color, password } = req.body;

  try {
    const { accessToken, refreshToken } = await userService.registerUser({
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
    const { accessToken, refreshToken } = await userService.loginUser({ input, password });

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

const check = async (req, res) => {
  return res.sendStatus(200);
};

module.exports = {
  check,
  handleLogin,
  handleRegistration,
};
