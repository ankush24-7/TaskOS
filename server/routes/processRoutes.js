const express = require('express');
const router = express.Router();
const verifyProjectId = require('../middlewares/verifyProjectId');
const verifySectionId = require('../middlewares/verifySectionId');
const processController = require('../controllers/processController.js');

router.route('/timeline')
  .get(processController.getProcessesForTimeline);

router.route('/my-processes')
  .get(processController.getProcessesByUser);

router.use(verifyProjectId);

router.route('/')
  .get(processController.getProcessesByProject)
  .post(verifySectionId, processController.createProcess);

router.use(verifySectionId);

router.route('/:id')
  .get(processController.getProcessesBySection)
  .put(processController.updateProcess)
  .delete(processController.deleteProcess);

module.exports = router;
