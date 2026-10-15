import { ImagePlus } from "lucide-react";

import { GuestShell } from "@/components/guest/guest-shell";

type GalleryPageProps = {
  params: Promise<{ galleryToken: string }>;
};

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { galleryToken } = await params;

  return (
    <GuestShell>
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="mx-auto max-w-xl text-center">
          <ImagePlus aria-hidden="true" className="mx-auto text-[#8a5a32]" />
          <h1 className="font-display mt-5 text-5xl">Share your moments</h1>
          <p className="text-muted-foreground mt-4 leading-7">
            The private guest gallery and upload flow will be connected to R2 in
            a later milestone.
          </p>
          <p className="text-muted-foreground mt-8 text-xs">
            Private gallery token: {galleryToken.slice(0, 8)}…
          </p>
        </div>
      </section>
    </GuestShell>
  );
}
