import { CalendarDays, MapPin } from "lucide-react";

import { GuestShell } from "@/components/guest/guest-shell";

type PublicWeddingPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PublicWeddingPage({
  params,
}: PublicWeddingPageProps) {
  const { slug } = await params;

  return (
    <GuestShell>
      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#8a5a32] uppercase">
          Save the date
        </p>
        <h1 className="font-display mt-5 text-5xl tracking-tight sm:text-7xl">
          Aanya &amp; Rohan
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          18 December 2026 · Udaipur, Rajasthan
        </p>
        <div className="mx-auto mt-12 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
          <article className="bg-background rounded-lg border p-5">
            <CalendarDays aria-hidden="true" className="text-[#8a5a32]" />
            <h2 className="mt-5 text-lg font-semibold">Wedding ceremony</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              18 December · 10:00 AM
            </p>
          </article>
          <article className="bg-background rounded-lg border p-5">
            <MapPin aria-hidden="true" className="text-[#8a5a32]" />
            <h2 className="mt-5 text-lg font-semibold">The Mewar Courtyard</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Udaipur, Rajasthan
            </p>
          </article>
        </div>
        <p className="text-muted-foreground mt-10 text-xs">
          Preview route: /w/{slug}
        </p>
      </section>
    </GuestShell>
  );
}
