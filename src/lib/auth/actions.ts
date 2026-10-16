"use server";

import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";

import { createSession } from "@/lib/auth/session";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/models/user";

export async function signUp(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const businessName = String(formData.get("businessName") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 8) {
    return {
      error: "Enter your name, email, and a password of at least 8 characters.",
    };
  }

  try {
    await connectToDatabase();
  } catch {
    return {
      error:
        "The database is not connected. Add MONGODB_URI and AUTH_SECRET to .env.local, then restart the app.",
    };
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return {
      error: "An account with this email already exists. Sign in instead.",
    };
  }

  const user = await User.create({
    name,
    email,
    businessName: businessName || undefined,
    passwordHash: await hash(password, 12),
  });

  await createSession({
    id: String(user._id),
    email: user.email,
    name: user.name,
  });
  redirect("/weddings");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  try {
    await connectToDatabase();
  } catch {
    return {
      error:
        "The database is not connected. Add MONGODB_URI and AUTH_SECRET to .env.local, then restart the app.",
    };
  }

  const user = await User.findOne({ email });
  if (!user || !(await compare(password, user.passwordHash))) {
    return { error: "That email and password do not match." };
  }

  await createSession({
    id: String(user._id),
    email: user.email,
    name: user.name,
  });
  redirect("/weddings");
}
