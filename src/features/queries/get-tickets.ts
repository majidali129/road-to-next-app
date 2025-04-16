import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../ticket/search-params";

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: { contains: (await searchParams).search, mode: "insensitive" },
    },
    orderBy: {
      ...((await searchParams).sort === undefined && {
        createdAt: "desc",
      }),
      ...((await searchParams).sort === "bounty" && {
        bounty: "asc",
      }),
    },
    include: {
      user: {
        select: {
          userName: true,
        },
      },
    },
  });
};
