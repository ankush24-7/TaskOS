const Process = require("../models/Process");
const Section = require("../models/Section");

const createProcess = async (processData) => {
  const process = await Process.create(processData);
  return process;
};

const getProcessesByProject = async (projectId) => {
  return await Process.find({ projectId })
    .populate("assignedTo", "name username color displayPicture")
    .sort({ sectionId: 1, pos: 1 })
    .lean()
    .exec();
};

const getProcessesByUser = async (userId) => {
  return await Process.find({ assignedTo: userId })
    .select("-pos -assignedTo -description -schedule -showDeadline -log")
    .populate("projectId", "title")
    .lean()
    .exec();
};

const getProcessesBySection = async (sectionId) => {
  return await Process.find({ sectionId })
    .populate("assignedTo", "name")
    .sort("pos")
    .lean()
    .exec();
};

const updateProcess = async (processId, updateData) => {
  const { schedule, showDeadline } = updateData;
  if (schedule === false) {
    updateData.startsAt = null;
    updateData.endsAt = null;
  }
  if (showDeadline === false) {
    updateData.deadline = null;
    updateData.showDeadline = false;
  }
  return await Process.findOneAndUpdate({ _id: processId }, updateData, { new: true }).exec();
};

const deleteProcess = async (processId) => {
  return await Process.deleteOne({ _id: processId }).exec();
};

const addProcessToSection = async (sectionId, processId) => {
  const section = await Section.findOne({ _id: sectionId }).exec();
  section.processes.push(processId);
  await section.save();
};

const removeProcessFromSection = async (sectionId, processId) => {
  const section = await Section.findOne({ _id: sectionId }).exec();
  section.processes = section.processes.filter((p) => p.toString() !== processId);
  await section.save();
};

module.exports = {
  createProcess,
  getProcessesByProject,
  getProcessesByUser,
  getProcessesBySection,
  updateProcess,
  deleteProcess,
  addProcessToSection,
  removeProcessFromSection,
};
