"use client";

import { CircleAlert, RotateCcw } from "lucide-react";

export default function WeddingDashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <section className="bg-card max-w-lg rounded-xl border p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f3e2d2] text-[#815123]">
          <CircleAlert size={21} />
        </span>
        <p className="mt-6 text-[9px] font-bold tracking-wider text-[#815123] uppercase">
          Workspace unavailable
        </p>
        <h1 className="font-display mt-2 text-3xl">
          We couldn’t open this wedding
        </h1>
        <p className="text-muted-foreground mt-3 text-xs leading-6">
          Your information is safe. Check your connection and try loading the
          workspace again.
        </p>
        <button
          className="mx-auto mt-6 flex h-10 items-center gap-2 rounded-md bg-[#815123] px-5 text-xs font-bold text-white"
          onClick={reset}
          type="button"
        >
          <RotateCcw size={13} /> Try again
        </button>
      </section>
    </div>
  );
}
