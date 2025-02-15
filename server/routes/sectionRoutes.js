const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const verifyProjectId = require('../middlewares/verifyProjectId');

router.use(verifyProjectId);

router.route('/')
  .post(sectionController.createSection)
  .get(sectionController.getSections);

router.route('/:id')
  .put(sectionController.updateSection)
  .delete(sectionController.deleteSection);

module.exports = router;
