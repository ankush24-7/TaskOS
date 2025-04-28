const userDAO = require('../dao/userDAO');

const sendConnectRequest = async (userId, targetId) => {
  const user = await userDAO.findUserById(targetId);
  if (!user) throw new Error('User not found');

  const newRequest = { sender: userId, type: 'connect' };
  user.requests.push(newRequest);
  await user.save();
};

const cancelConnectRequest = async (userId, targetId) => {
  const user = await userDAO.findUserByIdWithRequests(targetId);
  if (!user) throw new Error('User not found');

  user.requests = user.requests.filter(
    (req) => req.sender.toString() !== userId
  );
  await user.save();
};

const acceptRequest = async (userId, senderId) => {
  const user = await userDAO.findUserByIdWithRequests(userId);
  const sender = await userDAO.findUserByIdWithRequests(senderId);

  if (!user || !sender) throw new Error('User not found');

  user.requests = user.requests.filter(
    (req) => req.sender.toString() !== senderId
  );
  user.network.push(senderId);
  sender.network.push(userId);

  await user.save();
  await sender.save();
};

const dismissRequest = async (userId, senderId) => {
  const user = await userDAO.findUserByIdWithRequests(userId);
  if (!user) throw new Error('User not found');

  user.requests = user.requests.filter(
    (req) => req.sender.toString() !== senderId
  );
  await user.save();
};

module.exports = {
  sendConnectRequest,
  cancelConnectRequest,
  acceptRequest,
  dismissRequest,
};
