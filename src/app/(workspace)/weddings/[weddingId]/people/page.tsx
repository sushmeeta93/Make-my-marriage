import { PeopleWorkspace } from "@/components/workspace/people-workspace";

export default async function PeoplePage({
  params,
}: {
  params: Promise<{ weddingId: string }>;
}) {
  const { weddingId } = await params;

  return <PeopleWorkspace weddingId={weddingId} />;
}
