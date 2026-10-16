import { VendorsWorkspace } from "@/components/workspace/vendors-workspace";

export default async function VendorsPage({
  params,
}: {
  params: Promise<{ weddingId: string }>;
}) {
  const { weddingId } = await params;

  return <VendorsWorkspace weddingId={weddingId} />;
}
