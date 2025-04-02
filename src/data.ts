export const initialTickets = [
  {
    id: 1,
    title: "Fix login bug",
    content: "Users are unable to log in with their credentials.",
    status: "DONE" as const,
  },
  {
    id: 2,
    title: "Update documentation",
    content: "The API documentation needs to be updated with the latest changes.",
    status: "OPEN" as const,
  },
  {
    id: 3,
    title: "Add unit tests",
    content: "Add unit tests for the new authentication module.",
    status: "DONE" as const,
  },
  {
    id: 4,
    title: "Deploy to production",
    content: "Deploy the application to the production server.",
    status: "IN_PROGRESS" as const,
  },
];
