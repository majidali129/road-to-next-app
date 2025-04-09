"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import { toCent } from "@/app/utils/currency";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

const ticketUpsertSchema = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 character" }).max(191, { message: "Title must be between 1 and 191 characters." }),
  content: z.string().min(1, { message: "Content must be at least 1 character" }).max(1024, { message: "Content must be between 1 and 1024 characters." }),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().positive(),
});
export const upsertTicket = async (id: string | undefined, _actionState: ActionState, formData: FormData) => {
  try {
    const data = ticketUpsertSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        id: id || "",
      },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  revalidatePath(ticketsPath());
  if (id) {
    await setCookieByKey("toast", "Ticket updated successfully");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", id ? "Updated ticket" : "Created ticket");
};
