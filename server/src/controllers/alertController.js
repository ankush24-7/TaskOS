const alertService = require("../services/alertService");

const getAlerts = async (req, res) => {
  const userId = req.user.userId;
  try {
    const alerts = await alertService.getAlertsForUser(userId);
    console.log(alerts);
    return res.json({ alerts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAlert = async (req, res) => {
  const { user, type, content } = req.body;
  try {
    await alertService.createNewAlert({ user, type, content });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAlert = async (req, res) => {
  const id = req.params.id;
  try {
    await alertService.deleteUserConnectAlert(id);
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
