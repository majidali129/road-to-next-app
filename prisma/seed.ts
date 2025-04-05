import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Fix login bug",
    content: "Users are unable to log in with their credentials.",
    status: "DONE" as const,
  },
  {
    title: "Update documentation",
    content: "The API documentation needs to be updated with the latest changes.",
    status: "OPEN" as const,
  },
  {
    title: "Add unit tests",
    content: "Add unit tests for the new authentication module.",
    status: "DONE" as const,
  },
  {
    title: "Deploy to production",
    content: "Deploy the application to the production server.",
    status: "IN_PROGRESS" as const,
  },
];

const seed = async () => {
  const start = performance.now();
  console.log("Seeding start!");
  await prisma.ticket.deleteMany();
  await prisma.ticket.createMany({ data: tickets });
  const end = performance.now();
  console.log(`Seeding end ${end - start}ms`);
};

seed();
