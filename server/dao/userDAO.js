const User = require("../models/User");

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
  findUserByEmail,
  findUserByUsername,
  findUserByRefreshToken, 
  findUserByEmailOrUsername,
  createUser,
  saveUser,
};
