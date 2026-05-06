import "server-only";

import { cookies } from "next/headers";

const ADMIN_COOKIE = "seren_admin";

export async function isAdminAuthed() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!password) {
    return false;
  }

  return cookie === createAdminToken(password);
}

export async function setAdminCookie() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_DASHBOARD_PASSWORD is not configured.");
  }

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE, createAdminToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export function verifyAdminPassword(candidate: string) {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;

  return Boolean(password && candidate === password);
}

function createAdminToken(password: string) {
  return Buffer.from(`seren-admin:${password}`).toString("base64url");
}
