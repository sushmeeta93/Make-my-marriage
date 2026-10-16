import { VendorDetailWorkspace } from "@/components/workspace/vendors-workspace";

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ weddingId: string; vendorId: string }>;
}) {
  const { weddingId } = await params;

  return <VendorDetailWorkspace weddingId={weddingId} />;
}
