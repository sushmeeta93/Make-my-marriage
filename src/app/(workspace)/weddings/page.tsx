import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  ExternalLink,
  ImageIcon,
  Plus,
  Users,
  WalletCards,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dashboardMetrics = [
  {
    label: "Production window",
    value: "64",
    suffix: "days to go",
    note: "18 December 2026",
    icon: CalendarClock,
  },
  {
    label: "Task progression",
    value: "12",
    suffix: "open tasks",
    note: "3 require attention",
    icon: CheckCircle2,
  },
  {
    label: "Household RSVPs",
    value: "184",
    suffix: "of 240 replied",
    note: "76% response rate",
    icon: Users,
  },
  {
    label: "Budget committed",
    value: "₹49.85L",
    suffix: "of ₹72.40L",
    note: "₹22.55L remaining",
    icon: WalletCards,
  },
];

export default function WeddingsPage() {
  return (
    <>
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
              Wedding overview
            </p>
            <span className="bg-[#d7e3d2] px-2 py-1 text-[9px] font-bold tracking-wider text-[#3e4a3d] uppercase">
              Production active
            </span>
          </div>
          <h1 className="font-display mt-3 text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">
            Parvati &amp; Shivam
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Udaipur, Rajasthan · 16–18 December 2026
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "bg-card gap-2",
            )}
            href="/w/parvati-shivam"
          >
            View wedding website
            <ExternalLink aria-hidden="true" size={14} />
          </Link>
          <button className={cn(buttonVariants(), "gap-2 px-5")} type="button">
            <Plus aria-hidden="true" size={15} />
            Add task
          </button>
          <button
            aria-label="More wedding actions"
            className="bg-card hover:bg-muted flex size-10 items-center justify-center rounded-md border"
            type="button"
          >
            <ChevronDown size={15} />
          </button>
        </div>
      </div>

      <p className="text-muted-foreground mt-6 flex items-center gap-2 text-[11px]">
        <CheckCircle2 className="text-[#366647]" size={14} />
        All changes saved · Updated a few seconds ago
      </p>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map(({ icon: Icon, label, note, suffix, value }) => (
          <article className="bg-card rounded-lg border p-5" key={label}>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                {label}
              </p>
              <Icon className="text-[#815123]" size={17} />
            </div>
            <p className="mt-7 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight">{value}</span>
              <span className="text-muted-foreground text-xs">{suffix}</span>
            </p>
            <p className="text-muted-foreground mt-2 text-[11px]">{note}</p>
          </article>
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.7fr)]">
        <section className="bg-card overflow-hidden rounded-lg border">
          <div className="flex items-center justify-between gap-4 border-b p-5">
            <div>
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Next event
              </p>
              <h2 className="font-display mt-1 text-2xl">
                Sangeet · Royal Velvet Night
              </h2>
            </div>
            <Link
              className="flex shrink-0 items-center gap-2 text-xs font-bold text-[#815123]"
              href={"/weddings/parvati-shivam/events" as Route}
            >
              View events <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>
          <div className="grid gap-5 p-5 sm:grid-cols-3">
            <Detail
              icon={CalendarClock}
              label="Date and time"
              value="17 December · 7:00 PM"
            />
            <Detail icon={Clock3} label="Venue" value="The Zenana Mahal" />
            <Detail
              icon={CheckCircle2}
              label="Run sheet"
              value="8 scheduled moments"
            />
          </div>
          <div className="bg-muted/60 mx-5 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-md border px-4 py-3">
            <p className="text-muted-foreground flex items-center gap-2 text-xs">
              <span className="size-1.5 rounded-full bg-[#366647]" />
              34 crew assigned · 14 vendors confirmed
            </p>
            <span className="text-[10px] font-bold text-[#366647]">
              Production ready
            </span>
          </div>
        </section>

        <section className="bg-card rounded-lg border">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Attention queue
              </p>
              <h2 className="mt-1 text-base font-bold">Needs your review</h2>
            </div>
            <CircleAlert className="text-[#815123]" size={18} />
          </div>
          <div className="divide-y px-5">
            {[
              ["3 overdue tasks", "Resolve before production review"],
              ["18 pending photos", "Approve for the public gallery"],
              ["56 RSVP follow-ups", "Households awaiting response"],
            ].map(([title, note], index) => (
              <div className="flex gap-3 py-4" key={title}>
                <span className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[#815123]">
                  {index + 1}
                </span>
                <div>
                  <p className="text-xs font-bold">{title}</p>
                  <p className="text-muted-foreground mt-1 text-[10px]">
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-card mt-6 overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              Recent activity
            </p>
            <h2 className="mt-1 text-base font-bold">Workspace coordination</h2>
          </div>
          <Link
            className="text-xs font-bold text-[#815123]"
            href="/weddings?view=activity"
          >
            View all activity
          </Link>
        </div>
        <div className="bg-border/50 grid gap-px sm:grid-cols-3">
          {[
            [
              CheckCircle2,
              "Priya completed “Finalize Sangeet lighting cues”",
              "12 minutes ago",
            ],
            [
              Users,
              "The Kapoor family confirmed all three events",
              "36 minutes ago",
            ],
            [
              ImageIcon,
              "8 new guest photos are awaiting moderation",
              "1 hour ago",
            ],
          ].map(([Icon, activity, time]) => {
            const ActivityIcon = Icon as typeof CheckCircle2;
            return (
              <article
                className="bg-card flex gap-3 p-5"
                key={activity as string}
              >
                <span className="bg-muted flex size-8 shrink-0 items-center justify-center rounded text-[#815123]">
                  <ActivityIcon size={15} />
                </span>
                <div>
                  <p className="text-xs leading-5">{activity as string}</p>
                  <p className="text-muted-foreground mt-1 text-[10px]">
                    {time as string}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarClock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="bg-muted flex size-9 shrink-0 items-center justify-center rounded text-[#815123]">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-muted-foreground text-[10px] uppercase">{label}</p>
        <p className="mt-1 text-xs font-bold">{value}</p>
      </div>
    </div>
  );
}
