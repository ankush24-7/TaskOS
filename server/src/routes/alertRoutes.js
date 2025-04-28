const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");

router.route("/")
  .get(alertController.getAlerts)
  .post(alertController.createAlert)

router.route("/:id")
  .delete(alertController.deleteAlert);

module.exports = router;
