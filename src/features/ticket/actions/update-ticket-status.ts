"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const updateTicketStatus = async (ticketId: string, value: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: {
        id: ticketId,
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
