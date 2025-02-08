const Project = require('../models/Project');

const createProject = async (req, res) => {
  const userId = req.user?.userId;
  const title = req.body?.title;
  const status = req.body?.status || 'Running';
  const deadline = req.body?.deadline || null;
  const teamMembers = req.body?.teamMembers || [userId];

  if (!userId || !title) {
    return res.status(400).json({ message: 'User ID and Title are required' });
  }

  try {
    const project = await Project.create({
      userId,
      title,
      status,
      deadline,
      teamMembers,
    });

    return res.status(201).json({ project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  const { skip, sort, filter } = req.query;

  try {
    const totalProjects = await Project.countDocuments(filter).exec();
    const projects = await Project.find(filter).sort(sort).skip(skip).limit(10).exec();
    const totalPages = Math.ceil(totalProjects / 10);
    return res.json({ totalProjects, totalPages, projects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjectByID = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findOne({ _id: projectId }).exec();
    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  const projectId = req.params.id;
  if (!projectId)
    return res.status(400).json({ message: 'Project ID is required' });

  try {
    const project = await Project.findOne({ _id: projectId }).exec();
    project.title = req.body?.title || project.title;
    project.status = req.body?.status || project.status;
    project.deadline = req.body?.deadline || project.deadline;

    await project.save();
    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    await Project.deleteOne({ _id: projectId }).exec();
    return res.status(200).json({ message: 'Project deleted successfully' });
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
