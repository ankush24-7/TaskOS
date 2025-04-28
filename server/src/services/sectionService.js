const sectionDAO = require('../dao/sectionDAO');

const createSection = async (sectionData) => {
  const { name, pos } = sectionData;
  if (!name || pos === undefined) {
    throw new Error('All fields are required');
  }
  await sectionDAO.createSection(sectionData);
};

const getSections = async (projectId) => {
  if (!projectId) {
    throw new Error('Project ID is required');
  }
  return await sectionDAO.getSections(projectId);
};

const updateSection = async (sectionId, updateData) => {
  const section = await sectionDAO.findSectionById(sectionId);
  if (!section) {
    throw new Error('Section not found');
  }
  await sectionDAO.updateSection(section, updateData);
};

const deleteSection = async (sectionId) => {
  const section = await sectionDAO.findSectionById(sectionId);
  if (!section) {
    throw new Error('Section not found');
  }
  await sectionDAO.deleteSection(sectionId);
};

module.exports = {
  createSection,
  getSections,
  updateSection,
  deleteSection,
};
