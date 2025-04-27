const Project = require('../models/Project');
const Section = require('../models/Section');
const Process = require('../models/Process');

const createProject = async ({ userId, title, status = 'Running', deadline = null, teamMembers }) => {
  const project = await Project.create({
    userId,
    title,
    status,
    deadline,
    teamMembers,
  });
  return project._id;
};

const getProjects = async ({ skip, sort, filter, limit }) => {
  const totalProjects = await Project.countDocuments(filter).exec();
  const projects = await Project.find(filter)
    .populate('userId', '_id name username')
    .populate('teamMembers', 'name username')
    .sort(sort)
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .lean()
    .exec();
    
  const totalPages = Math.ceil(totalProjects / limit);

  return { totalProjects, totalPages, projects };
};

const getProjectByID = async (projectId) => {
  return await Project.findOne({ _id: projectId })
    .populate('teamMembers', 'name username color displayPicture')
    .lean()
    .exec();
};

const findProjectById = async (projectId) => {
  return await Project.findOne({ _id: projectId }).exec();
};

const updateProject = async (project, updateData) => {
  const { title, status, deadline, teamMembers, archived, updatedAt } = updateData;

  if (title) project.title = title;
  if (status) project.status = status;
  if (deadline) project.deadline = deadline;
  if (archived !== undefined) project.archived = archived;
  if (updatedAt) project.updatedAt = updatedAt;
  if (teamMembers) project.teamMembers = teamMembers;

  await project.save();
  return project._id;
};

const deleteProject = async (projectId) => {
  await Process.deleteMany({ projectId }).exec();
  await Section.deleteMany({ projectId }).exec();
  await Project.deleteOne({ _id: projectId }).exec();
};

module.exports = {
  createProject,
  getProjects,
  getProjectByID,
  findProjectById,
  updateProject,
  deleteProject,
};
