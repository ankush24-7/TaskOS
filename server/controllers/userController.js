const bcrypt = require("bcrypt");
const User = require("../models/User");
const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");

const searchUsers = async (req, res) => {
  const userId = req.user.userId;
  const search = req.query.search;
  const filter = {
    $or: [
      { "name.firstName": { $regex: `^${search}`, $options: "i" } },
      { "name.lastName": { $regex: `^${search}`, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
    ],
    _id: { $ne: userId },
  };

  try {
    const users = await User.find(filter)
      .select("-password -refreshToken -preferences")
      .populate("network", "name username")
      .populate("requests.sender", "name username")
      .lean()
      .exec();
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
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (user.displayPicture?.publicId) {
      await cloudinary.uploader.destroy(user.displayPicture.publicId);
    }

    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "displayPictures",
            eager: ["t_profile48", "t_profile88", "t_profile180"],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer(image.buffer);

    const displayPicture = {
      publicId: result.public_id,
    };

    user.displayPicture = displayPicture;
    await user.save();

    return res.status(200).json({
      displayPicture,
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
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (user.displayPicture?.publicId) {
      await cloudinary.uploader.destroy(user.displayPicture.publicId);
      user.displayPicture = {
        publicId: null,
        url: null,
      };
      await user.save();
    }

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
    if (lastName !== user.name.lastName) user.name.lastName = lastName;
    if (firstName !== user.name.firstName) user.name.firstName = firstName;
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
    return res.json({ message: "User updated" });
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

const sendConnectRequest = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newRequest = {
      sender: userId,
      type: "connect",
    };
    user.requests.push(newRequest);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const cancelConnectRequest = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ _id: id }).populate("requests").exec();
    if (!user) return res.status(404).json({ message: "User not found" });

    user.requests = user.requests.filter(
      (req) => req.sender.toString() !== userId
    );
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const acceptRequest = async (req, res) => {
  const senderId = req.params.id;
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ _id: userId })
      .populate("requests")
      .exec();
    const sender = await User.findOne({ _id: senderId })
      .populate("requests")
      .exec();
    if (!user || !sender)
      return res.status(404).json({ message: "User not found" });

    user.requests = user.requests.filter(
      (req) => req.sender.toString() !== senderId
    );
    user.network.push(senderId);
    sender.network.push(userId);
    await user.save();
    await sender.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const dismissRequest = async (req, res) => {
  const senderId = req.params.id;
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ _id: userId })
      .populate("requests")
      .exec();
    if (!user) return res.status(404).json({ message: "User not found" });

    user.requests = user.requests.filter(
      (req) => req.sender.toString() !== senderId
    );
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const deleteConnection = async (req, res) => {
  const senderId = req.params.id;
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ _id: userId }).exec();
    const sender = await User.findOne({ _id: senderId }).exec();
    if (!user || !sender)
      return res.status(404).json({ message: "User not found" });

    user.network = user.network.filter((id) => id.toString() !== senderId);
    sender.network = sender.network.filter((id) => id.toString() !== userId);
    await user.save();
    await sender.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  searchUsers,
  acceptRequest,
  dismissRequest,
  deleteConnection,
  sendConnectRequest,
  postDisplayPicture,
  deleteDisplayPicture,
  cancelConnectRequest,
};
