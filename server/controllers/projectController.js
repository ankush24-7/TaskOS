const projectService = require('../services/projectService');

const createProject = async(req, res) => {
  const projectData = {
    userId: req.user?.userId,
    title: req.body?.title,
    status: req.body?.status,
    deadline: req.body?.deadline,
    teamMembers: req.body?.teamMembers ,
  };

  try {
    const newProject = await projectService.createProject(projectData);
    return res.status(201).json({ _id: newProject._id, message: 'Project created successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjects = async(req, res) => {
  const queryData = req.query;
  try {
    const { totalProjects, totalPages, projects } = await projectService.getProjects(queryData);
    return res.json({ totalProjects, totalPages, projects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjectByID = async(req, res) => {
  const projectId = req.params.id;
  try {
    const project = await projectService.getProjectByID(projectId);
    return res.json({ project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProject = async(req, res) => {
  const updateData = req.body;
  const projectId = req.params.id;
  
  try {
    const project = await projectService.updateProject(projectId, updateData);
    return res.json({ id: project._id, message: 'Project updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProject = async(req, res) => {
  const projectId = req.params.id;

  try {
    await projectService.deleteProject(projectId);
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectByID,
  updateProject,
  deleteProject,
};
