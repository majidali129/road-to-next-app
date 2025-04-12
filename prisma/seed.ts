import { PrismaClient, Ticket } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    userName: "admin",
    email: "admin@admin.com",
  },
  {
    userName: "user",
    email: "user@user.com",
  },
];

const tickets = [
  {
    title: "Fix login bug",
    content: "Users are unable to log in with their credentials.",
    status: "DONE" as const,
    bounty: 0,
    deadline: "2024-04-21",
  },
  {
    title: "Update documentation",
    content: "The API documentation needs to be updated with the latest changes.",
    status: "OPEN" as const,
    bounty: 0,
    deadline: "2024-04-21",
  },
  {
    title: "Add unit tests",
    content: "Add unit tests for the new authentication module.",
    status: "DONE" as const,
    bounty: 0,
    deadline: "2024-04-21",
  },
  {
    title: "Deploy to production",
    content: "Deploy the application to the production server.",
    status: "IN_PROGRESS" as const,
    bounty: 0,
    deadline: "2024-04-21",
  },
];

const seed = async () => {
  const start = performance.now();
  console.log("Seeding start!");
  const hashedPassword = "asdf1234";

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, hashedPassword })),
  });

  console.log(dbUsers);

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });
  console.log(dbTickets);
  const end = performance.now();
  console.log(`Seeding end ${end - start}ms`);
};

seed();
