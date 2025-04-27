const Section = require('../models/Section');
const Process = require('../models/Process');

const createSection = async ({ projectId, name, color, pos }) => {
  await Section.create({ projectId, name, color, pos });
};

const getSections = async (projectId) => {
  return await Section.find({ projectId })
    .sort('pos')
    .lean()
    .exec();
};

const findSectionById = async (sectionId) => {
  return await Section.findOne({ _id: sectionId }).exec();
};

const updateSection = async (section, updateData) => {
  await Section.findOneAndUpdate({ _id: section._id }, updateData, { new: true }).exec();
};

const deleteSection = async (sectionId) => {
  await Process.deleteMany({ sectionId }).exec();
  await Section.deleteOne({ _id: sectionId }).exec();
};

module.exports = {
  createSection,
  getSections,
  findSectionById,
  updateSection,
  deleteSection,
};
