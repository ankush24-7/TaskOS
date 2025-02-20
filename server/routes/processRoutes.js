const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController.js');

router.route('/')
  .post(processController.createProcess)
  .get(processController.getProcesses);

module.exports = router;
