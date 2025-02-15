const Section = require('../models/Section');
const Process = require('../models/Process');

/*
  [ ] handle section dnd - change the position of the section
  [ ] handle task dnd - remove the task from the old section and add it to the new section
*/

const createSection = async (req, res) => {
  const { projectId, name, color, pos } = req.body;
  if (!name || pos === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const section = await Section.create({ projectId, name, color, pos });
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSections = async (req, res) => {
  const { projectId } = req.body;

  try {
    const sections = await Section.find({ projectId }).sort('pos').lean().exec();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSection = async (req, res) => {
  const sectionId = req.params.id;
  const { name, color } = req.body;

  try {
    const section = await Section.findOne({ _id: sectionId }).exec();
    if (!section) return res.status(404).json({ message: 'Section not found' });

    if (name) section.name = name;
    if (color) section.color = color;

    const updatedSection = await section.save();
    res.status(200).json(updatedSection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSection = async (req, res) => {
  const sectionId = req.params.id;
  const section = await Section.findOne({ _id: sectionId }).exec();
  if (!section) return res.status(404).json({ message: 'Section not found' });

  try {
    await Process.deleteMany({ sectionId }).exec();
    await Section.deleteOne({ _id: sectionId }).exec();
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleTaskDrag = async (req, res) => {};

const handleSectionDrag = async (req, res) => {};

module.exports = { createSection, getSections, updateSection, deleteSection };
