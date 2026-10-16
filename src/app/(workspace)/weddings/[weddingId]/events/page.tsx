import { EventsWorkspace } from "@/components/workspace/events-workspace";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ weddingId: string }>;
}) {
  const { weddingId } = await params;

  return <EventsWorkspace weddingId={weddingId} />;
}
