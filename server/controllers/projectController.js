const Process = require('../models/Process');
const Project = require('../models/Project');
const Section = require('../models/Section');

/*
  [ ] Remove team members controller
  [ ] Leave a project controller
  [ ] Accept invitation to project controller
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
    const newProject = await Project.create({
      userId,
      title,
      status,
      deadline,
      teamMembers,
    });
    return res.status(201).json({ _id: newProject._id, message: 'Project created successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjects = async(req, res) => {
  const { skip, sort, filter, limit } = req.query;
  try {
    const totalProjects = await Project.countDocuments(filter).exec();
    const projects = await Project.find(filter)
      .populate('userId', '_id name username')
      .populate('teamMembers', 'name username')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    const totalPages = Math.ceil(totalProjects / limit);
    return res.json({ totalProjects, totalPages, projects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjectByID = async(req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findOne({ _id: projectId })
      .populate('teamMembers', 'name username color displayPicture')
      .lean()
      .exec();
    return res.json({ project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProject = async(req, res) => {
  const projectId = req.params.id;
  const { title, status, deadline, teamMembers, archived, updatedAt } = req.body;
  
  try {
    const project = await Project.findOne({ _id: projectId }).exec();
    if(!project) return res.status(404).json({ message: 'Project not found' });

    if(title) project.title = title;
    if(status) project.status = status;
    if(deadline) project.deadline = deadline;
    if(archived) project.archived = archived;
    if(updatedAt) project.updatedAt = updatedAt;
    if(teamMembers) project.teamMembers = teamMembers;

    await project.save();
    return res.json({ id: project._id, message: 'Project updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProject = async(req, res) => {
  const projectId = req.params.id;
  const project = await Project.findOne({ _id: projectId }).exec();
  if(!project) return res.status(404).json({ message: 'Project not found' });

  try {
    await Process.deleteMany({ projectId }).exec();
    await Section.deleteMany({ projectId }).exec();
    await Project.deleteOne({ _id: projectId }).exec();
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
