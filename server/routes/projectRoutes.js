const express = require('express');
const router = express.Router();
const parseProjectQueryParams = require('../middlewares/parseProjectQueryParams');
const { createProject, getProjects, getProjectByID, updateProject, deleteProject } = require('../controllers/projectController');

router.route('/')
  .post(createProject)
  .get(parseProjectQueryParams, getProjects);

router.route('/:id')
  .get(getProjectByID)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;