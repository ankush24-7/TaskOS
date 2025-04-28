const alertDAO = require("../dao/alertDAO");

async function getAlertsForUser(userId) {
  return await alertDAO.findAlertsByUser(userId);
}

async function createNewAlert({ user, type, content }) {
  if (type === "connect") {
    await alertDAO.deleteConnectAlertByUser(user);
  }
  await alertDAO.createAlert({ user, type, content });
}

async function deleteUserConnectAlert(userId) {
  await alertDAO.deleteAlertByUserAndType(userId, "connect");
}

module.exports = {
  getAlertsForUser,
  createNewAlert,
  deleteUserConnectAlert,
};
