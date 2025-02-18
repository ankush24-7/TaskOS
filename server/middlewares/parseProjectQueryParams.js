const handleParams = (req, res, next) => {
    const userId = req.user.userId;
    const { sort = 'updatedat', order = 'desc', search, page = 1 } = req.query;
    const limit = 8;
    const skip = (parseInt(page) - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;
    const filter = { teamMembers: { $in: [userId] } };
    if (search) filter.title = { $regex: search, $options: 'i' };
    
    let sortBy = {};
    if (sort) {
        switch (sort) {
            case 'title':
                sortBy.title = sortOrder;
                break;
            case 'status':
                sortBy.status = sortOrder;
                break;
            case 'deadline':
                sortBy.deadline = sortOrder;
                break;
            case 'updatedat':
                sortBy.updatedAt = sortOrder;
                break;
            case 'createdby':
                sortBy.userId.name = sortOrder;
                break;
            default:
                return res.status(400).json({ message: 'Invalid sort parameter' });
        }
    }
    
    req.query = { sort: sortBy, skip, filter, limit };
    next();
}

module.exports = handleParams;