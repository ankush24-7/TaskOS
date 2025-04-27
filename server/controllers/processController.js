const processService = require("../services/processService");

const createProcess = async (req, res) => {
try {
    const processData = req.body;
    await processService.createProcess(processData);
    res.status(201).json({ message: "Process created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProcessesByProject = async (req, res) => {
  const { projectId } = req.body;

  try {
    const processes = await processService.getProcessesByProject(projectId);
    res.json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProcessesByUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const processes = await processService.getProcessesByUser(userId);
    res.status(200).json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProcessesForTimeline = async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const processes = await processService.getProcessesForTimeline(userId);
    res.json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProcessesBySection = async (req, res) => {
  const sectionId = req.params.id;

  try {
    const processes = await processService.getProcessesBySection(sectionId);
    res.json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProcess = async (req, res) => {
  const processId = req.params.id;
  const updateData = req.body;
  
  try {
    await processService.updateProcess(processId, updateData);
    res.json({ message: "Process updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProcess = async (req, res) => {
  const processId = req.params.id;
  const sectionId = req.body.sectionId;

  try {
    await processService.deleteProcess(processId, sectionId);
    res.json({ message: "Process deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processController = {
  createProcess,
  getProcessesByProject,
  getProcessesByUser,
  getProcessesBySection,
  getProcessesForTimeline,
  updateProcess,
  deleteProcess,
};

module.exports = processController;
