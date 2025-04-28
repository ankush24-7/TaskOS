const Alert = require("../models/Alert");

async function findAlertsByUser(userId) {
  return await Alert.find({ user: userId })
    .populate("user", "name username")
    .sort({ createdAt: -1 })
    .lean()
    .exec();
}

async function deleteConnectAlertByUser(userId) {
  return await Alert.deleteOne({ user: userId, type: "connect" }).lean().exec();
}

async function createAlert(alertData) {
  return await Alert.create(alertData);
}

async function deleteAlertByUserAndType(userId, type) {
  return await Alert.deleteOne({ user: userId, type });
}

module.exports = {
  findAlertsByUser,
  deleteConnectAlertByUser,
  createAlert,
  deleteAlertByUserAndType,
};
