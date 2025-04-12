import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { hashToken } from "@/utils/crypto";
import { prisma } from "./prisma";
const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes: (attributes) => ({ userName: attributes.userName, email: attributes.email }),
});

declare module "Lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  userName: string;
  email: string;
}
const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 20; // 30 days

export const createSession = async (sessionToken: string, userId: string) => {
  const sessionId = hashToken(sessionToken);

  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  await prisma.session.create({
    data: session,
  });

  return session;
};
