"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ticketUpsertSchema = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 character" }).max(191, { message: "Title must be between 1 and 191 characters." }),
  content: z.string().min(1, { message: "Content must be at least 1 character" }).max(1024, { message: "Content must be between 1 and 1024 characters." }),
});
export const upsertTicket = async (id: string | undefined, _actionState: ActionState, formData: FormData) => {
  try {
    const data = ticketUpsertSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: {
        id: id || "",
      },
      update: data,
      create: data,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  revalidatePath(ticketsPath());
  if (id) {
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", id ? "Updated ticket" : "Created ticket");
};
