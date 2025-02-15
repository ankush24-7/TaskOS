const Project = require('../models/Project');

const verifyProjectId = async (req, res, next) => {
    const { projectId } = req.body;
    if (!projectId) return res.status(400).json({ message: 'Project ID is required' });

    const project = await Project.findOne({ _id: projectId }).exec();
    if (!project) return res.status(404).json({ message: 'Project not found' });

    req.body.projectId = projectId;
    next();
}

module.exports = verifyProjectId;