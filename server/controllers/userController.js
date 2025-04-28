const bcrypt = require("bcrypt");
const User = require("../models/User");
const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");
const userService = require("../services/userService");

const searchUsers = async (req, res) => {
  const userId = req.user.userId;
  const search = req.query.search;

  try {
    const users = await userService.searchUsers(userId, search);
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postDisplayPicture = async (req, res) => {
  const image = req.file;
  const userId = req.user.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (!image || !image.buffer) {
    return res.status(400).json({ message: "No image file provided" });
  }

  try {
    const publicId = await userService.postDisplayPicture(userId, image.buffer);
    return res.status(200).json({
      publicId,
      message: "Image uploaded successfully",
    });

  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteDisplayPicture = async (req, res) => {
  const userId = req.user.userId;
  if(!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await userService.deleteDisplayPicture(userId);
    return res.status(200).json({ message: "Display picture deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

const updateUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    organization,
    bio,
    preferences,
  } = req.body;
  
  const userId = req.user.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (bio !== user.bio) user.bio = bio;
    if (firstName) user.name.firstName = firstName;
    if (lastName !== user.name.lastName) user.name.lastName = lastName;
    if (organization !== user.organization) user.organization = organization;

    if (username) {
      const duplicate = await User.findOne({ username }).lean().exec();
      if (duplicate) {
        return res.status(400).json({ message: "Username already exists" });
      }
      user.username = username;
    }

    if (email) {
      const duplicate = await User.findOne({ email }).lean().exec();
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
          user.preferences[key] = {
            ...user.preferences[key],
            ...preferences[key],
          };
        }
      }
    }

    await user.save();
    return res.json({ 
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        organization: user.organization,
      },
      status: 200,
      message: "User updated" 
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ _id: userId })
      .select("-password -refreshToken")
      .populate(
        "network",
        "name username color displayPicture email bio organization"
      )
      .populate(
        "requests.sender",
        "name username color displayPicture email bio organization"
      )
      .lean()
      .exec();
    if (!user) return res.status(404).json({ message: "User does not exist" });
    return res.json({ user, message: "User found" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteConnection = async (req, res) => {
  const userId = req.user.userId;
  const connectionId = req.params.id;

  try {
    await userService.deleteConnection(userId, connectionId);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  searchUsers,
  deleteConnection,
  postDisplayPicture,
  deleteDisplayPicture,
  deleteConnection,
};
