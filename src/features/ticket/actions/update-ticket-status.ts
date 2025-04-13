"use server";

import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateTicketStatus = async (id: string, value: TicketStatus) => {
  const { user } = await getAuthOrRedirect();
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!ticket || !(await isOwner(user, ticket))) {
      return toActionState("ERROR", "Not authorized");
    }
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status: value,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Status updated successfully");
};
