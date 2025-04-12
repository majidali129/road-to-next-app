import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "session";

export const setSessionCookie = async (sessionToken: string, expiresAt: Date) => {
  const cookieStore = await cookies();
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
    },
  };

  cookieStore.set(cookie.name, cookie.value, cookie.attributes);
};

export const deleteSessionCookie = async () => {
  const cookieStore = await cookies();
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: "",
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    },
  };

  cookieStore.set(cookie.name, cookie.value, cookie.attributes);
};
