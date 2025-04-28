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

async function findUserByEmail(email) {
  return await User.findOne({ email }).lean().exec();
}

async function findUserByUsername(username) {
  return await User.findOne({ username }).lean().exec();
}

async function findUserByRefreshToken(refreshToken) {
  return await User.findOne({ refreshToken }).exec();
}

async function findUserByEmailOrUsername(input) {
  if (input.includes("@")) {
    return await User.findOne({ email: input }).exec();
  } else {
    return await User.findOne({ username: input }).exec();
  }
}

async function createUser(userData) {
  const newUser = new User(userData);
  return await newUser.save();
}

async function saveUser(user) {
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
