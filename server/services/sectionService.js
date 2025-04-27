const sectionDao = require('../dao/sectionDao');

const createSection = async (sectionData) => {
  const { name, pos } = sectionData;
  if (!name || pos === undefined) {
    throw new Error('All fields are required');
  }
  await sectionDao.createSection(sectionData);
};

const getSections = async (projectId) => {
  if (!projectId) {
    throw new Error('Project ID is required');
  }
  return await sectionDao.getSections(projectId);
};

const updateSection = async (sectionId, updateData) => {
  const section = await sectionDao.findSectionById(sectionId);
  if (!section) {
    throw new Error('Section not found');
  }
  await sectionDao.updateSection(section, updateData);
};

const deleteSection = async (sectionId) => {
  const section = await sectionDao.findSectionById(sectionId);
  if (!section) {
    throw new Error('Section not found');
  }
  await sectionDao.deleteSection(sectionId);
};

module.exports = {
  createSection,
  getSections,
  updateSection,
  deleteSection,
};
