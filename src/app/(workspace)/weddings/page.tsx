import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const dashboardMetrics = [
  { label: "Days to go", value: "64", note: "18 December 2026" },
  { label: "Open tasks", value: "12", note: "3 are overdue" },
  { label: "RSVP progress", value: "184 / 240", note: "households replied" },
  { label: "Budget spent", value: "₹49.85L", note: "of ₹72.40L planned" },
];

export default function WeddingsPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-muted-foreground text-sm">Thursday, 15 October</p>
          <h1 className="font-display mt-1 text-4xl tracking-tight">
            Wedding overview
          </h1>
        </div>
        <Link className={buttonVariants()} href="/weddings/new">
          <Plus aria-hidden="true" className="mr-2" size={16} />
          New wedding
        </Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <article className="bg-card rounded-lg border p-5" key={metric.label}>
            <p className="text-muted-foreground text-sm">{metric.label}</p>
            <p className="mt-5 text-2xl font-semibold">{metric.value}</p>
            <p className="text-muted-foreground mt-1 text-sm">{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="bg-card mt-8 rounded-lg border">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <p className="text-muted-foreground text-sm">Next event</p>
            <h2 className="mt-1 text-xl font-semibold">Sangeet</h2>
          </div>
          <Link
            className="flex items-center gap-2 text-sm font-semibold"
            href="/weddings"
          >
            View events <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
        <div className="grid gap-6 p-5 md:grid-cols-3">
          <Detail label="Date and time" value="17 December · 7:00 PM" />
          <Detail label="Venue" value="The Mewar Courtyard" />
          <Detail label="Run sheet" value="8 scheduled moments" />
        </div>
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
