const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .get(userController.getUserInfo)
    .put(userController.updateUser);

module.exports = router;
