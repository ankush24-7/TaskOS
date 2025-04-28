const projectDAO = require('../dao/projectDAO');

const createProject = async (projectData) => {
  const { userId, title } = projectData;
  if (!userId || !title) {
    throw new Error('User ID and Title are required');
  }
  return await projectDAO.createProject(projectData);
};

const getProjects = async (queryData) => {
  return await projectDAO.getProjects(queryData);
};

const getProjectByID = async (projectId) => {
  const project = await projectDAO.getProjectByID(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const updateProject = async (projectId, updateData) => {
  const project = await projectDAO.findProjectById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  return await projectDAO.updateProject(project, updateData);
};

const deleteProject = async (projectId) => {
  const project = await projectDAO.findProjectById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  return await projectDAO.deleteProject(projectId);
};

module.exports = {
  createProject,
  getProjects,
  getProjectByID,
  updateProject,
  deleteProject,
};
