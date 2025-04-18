const renderMembers = (teamMembers, userId) => {
  const team = teamMembers.filter((member) => member._id !== userId._id);
  return team.map((member) => member.username).join(", ");
};

export default renderMembers;
