const handleParams = (req, res, next) => {
    const userId = req.user.userId;
    const { sort = 'createdAt', order = 'desc', search, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * 10;
    const sortOrder = order === 'asc' ? 1 : -1;
    const filter = search
        ? { userId, title: { $regex: search, $options: 'i' } }
        : { userId };
    
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
            case 'createdAt':
                sortBy.createdAt = sortOrder;
                break;
            default:
                return res.status(400).json({ message: 'Invalid sort parameter' });
        }
    }

    req.query = { sort: sortBy, skip, filter };
    next();
}

module.exports = handleParams;