const Section = require('../models/Section');

const verifySectionId = async (req, res, next) => {
    const { sectionId } = req.query;
    if(!sectionId) return res.status(400).json({ message: 'Section ID is required' });

    const section = await Section.findOne({ _id: sectionId }).lean().exec();
    if (!section) return res.status(404).json({ message: 'Section not found' });

    req.body.sectionId = sectionId;
    next();
}

module.exports = verifySectionId;