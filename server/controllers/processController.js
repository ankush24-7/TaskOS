const Process = require("../models/Process");

const createProcess = async (req, res) => {
  const {
    projectId,
    sectionId,
    title,
    priority,
    starred,
    assignedTo,
    tags,
    notes,
    description,
    scheduledAt,
    deadline,
  } = req.body;

  if (!sectionId || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await Process.create({
      projectId,
      sectionId,
      title,
      priority,
      starred,
      assignedTo,
      tags,
      notes,
      description,
      scheduledAt,
      deadline,
    });
    res.status(201).json({ message: "Process created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProcesses = async (req, res) => {
  const { projectId } = req.body;

  try {
    const processes = await Process.find({ projectId }).lean().exec();
    res.json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processController = {
  createProcess,
  getProcesses,
};

module.exports = processController;
