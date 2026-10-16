import type { Metadata } from "next";

import { AcceptInvitationFlow } from "@/components/auth/auth-access-flow";

export const metadata: Metadata = {
  title: "Accept invitation | Make My Marriage",
  description: "Join a private wedding planning workspace.",
};

const allowedStates = [
  "new",
  "existing",
  "family",
  "success",
  "expired",
  "revoked",
  "accepted",
  "wrong-account",
  "invalid",
  "offline",
  "error",
] as const;

export default async function AcceptInvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ state?: string }>;
}) {
  await params;
  const { state } = await searchParams;
  const initialState = allowedStates.find((item) => item === state) ?? "new";

  return <AcceptInvitationFlow initialState={initialState} />;
}
