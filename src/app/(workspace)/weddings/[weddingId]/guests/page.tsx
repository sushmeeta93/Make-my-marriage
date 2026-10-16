import { GuestsWorkspace } from "@/components/workspace/guests-workspace";

export default async function GuestsPage({
  params,
}: {
  params: Promise<{ weddingId: string }>;
}) {
  const { weddingId } = await params;

  return <GuestsWorkspace weddingId={weddingId} />;
}
