"use server";

import { hash } from "@node-rs/argon2";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(191, "Username must not exceed 191 characters")
      .refine((value) => !value.includes(" "), "Username cannot contain spaces"),
    email: z.string().min(1, "Email is required").max(191).email(),
    password: z.string().min(6).max(191, "Password must not exceed 191 characters"),
    confirmPassword: z.string().min(8).max(191, "Confirm Password must not exceed 191 characters"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: " Passwords do not match",
      });
    }
  });

export const signUpUser = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password, userName } = await signUpSchema.parse(Object.fromEntries(formData));

    const hashedPassword = await hash(password);
    const user = await prisma.user.create({
      data: {
        email,
        userName,
        hashedPassword,
      },
    });

    // // // const sessionToken = generateRandomToken();

    // // const session = await createSession(sessionToken, user.id);

    // await setSessionCookie(sessionToken, session.expiresAt);

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return toActionState("ERROR", "Either email or username is already in use", formData);
    }

    return fromErrorToActionState(error, formData);
  }

  // return toActionState("SUCCESS", "Account created successfully");
  redirect(ticketsPath());
};
