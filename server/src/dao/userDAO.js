const User = require("../models/User");

const findUserById = async (userId) => {
  return User.findById(userId).exec();
};

const findUserByIdWithRequests = async (userId) => {
  return User.findById(userId)
    .populate('requests')
    .exec();
};

const findUserProfileById = async (userId) => {
  return User.findById(userId)
    .select('-password -refreshToken')
    .populate('network', 'name username color displayPicture email bio organization')
    .populate('requests.sender', 'name username color displayPicture email bio organization')
    .lean()
    .exec();
};

const searchUsers = async (search, excludeUserId) => {
  const filter = {
    $or: [
      { "name.firstName": { $regex: `^${search}`, $options: "i" } },
      { "name.lastName": { $regex: `^${search}`, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
    ],
    _id: { $ne: excludeUserId },
  };

  return User.find(filter)
    .select("-password -refreshToken -preferences")
    .populate("network", "name username")
    .populate("requests.sender", "name username")
    .lean()
    .exec();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).lean().exec();
}

const findUserByUsername = async (username) => {
  return await User.findOne({ username }).lean().exec();
}

const findUserByRefreshToken = async (refreshToken) => {
  return await User.findOne({ refreshToken }).exec();
}

const findUserByEmailOrUsername = async (input) => {
  if (input.includes("@")) {
    return await User.findOne({ email: input }).exec();
  } else {
    return await User.findOne({ username: input }).exec();
  }
}

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
}

const saveUser = async (user) => {
  return await user.save();
}

module.exports = {
  findUserById,
  findUserProfileById,
  findUserByIdWithRequests,
  findUserByEmail,
  findUserByUsername,
  findUserByRefreshToken, 
  findUserByEmailOrUsername,
  createUser,
  saveUser,
  searchUsers,
};
