const express = require('express');
const router = express.Router();
const verifySectionId = require('../middlewares/verifySectionId');
const processController = require('../controllers/processController.js');

router.route('/')
  .post(verifySectionId, processController.createProcess)
  .get(processController.getProcesses);

router.use(verifySectionId);

router.route('/:id')
  .get(processController.getProcessesBySection)
  .put(processController.updateProcess)
  .delete(processController.deleteProcess);

module.exports = router;
