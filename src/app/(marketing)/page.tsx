import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Users,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const metrics = [
  {
    label: "Next event",
    value: "Sangeet",
    note: "17 Dec · 7:00 PM",
    icon: CalendarDays,
  },
  {
    label: "Tasks",
    value: "12 open",
    note: "3 overdue",
    icon: CheckCircle2,
  },
  {
    label: "RSVP",
    value: "184 / 240",
    note: "households replied",
    icon: Users,
  },
  {
    label: "Budget",
    value: "₹49.85L",
    note: "of ₹72.40L spent",
    icon: CircleDollarSign,
  },
];

const capabilities = [
  "Events",
  "Vendors",
  "Budgets",
  "Guests",
  "RSVPs",
  "Websites",
  "Galleries",
];

export default function LandingPage() {
  return (
    <main>
      <section className="border-border/70 border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-28">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8a5a32] uppercase">
              Wedding planning workspace for professionals
            </p>
            <h1 className="font-display mt-5 max-w-2xl text-5xl leading-[1.03] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Every wedding. Beautifully orchestrated.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
              Plan events, vendors, budgets, guests, RSVPs, websites, and
              memories from one calm workspace built for professional wedding
              planners.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className={buttonVariants({ size: "large" })}
                href="/signup"
              >
                Start planning
              </Link>
              <Link
                className={buttonVariants({
                  size: "large",
                  variant: "secondary",
                })}
                href="#product"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div
            className="bg-card rounded-xl border p-4 shadow-[0_30px_80px_-45px_rgba(32,33,30,0.45)] sm:p-6"
            id="product"
          >
            <div className="flex items-start justify-between border-b pb-5">
              <div>
                <p className="text-muted-foreground text-sm">Client wedding</p>
                <h2 className="font-display mt-1 text-3xl">
                  Aanya &amp; Rohan
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Udaipur, Rajasthan · 18 December 2026
                </p>
              </div>
              <div className="bg-muted rounded-md px-3 py-2 text-right">
                <p className="text-lg font-semibold">64</p>
                <p className="text-muted-foreground text-xs">days to go</p>
              </div>
            </div>
            <div className="grid gap-3 pt-5 sm:grid-cols-2">
              {metrics.map(({ icon: Icon, label, note, value }) => (
                <article
                  className="bg-background rounded-lg border p-4"
                  key={label}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">{label}</p>
                    <Icon
                      aria-hidden="true"
                      className="text-[#8a5a32]"
                      size={17}
                    />
                  </div>
                  <p className="mt-5 text-xl font-semibold">{value}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card border-b" id="features">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-wrap justify-center gap-x-7 gap-y-3 px-5 py-5 text-xs font-semibold tracking-[0.16em] uppercase lg:px-8">
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
        id="planners"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#8a5a32] uppercase">
            From chaos to clarity
          </p>
          <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">
            Indian weddings are complex. Your workspace should not be.
          </h2>
          <p className="text-muted-foreground mt-5 text-lg leading-8">
            Replace scattered spreadsheets, payment notes, guest lists, vendor
            documents, and WhatsApp follow-ups with one organized wedding
            workspace.
          </p>
        </div>
      </section>
    </main>
  );
}
