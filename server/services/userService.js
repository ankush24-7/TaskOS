const bcrypt = require('bcrypt');
const userDAO = require('../dao/userDAO');
const streamifier = require('streamifier');
const cloudinary = require('../utils/cloudinary');

const searchUsers = async (userId, search) => {
  return userDAO.searchUsers(search, userId);
};

const getUser = async (userId) => {
  return userDAO.findUserProfileById(userId);
};

const updateUser = async (userId, data) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    organization,
    bio,
    preferences,
  } = data;

  const user = await userDAO.findUserById(userId);
  if (!user) throw new Error('User does not exist');

  if (bio !== user.bio) user.bio = bio;
  if (firstName) user.name.firstName = firstName;
  if (lastName !== user.name.lastName) user.name.lastName = lastName;
  if (organization !== user.organization) user.organization = organization;

  if (username) {
    const duplicate = await userDAO.findUserByUsername(username);
    if (duplicate) throw new Error('Username already exists');
    user.username = username;
  }

  if (email) {
    const duplicate = await userDAO.findUserByEmail(email);
    if (duplicate) throw new Error('Email already exists');
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
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    organization: user.organization,
  };
};

const postDisplayPicture = async (userId, imageBuffer) => {
  const user = await userDAO.findUserById(userId);
  if (!user) throw new Error('User does not exist');

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

  const result = await uploadFromBuffer(imageBuffer);
  user.displayPicture = { publicId: result.public_id };
  await user.save();
  return result.public_id;
};

const deleteDisplayPicture = async (userId) => {
  const user = await userDAO.findUserById(userId);
  if (!user) throw new Error('User does not exist');

  if (user.displayPicture?.publicId) {
    await cloudinary.uploader.destroy(user.displayPicture.publicId);
    user.displayPicture = { publicId: null, url: null };
    await user.save();
  }
};

const deleteConnection = async (userId, connectionId) => {
  const user = await userDAO.findUserById(userId);
  const target = await userDAO.findUserById(connectionId);

  if (!user || !target) throw new Error('User not found');

  user.network = user.network.filter((id) => id.toString() !== connectionId);
  target.network = target.network.filter((id) => id.toString() !== userId);

  await user.save();
  await target.save();
};

module.exports = {
  searchUsers,
  getUser,
  updateUser,
  postDisplayPicture,
  deleteDisplayPicture,
  deleteConnection,
};
