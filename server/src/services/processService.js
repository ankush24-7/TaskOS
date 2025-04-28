const processDAO = require("../dao/processDAO");

const createProcess = async (processData) => {
  if (!processData.sectionId || !processData.title || processData.pos === undefined) {
    throw new Error("All fields are required");
  }

  const process = await processDAO.createProcess(processData);
  await processDAO.addProcessToSection(processData.sectionId, process._id);
};

const getProcessesByProject = async (projectId) => {
  return await processDAO.getProcessesByProject(projectId);
};

const getProcessesByUser = async (userId) => {
  return await processDAO.getProcessesByUser(userId);
};

const getProcessesForTimeline = async (userId) => {
  const processes = await processDAO.getProcessesByUser(userId);

  const dividedProcesses = [];

  processes.forEach((process) => {
    if (process.startsAt) {
      if (process.startsAt.getDate() !== process.endsAt.getDate()) {
        const nextDay = new Date(process.endsAt);
        nextDay.setHours(0, 0, 0, 0);

        const newProcess = {
          ...process,
          part: 2,
          startsAt: nextDay,
          prevStart: process.startsAt,
        };
        dividedProcesses.push(newProcess);

        process.part = 1;
        process.prevEnd = process.endsAt;
        process.endsAt = nextDay;
      }
    }
  });

  processes.push(...dividedProcesses);
  return processes;
};

const getProcessesBySection = async (sectionId) => {
  return await processDAO.getProcessesBySection(sectionId);
};

const updateProcess = async (processId, updateData) => {
  const process = await processDAO.updateProcess(processId, updateData);
  if (!process) {
    throw new Error("Process not found");
  }
  return process;
};

const deleteProcess = async (processId, sectionId) => {
  await processDAO.deleteProcess(processId);
  await processDAO.removeProcessFromSection(sectionId, processId);
};

module.exports = {
  createProcess,
  getProcessesByProject,
  getProcessesByUser,
  getProcessesForTimeline,
  getProcessesBySection,
  updateProcess,
  deleteProcess,
};
