const Process = require('../models/Process');
const Project = require('../models/Project');
const Section = require('../models/Section');

/*
  [ ] Update team members controller
*/

const createProject = async(req, res) => {
  const userId = req.user?.userId;
  const title = req.body?.title;
  const status = req.body?.status || 'Running';
  const deadline = req.body?.deadline || null;
  const members = req.body?.teamMembers;
  const teamMembers = members ? [...members, userId] : [userId];

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

const getProjects = async(req, res) => {
  const { skip, sort, filter } = req.query;

  try {
    const totalProjects = await Project.countDocuments(filter).exec();
    const projects = await Project.find(filter)
      .populate('userId', 'name')
      .sort(sort)
      .skip(skip)
      .limit(10)
      .lean()
      .exec();
    const totalPages = Math.ceil(totalProjects / 10);
    return res.json({ totalProjects, totalPages, projects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjectByID = async(req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findOne({ _id: projectId }).exec();
    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProject = async(req, res) => {
  const projectId = req.params.id;
  const { title, status, deadline } = req.body;
  
  try {
    const project = await Project.findOne({ _id: projectId }).exec();
    if(!project) return res.status(404).json({ message: 'Project not found' });

    if(title) project.title = title;
    if(status) project.status = status;
    if(deadline) project.deadline = deadline;

    const updatedProject = await project.save();
    return res.status(200).json({ updatedProject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProject = async(req, res) => {
  const projectId = req.params.id;
  const project = await Project.findOne({ _id: projectId }).exec();
  if(!project) return res.status(404).json({ message: 'Project not found' });

  try {
    await Process.deleteMany({ sectionId: { $in: project.sections } }).exec();
    await Section.deleteMany({ projectId }).exec();
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
