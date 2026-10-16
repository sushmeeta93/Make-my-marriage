import { EventDetailWorkspace } from "@/components/workspace/events-workspace";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ weddingId: string; eventId: string }>;
}) {
  const { weddingId } = await params;

  return <EventDetailWorkspace weddingId={weddingId} />;
}
