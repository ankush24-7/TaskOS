const handleParams = (req, res, next) => {
  const userId = req.user.userId;
  const { limit, sort = "updatedat", order = "desc", search, page = 1, archived = "false" } = req.query;
  const lim = parseInt(limit) || 10; 
  const skip = (parseInt(page) - 1) * lim;
  const sortOrder = order === "asc" ? 1 : -1;
  const filter = {
    teamMembers: { $in: [userId] }, 
    archived: archived === "true"
  };
  if (search) filter.title = { $regex: search, $options: "i" };
  
  let sortBy = {};
  if (sort) {
    switch (sort) {
      case "title":
        sortBy.title = sortOrder;
        break;
      case "status":
        sortBy.status = sortOrder;
        break;
      case "deadline":
        sortBy.deadline = sortOrder;
        break;
      case "updatedat":
        sortBy.updatedAt = sortOrder;
        break;
      case "createdby":
        sortBy["userId.name.firstName"] = sortOrder;
        break;
      default:
        return res.status(400).json({ message: "Invalid sort parameter" });
    }
  }

  const queryData = {
    filter,
    skip,
    sort: sortBy,
    limit: lim,
  };
  
  req.query = queryData;
  next();
};

module.exports = handleParams;
