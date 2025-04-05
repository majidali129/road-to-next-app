"use server";

import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertTicket = async (formData: FormData) => {
  const data = {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };
  await prisma.ticket.upsert({
    where: {
      id: data.id as string,
    },
    update: data,
    create: data,
  });
  revalidatePath(ticketsPath());
  if (data.id) {
    redirect(ticketPath(data.id));
  }
};
