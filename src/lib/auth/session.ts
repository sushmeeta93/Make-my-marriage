import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

import { getServerEnv } from "@/lib/env/server";

const cookieName = "mmm_session";
const maxAge = 60 * 60 * 24 * 30;

type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  exp: number;
};

export async function createSession(user: {
  id: string;
  email: string;
  name: string;
}) {
  const exp = Date.now() + maxAge * 1000;
  const token = sign({
    userId: user.id,
    email: user.email,
    name: user.name,
    exp,
  });
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return null;
  return verify(token);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

function sign(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret())
    .update(body)
    .digest("base64url");
  return `${body}.${signature}`;
}

function verify(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = createHmac("sha256", secret())
    .update(body)
    .digest("base64url");
  const actual = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (actual.length !== wanted.length || !timingSafeEqual(actual, wanted)) {
    return null;
  }
  const payload = JSON.parse(
    Buffer.from(body, "base64url").toString(),
  ) as SessionPayload;
  if (payload.exp < Date.now()) return null;
  return payload;
}

function secret() {
  const value = getServerEnv().AUTH_SECRET;
  if (!value) {
    throw new Error("AUTH_SECRET is required for sessions.");
  }
  return value;
}
