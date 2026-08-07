import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  checkPassword,
  createSession,
  verifySessionToken,
} from "./auth-session";

export {
  COOKIE_NAME,
  checkPassword,
  createSession,
  verifySessionToken,
};

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE_NAME)?.value);
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
