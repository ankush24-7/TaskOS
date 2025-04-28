const requestService = require("../services/requestService");

const sendConnectRequest = async (req, res) => {
  const targetId = req.params.id;
  const senderId = req.user.userId;

  try {
    const user = await requestService.sendConnectRequest(senderId, targetId);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const cancelConnectRequest = async (req, res) => {
  const targetId = req.params.id;
  const senderId = req.user.userId;

  try {
    await requestService.cancelConnectRequest(senderId, targetId);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const acceptRequest = async (req, res) => {
  const senderId = req.params.id;
  const userId = req.user.userId;

  try {
    await requestService.acceptRequest(userId, senderId);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

const dismissRequest = async (req, res) => {
  const senderId = req.params.id;
  const userId = req.user.userId;

  try {
    await requestService.dismissRequest(userId, senderId);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendConnectRequest,
  cancelConnectRequest,
  acceptRequest,
  dismissRequest,
};
