const Section = require('../models/Section');
const Process = require('../models/Process');
const sectionService = require('../services/sectionService');

const createSection = async (req, res) => {
  const sectionData = req.body;

  try {
    await sectionService.createSection(sectionData);
    res.status(201).json({ message: 'New section created!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSections = async (req, res) => {
  const { projectId } = req.body;
  
  try {
    const sections = await sectionService.getSections(projectId);
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSection = async (req, res) => {
  const sectionId = req.params.id;
  const updateData = req.body;
  try {
    await sectionService.updateSection(sectionId, updateData);
    res.json({ message: 'Section updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSection = async (req, res) => {
  const sectionId = req.params.id;

  try {
    await sectionService.deleteSection(sectionId);
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSection, getSections, updateSection, deleteSection };
