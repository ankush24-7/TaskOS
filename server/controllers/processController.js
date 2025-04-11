const Process = require("../models/Process");
const Section = require("../models/Section");

const createProcess = async (req, res) => {
  const {
    projectId,
    sectionId,
    pos,
    title,
    description,
    priority,
    color,
    starred,
    assignedTo,
    schedule,
    startsAt,
    endsAt,
    showDeadline,
    deadline,
  } = req.body;

  if (!sectionId || !title || pos === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const process = await Process.create({
      projectId,
      sectionId,
      pos,
      title,
      description,
      priority,
      color,
      starred,
      assignedTo,
      schedule,
      startsAt,
      endsAt,
      showDeadline,
      deadline,
    });

    const section = await Section.findOne({ _id: sectionId }).exec();
    section.processes.push(process._id);
    await section.save();
    
    res.status(201).json({ message: "Process created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProcesses = async (req, res) => {
  const { projectId } = req.body;

  try {
    const processes = await Process.find({ projectId })
      .populate("assignedTo", "name username color displayPicture")
      .sort({ sectionId: 1, pos: 1 })
      .lean()
      .exec();
    res.json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProcessesForTimeline = async (req, res) => {
  const user = req.user.userId;
  
  try {
    const processes = await Process.find({ assignedTo: user })
      .populate("assignedTo", "name username")
      .lean()
      .exec();

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
          }
          dividedProcesses.push(newProcess);

          process.part = 1;
          process.prevEnd = process.endsAt;
          process.endsAt = nextDay;
        }
      }
    });

    processes.push(...dividedProcesses);
    res.json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProcessesBySection = async (req, res) => {
  const sectionId = req.params.id;

  try {
    const processes = await Process.find({ sectionId })
      .populate("assignedTo", "name")
      .sort("pos")
      .lean()
      .exec();
    res.json(processes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProcess = async (req, res) => {
  const processId = req.params.id;
  const {
    sectionId,
    pos,
    title,
    priority,
    completed,
    archived,
    starred,
    assignedTo,
    description,
    color,
    schedule,
    showDeadline,
    deadline,
    startsAt,
    endsAt,
  } = req.body;
  
  try {
    const process = await Process.findOne({ _id: processId }).exec();
    if (!process) return res.status(404).json({ message: "Process not found" });

    if (endsAt) process.endsAt = endsAt;
    if (startsAt) process.startsAt = startsAt;
    if (starred !== undefined) process.starred = starred;
    if (completed !== undefined) process.completed = completed;
    if (title && process.title !== title) process.title = title;
    if (color && process.color !== color) process.color = color;
    if (process.deadline !== deadline) process.deadline = deadline;
    if (pos !== undefined && process.pos !== pos) process.pos = pos;
    if (priority && process.priority !== priority) process.priority = priority;
    if (sectionId && process.sectionId !== sectionId) process.sectionId = sectionId;
    if (assignedTo && process.assignedTo !== assignedTo) process.assignedTo = assignedTo;
    if (archived !== undefined && process.archived !== archived) process.archived = archived;
    if (description !== undefined && process.description !== description) process.description = description;
    if (schedule !== undefined) {
      process.schedule = schedule;
      if (!schedule) {
        process.startsAt = null;
        process.endsAt = null;
      }
    }
    if (showDeadline !== undefined) {
      process.showDeadline = showDeadline;
      if (!showDeadline) {
        process.deadline = null;
        process.showDeadline = false;
      }
    }

    await process.save();
    res.json({ message: "Process updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProcess = async (req, res) => {
  const processId = req.params.id;
  const sectionId = req.body.sectionId;
  const process = await Process.findOne({ _id: processId }).lean().exec();
  if (!process) return res.status(404).json({ message: "Process not found" });

  try {
    await Process.deleteOne({ _id: processId }).exec();

    const section = await Section.findOne({ _id: sectionId }).exec();
    section.processes = section.processes.filter((p) => p.toString() !== processId);
    await section.save();

    res.json({ message: "Process deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processController = {
  createProcess,
  getProcesses,
  getProcessesBySection,
  getProcessesForTimeline,
  updateProcess,
  deleteProcess,
};

module.exports = processController;
