import type { Metadata } from "next";

import { ForgotPasswordFlow } from "@/components/auth/auth-access-flow";

export const metadata: Metadata = {
  title: "Forgot password | Make My Marriage",
  description: "Request a secure password reset link.",
};

const allowedStates = [
  "default",
  "success",
  "rate-limit",
  "offline",
  "error",
] as const;

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const { state } = await searchParams;
  const initialState =
    allowedStates.find((item) => item === state) ?? "default";

  return <ForgotPasswordFlow initialState={initialState} />;
}
