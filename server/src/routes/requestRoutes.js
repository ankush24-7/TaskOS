const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.route("/connect/reciever/:id")
  .post(requestController.acceptRequest)
  .delete(requestController.dismissRequest);

router.route("/connect/sender/:id")
  .post(requestController.sendConnectRequest)
  .delete(requestController.cancelConnectRequest);

module.exports = router;
