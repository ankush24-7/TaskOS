const User = require("../models/User");

const getUserInfo = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserInfo };
