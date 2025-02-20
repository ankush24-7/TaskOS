const bcrypt = require("bcrypt");
const User = require("../models/User");

const getUserInfo = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    return res.json({ user, message: "User found" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password, preferences } = req.body;
  const userId = req.user.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (name) user.name = name;
    if (email) {
      const duplicate = await User.findOne({ email }).exec();
      if (duplicate) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (preferences) {
      for (const key in preferences) {
        if (preferences.hasOwnProperty(key)) {
          user.preferences[key] = { ...user.preferences[key], ...preferences[key] };
        }
      }
    }

    await user.save();
    return res.json({ message: "Information updated" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { 
  getUserInfo,
  updateUser
};
