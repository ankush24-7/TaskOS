const Section = require('../models/Section');
const Process = require('../models/Process');

const createSection = async (req, res) => {
  const { projectId, name, color, pos } = req.body;
  if (!name || pos === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await Section.create({ projectId, name, color, pos });
    res.status(201).json({ message: 'New section created!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSections = async (req, res) => {
  const { projectId } = req.body;
  if (!projectId) return res.status(400).json({ message: 'Project ID is required' });
  
  try {
    const sections = await Section.find({ projectId }).sort('pos').lean().exec();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSection = async (req, res) => {
  const sectionId = req.params.id;
  const { name, color, description, pos, processes } = req.body;
  try {
    const section = await Section.findOne({ _id: sectionId }).exec();
    if (!section) return res.status(404).json({ message: 'Section not found' });

    if (name && section.name !== name) section.name = name;
    if (processes !== undefined) section.processes = processes;
    if (color && section.color !== color) section.color = color;
    if (section.description !== description) section.description = description;
    if (typeof pos === 'number' && pos >= 0 && section.pos !== pos) section.pos = pos;

    await section.save();
    res.json({ message: 'Section updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSection = async (req, res) => {
  const sectionId = req.params.id;
  const section = await Section.findOne({ _id: sectionId }).exec();
  if (!section) return res.status(404).json({ message: 'Section not found' });

  try {
    await Process.deleteMany({ sectionId }).exec();
    await Section.deleteOne({ _id: sectionId }).exec();
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSection, getSections, updateSection, deleteSection };
