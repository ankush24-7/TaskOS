const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/multer");

router.route("/dp")
  .post(upload.single("displayPicture"), userController.postDisplayPicture)
  .delete(userController.deleteDisplayPicture);

router.route("/")
  .get(userController.getUser)
  .put(userController.updateUser);

router.route("/search")
  .get(userController.searchUsers);

router.route("/reciever/connect-request/:id")
  .post(userController.acceptRequest)
  .delete(userController.dismissRequest);

router.route("/sender/connect-request/:id")
  .post(userController.sendConnectRequest)
  .delete(userController.cancelConnectRequest);

router.route("/network/:id")
  .delete(userController.deleteConnection);

module.exports = router;
