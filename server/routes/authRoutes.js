const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/check", authController.check);
router.post("/login", authController.handleLogin);
router.post("/register", authController.handleRegistration);

module.exports = router;
