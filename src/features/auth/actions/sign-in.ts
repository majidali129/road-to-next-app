"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").max(191).email(),
  password: z.string().min(6).max(191, "Password must not exceed 191 characters"),
});

export const signInUser = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = await signInSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return toActionState("ERROR", "Incorrect email or password", formData);

    const validPassword = await verify(user.hashedPassword, password);

    if (!validPassword) return toActionState("ERROR", "Incorrect email or password", formData);

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  //   return toActionState("SUCCESS", "Login successfully");
  redirect(ticketsPath());
};
