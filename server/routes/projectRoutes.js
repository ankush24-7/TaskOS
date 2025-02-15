const express = require('express');
const router = express.Router();
const parseProjectQueryParams = require('../middlewares/parseProjectQueryParams');
const projectController = require('../controllers/projectController');

router.route('/')
  .post(projectController.createProject)
  .get(parseProjectQueryParams, projectController.getProjects);

router.route('/:id')
  .get(projectController.getProjectByID)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;