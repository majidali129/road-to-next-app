import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../ticket/search-params";

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
  const params = await searchParams;

  const where = {
    userId,
    title: { contains: params.search, mode: "insensitive" as const },
  };

  const take = params.size;
  const skip = params.page * params.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      take,
      skip,
      orderBy: {
        [params.sortKey]: params.sortValue,
      },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets,
    metaData: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
