import type { Metadata } from "next";

import { ResetPasswordFlow } from "@/components/auth/auth-access-flow";

export const metadata: Metadata = {
  title: "Create a new password | Make My Marriage",
  description: "Securely create a new password for your planning workspace.",
};

const allowedStates = [
  "default",
  "success",
  "expired",
  "invalid",
  "offline",
  "error",
] as const;

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ state?: string }>;
}) {
  await params;
  const { state } = await searchParams;
  const initialState =
    allowedStates.find((item) => item === state) ?? "default";

  return <ResetPasswordFlow initialState={initialState} />;
}
