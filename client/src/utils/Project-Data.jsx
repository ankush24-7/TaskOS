const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

export const projectData = [
  {
    projectId: "xO1Fya341",
    title: "Demo Project 1.0",
    status: "Running",
    dateCreated: "10 Oct",
    deadline: "20 Oct",
    createdBy: "John Doe",
  },
  {
    projectId: "xO1Fya342",
    title: "Demo Project 1.1",
    status: "Completed",
    dateCreated: formatDate("2021-11-01"),
    deadline: formatDate("2021-11-15"),
    createdBy: "Jane Smith",
  },
  {
    projectId: "xO1Fya343",
    title: "Demo Project 1.2",
    status: "Pending",
    dateCreated: formatDate("2021-12-05"),
    deadline: formatDate("2021-12-20"),
    createdBy: "Alice Johnson",
  },
  {
    projectId: "xO1Fya344",
    title: "Demo Project 1.3",
    status: "Running",
    dateCreated: formatDate("2022-01-10"),
    deadline: formatDate("2022-01-25"),
    createdBy: "Bob Brown",
  },
];
