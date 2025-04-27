const projectDao = require('../dao/projectDAO');

const createProject = async (projectData) => {
  const { userId, title } = projectData;
  if (!userId || !title) {
    throw new Error('User ID and Title are required');
  }
  return await projectDao.createProject(projectData);
};

const getProjects = async (queryData) => {
  return await projectDao.getProjects(queryData);
};

const getProjectByID = async (projectId) => {
  const project = await projectDao.getProjectByID(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const updateProject = async (projectId, updateData) => {
  const project = await projectDao.findProjectById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  return await projectDao.updateProject(project, updateData);
};

const deleteProject = async (projectId) => {
  const project = await projectDao.findProjectById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  return await projectDao.deleteProject(projectId);
};

module.exports = {
  createProject,
  getProjects,
  getProjectByID,
  updateProject,
  deleteProject,
};
