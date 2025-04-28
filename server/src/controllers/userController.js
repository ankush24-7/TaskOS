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
  const updateData = req.body;
  const userId = req.user.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await userService.updateUser(userId, updateData);
    return res.json({ 
      user,
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
    const user = await userService.getUser(userId);
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
