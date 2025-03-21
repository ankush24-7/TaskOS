const Alert = require("../models/Alert");

const getAlerts = async (req, res) => {
  const userId = req.user.userId;
  try {
    const alerts = await Alert.find({ user: userId })
      .populate("user", "name username")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    console.log(alerts);
    return res.json({ alerts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAlert = async (req, res) => {
  const { user, type, content } = req.body;
  try {
    if (type === "connect") await Alert.deleteOne({ user, type }).lean().exec();
    await Alert.create({ user, type, content });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAlert = async (req, res) => {
  const id = req.params.id;
  try {
    await Alert.deleteOne({ user: id, type: "connect" });
    return res.json({ message: "Alert deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAlerts,
  createAlert,
  deleteAlert,
};
