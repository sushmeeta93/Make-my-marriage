"use client";

import { useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  EyeOff,
  GripVertical,
  MapPin,
  MoreHorizontal,
  Plus,
  Shirt,
  UserRound,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const initialEvents = [
  {
    id: "mehendi",
    day: "Wednesday, 16 December",
    name: "Welcome Mehendi",
    time: "4:00 PM – 8:00 PM",
    venue: "The Promenade Lawn",
    public: true,
    runSheet: "5 of 6 ready",
  },
  {
    id: "haldi",
    day: "Thursday, 17 December",
    name: "Haldi Morning",
    time: "10:00 AM – 1:00 PM",
    venue: "Udaivilas Courtyard",
    public: true,
    runSheet: "4 of 4 ready",
  },
  {
    id: "sangeet",
    day: "Thursday, 17 December",
    name: "Sangeet · Royal Velvet Night",
    time: "7:00 PM – 11:30 PM",
    venue: "The Zenana Mahal",
    public: true,
    runSheet: "6 of 8 ready",
  },
  {
    id: "ceremony",
    day: "Friday, 18 December",
    name: "Vedic Vivah & Pheras",
    time: "5:00 PM – 9:30 PM",
    venue: "Jagmandir Island Palace",
    public: true,
    runSheet: "7 of 9 ready",
  },
  {
    id: "reception",
    day: "Friday, 18 December",
    name: "Reception Dinner",
    time: "9:30 PM – 12:00 AM",
    venue: "Jagmandir Courtyard",
    public: false,
    runSheet: "2 of 5 ready",
  },
] as const;

export function EventsWorkspace({ weddingId }: { weddingId: string }) {
  const [filter, setFilter] = useState<"all" | "public" | "private">("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const events = initialEvents.filter(
    (event) =>
      filter === "all" || (filter === "public" ? event.public : !event.public),
  );

  return (
    <>
      <PageHeader
        description="Five celebration moments across three production days."
        eyebrow="Event production"
        title="Events & run sheets"
      >
        <button
          className="flex h-10 items-center gap-2 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
          onClick={() => setIsDrawerOpen(true)}
          type="button"
        >
          <Plus size={14} /> Add event
        </button>
      </PageHeader>

      <section className="bg-card mt-7 flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
        <div className="flex gap-2 overflow-x-auto">
          {(["all", "public", "private"] as const).map((item) => (
            <button
              aria-pressed={filter === item}
              className={cn(
                "h-9 shrink-0 rounded-md border px-3 text-xs font-semibold capitalize",
                filter === item
                  ? "border-[#815123] bg-[#f1e8df] text-[#815123]"
                  : "text-muted-foreground",
              )}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item === "all" ? "All events" : `${item} events`}
            </button>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">
          {events.length} of {initialEvents.length} events
        </p>
      </section>

      <section className="bg-card mt-5 overflow-hidden rounded-lg border">
        <div className="bg-muted/45 text-muted-foreground hidden grid-cols-[minmax(14rem,1.2fr)_minmax(11rem,0.8fr)_8rem_8rem_2rem] gap-4 border-b px-5 py-3 text-[9px] font-bold tracking-wider uppercase md:grid">
          <span>Event</span>
          <span>Venue</span>
          <span>Visibility</span>
          <span>Run sheet</span>
          <span />
        </div>
        {events.map((event, index) => (
          <div
            className="grid gap-4 border-b p-5 last:border-0 md:grid-cols-[minmax(14rem,1.2fr)_minmax(11rem,0.8fr)_8rem_8rem_2rem] md:items-center"
            key={event.id}
          >
            <div>
              {(index === 0 || events[index - 1]?.day !== event.day) && (
                <p className="mb-2 text-[9px] font-bold tracking-wider text-[#815123] uppercase">
                  {event.day}
                </p>
              )}
              <Link
                className="group inline-flex items-center gap-2 text-sm font-bold hover:text-[#815123]"
                href={`/weddings/${weddingId}/events/${event.id}` as Route}
              >
                {event.name}
                <ChevronRight
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  size={13}
                />
              </Link>
              <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-[10px]">
                <Clock3 size={11} /> {event.time}
              </p>
            </div>
            <p className="text-muted-foreground flex items-center gap-2 text-xs">
              <MapPin size={13} className="text-[#815123]" /> {event.venue}
            </p>
            <span
              className={cn(
                "inline-flex w-fit items-center gap-1.5 rounded border px-2 py-1 text-[9px] font-bold",
                event.public
                  ? "border-[#366647]/20 bg-[#d7e3d2]/55 text-[#366647]"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {event.public ? <Eye size={11} /> : <EyeOff size={11} />}
              {event.public ? "Public" : "Private"}
            </span>
            <div>
              <p className="text-xs font-semibold">{event.runSheet}</p>
              <div className="bg-muted mt-2 h-1 w-20 overflow-hidden rounded-full">
                <div
                  className="h-full bg-[#6f8f75]"
                  style={{ width: `${58 + index * 8}%` }}
                />
              </div>
            </div>
            <button
              aria-label={`More actions for ${event.name}`}
              className="text-muted-foreground hover:bg-muted flex size-8 items-center justify-center rounded-md"
              type="button"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        ))}
        {!events.length && (
          <div className="p-12 text-center">
            <CalendarDays className="mx-auto text-[#815123]" size={25} />
            <h2 className="mt-4 text-sm font-bold">No matching events</h2>
            <p className="text-muted-foreground mt-2 text-xs">
              Change the visibility filter or add a new event.
            </p>
          </div>
        )}
      </section>

      {isDrawerOpen && (
        <EventDrawer onClose={() => setIsDrawerOpen(false)} title="Add event" />
      )}
    </>
  );
}

const runSheet = [
  ["5:45 PM", "Production briefing", "Priya Sharma", "Crew entrance"],
  ["6:15 PM", "Guest boat departures", "Rohan Mehta", "Udaivilas jetty"],
  ["6:50 PM", "Welcome drinks open", "Leela Palace F&B", "North courtyard"],
  ["7:10 PM", "Couple grand entrance", "Aarav Khanna", "Lighting cue S-14"],
  ["7:30 PM", "Family performances", "Naina Kapoor", "8 performance blocks"],
  ["9:15 PM", "Dinner service", "Chef R. Batra", "Jain counter marked"],
] as const;

export function EventDetailWorkspace({ weddingId }: { weddingId: string }) {
  const [publicEvent, setPublicEvent] = useState(true);
  const [drawer, setDrawer] = useState<"event" | "run-sheet" | null>(null);

  return (
    <>
      <Link
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold"
        href={`/weddings/${weddingId}/events` as Route}
      >
        <ArrowLeft size={13} /> Events
      </Link>
      <div className="mt-6 flex flex-col justify-between gap-5 border-b pb-7 sm:flex-row sm:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
              Thursday, 17 December
            </p>
            <span className="rounded border border-[#366647]/20 bg-[#d7e3d2]/60 px-2 py-1 text-[9px] font-bold text-[#366647]">
              {publicEvent ? "Visible publicly" : "Internal only"}
            </span>
          </div>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">
            Sangeet · Royal Velvet Night
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            7:00 PM – 11:30 PM · The Zenana Mahal
          </p>
        </div>
        <div className="flex gap-2">
          <button
            aria-pressed={publicEvent}
            className="bg-card flex h-10 items-center gap-2 rounded-md border px-3 text-xs font-bold"
            onClick={() => setPublicEvent((value) => !value)}
            type="button"
          >
            {publicEvent ? <Eye size={14} /> : <EyeOff size={14} />}
            {publicEvent ? "Public" : "Private"}
          </button>
          <button
            className="h-10 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
            onClick={() => setDrawer("event")}
            type="button"
          >
            Edit event
          </button>
        </div>
      </div>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Fact
          icon={Clock3}
          label="Date & time"
          value="17 Dec · 7:00–11:30 PM"
        />
        <Fact
          icon={MapPin}
          label="Venue"
          value="The Zenana Mahal, City Palace"
        />
        <Fact icon={Shirt} label="Attire" value="Royal velvet & jewel tones" />
        <Fact icon={UserRound} label="Event lead" value="Priya Sharma" />
      </section>

      <section className="bg-card mt-6 overflow-hidden rounded-lg border">
        <div className="flex flex-col justify-between gap-4 border-b p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
              Production rundown
            </p>
            <h2 className="font-display mt-1 text-2xl">
              Run sheet · 6 scheduled moments
            </h2>
          </div>
          <button
            className="bg-card flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-bold"
            onClick={() => setDrawer("run-sheet")}
            type="button"
          >
            <Plus size={13} /> Add row
          </button>
        </div>
        <div className="bg-muted/45 text-muted-foreground hidden grid-cols-[2rem_6rem_minmax(12rem,1fr)_11rem_minmax(10rem,0.7fr)_5rem] gap-3 border-b px-4 py-3 text-[9px] font-bold tracking-wider uppercase md:grid">
          <span />
          <span>Time</span>
          <span>Production moment</span>
          <span>Responsible</span>
          <span>Notes</span>
          <span>Status</span>
        </div>
        {runSheet.map(([time, title, owner, note], index) => (
          <div
            className={cn(
              "grid gap-3 border-b p-4 last:border-0 md:grid-cols-[2rem_6rem_minmax(12rem,1fr)_11rem_minmax(10rem,0.7fr)_5rem] md:items-center",
              index === 3 && "border-l-[3px] border-l-[#815123] bg-[#fbf6ef]",
            )}
            key={title}
          >
            <GripVertical
              className="text-muted-foreground hidden cursor-grab md:block"
              size={15}
            />
            <p className="font-display text-lg">{time}</p>
            <div>
              <p className="text-xs font-bold">{title}</p>
              {index === 3 && (
                <p className="mt-1 text-[9px] font-bold text-[#815123] uppercase">
                  Key cue
                </p>
              )}
            </div>
            <p className="text-muted-foreground text-xs">{owner}</p>
            <p className="text-muted-foreground text-[10px] leading-5">
              {note}
            </p>
            <span className="inline-flex w-fit items-center gap-1 text-[9px] font-bold text-[#366647]">
              <CheckCircle2 size={12} /> Ready
            </span>
          </div>
        ))}
      </section>

      <section className="bg-muted/45 mt-6 rounded-lg border p-5">
        <p className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
          Internal production note
        </p>
        <p className="mt-2 max-w-3xl text-xs leading-6">
          Palace access closes at 6:40 PM. Keep the couple in the green room
          until lighting confirms cue S-14. This note never appears on the
          public wedding website.
        </p>
      </section>

      {drawer === "event" && (
        <EventDrawer onClose={() => setDrawer(null)} title="Edit Sangeet" />
      )}
      {drawer === "run-sheet" && (
        <RunSheetDrawer onClose={() => setDrawer(null)} />
      )}
    </>
  );
}

function PageHeader({
  children,
  description,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="flex flex-col justify-between gap-5 border-b pb-7 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl">{title}</h1>
        <p className="text-muted-foreground mt-2 text-sm">{description}</p>
      </div>
      {children}
    </header>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <article className="bg-card rounded-lg border p-5">
      <Icon className="text-[#815123]" size={17} />
      <p className="text-muted-foreground mt-5 text-[9px] font-bold tracking-wider uppercase">
        {label}
      </p>
      <p className="mt-2 text-xs leading-5 font-bold">{value}</p>
    </article>
  );
}

function EventDrawer({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) {
  return (
    <Drawer onClose={onClose} title={title}>
      <div className="space-y-5">
        <Field label="Event name" value="Sangeet · Royal Velvet Night" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Date" type="date" value="2026-12-17" />
          <Field label="Start time" type="time" value="19:00" />
        </div>
        <Field label="Venue" value="The Zenana Mahal" />
        <Field label="Address" value="City Palace Complex, Old City, Udaipur" />
        <Field label="Google Maps link" value="https://maps.google.com/…" />
        <Field label="Dress code" value="Royal velvet and jewel tones" />
        <label>
          <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
            Internal notes
          </span>
          <textarea
            className="bg-background min-h-28 w-full rounded-md border p-3 text-sm"
            defaultValue="Palace access closes at 6:40 PM."
          />
        </label>
        <label className="flex items-center justify-between rounded-md border p-4 text-xs font-semibold">
          Show this event on the wedding website
          <input defaultChecked type="checkbox" />
        </label>
      </div>
    </Drawer>
  );
}

function RunSheetDrawer({ onClose }: { onClose: () => void }) {
  return (
    <Drawer onClose={onClose} title="Add run-sheet row">
      <div className="space-y-5">
        <Field label="Production moment" value="" />
        <Field label="Time" type="time" value="19:00" />
        <Field label="Responsible person" value="" />
        <Field label="Operational note" value="" />
        <label>
          <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
            Status
          </span>
          <select className="bg-background h-11 w-full rounded-md border px-3 text-sm">
            <option>Planned</option>
            <option>Ready</option>
            <option>Complete</option>
          </select>
        </label>
      </div>
    </Drawer>
  );
}

function Drawer({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/25"
      role="presentation"
    >
      <button
        aria-label="Close drawer"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <aside
        aria-label={title}
        aria-modal="true"
        className="bg-card relative flex h-full w-full max-w-lg flex-col border-l shadow-xl"
        role="dialog"
      >
        <header className="flex items-center justify-between border-b p-5">
          <div>
            <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
              Event production
            </p>
            <h2 className="font-display mt-1 text-2xl">{title}</h2>
          </div>
          <button
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-md border"
            onClick={onClose}
            type="button"
          >
            <X size={16} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">{children}</div>
        <footer className="flex justify-end gap-2 border-t p-4">
          <button
            className="h-10 rounded-md border px-4 text-xs font-bold"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-md bg-[#815123] px-5 text-xs font-bold text-white"
            onClick={onClose}
            type="button"
          >
            Save changes
          </button>
        </footer>
      </aside>
    </div>
  );
}

function Field({
  label,
  type = "text",
  value,
}: {
  label: string;
  type?: string;
  value: string;
}) {
  return (
    <label>
      <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <input
        className="bg-background h-11 w-full rounded-md border px-3 text-sm"
        defaultValue={value}
        type={type}
      />
    </label>
  );
}
