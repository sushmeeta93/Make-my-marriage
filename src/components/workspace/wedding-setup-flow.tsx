"use client";

import { useMemo, useState, type FormEvent } from "react";
import type { Route } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  ListChecks,
  MapPin,
  Sparkles,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";

const steps = ["Template", "Details", "Events", "Review"] as const;
const seededEvents = [
  ["Mehendi", "2026-12-16", "16:00"],
  ["Haldi", "2026-12-17", "10:00"],
  ["Sangeet", "2026-12-17", "19:00"],
  ["Wedding ceremony", "2026-12-18", "10:00"],
  ["Reception", "2026-12-18", "19:00"],
] as const;

type SetupEvent = {
  id: number;
  name: string;
  date: string;
  time: string;
};

export function WeddingSetupFlow() {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState<"indian" | "blank">("indian");
  const [created, setCreated] = useState(false);
  const [events, setEvents] = useState<SetupEvent[]>(
    seededEvents.map(([name, date, time], index) => ({
      id: index,
      name,
      date,
      time,
    })),
  );
  const [details, setDetails] = useState({
    bride: "Parvati",
    groom: "Shivam",
    title: "Parvati & Shivam",
    city: "Udaipur, Rajasthan",
    date: "2026-12-18",
    timezone: "Asia/Kolkata",
    currency: "INR",
    inviteEmail: "",
  });

  const progress = ((step + 1) / steps.length) * 100;
  const canContinue = useMemo(
    () =>
      step !== 1 ||
      Boolean(
        details.bride &&
        details.groom &&
        details.city &&
        details.date &&
        details.title,
      ),
    [details, step],
  );

  function submit(event: FormEvent) {
    event.preventDefault();
    if (step < 3) setStep((current) => current + 1);
    else setCreated(true);
  }

  if (created) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <section className="bg-card w-full rounded-xl border p-7 text-center shadow-sm sm:p-12">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#d7e3d2] text-[#366647]">
            <CheckCircle2 size={25} />
          </span>
          <p className="mt-7 text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
            Workspace ready
          </p>
          <h1 className="font-display mt-3 text-4xl">
            {details.title} is ready to plan
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm leading-7">
            We created {events.length} events and{" "}
            {template === "indian" ? "15 starter tasks" : "a blank checklist"}.
            You can change every detail from the workspace.
          </p>
          <Link
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#815123] px-6 text-sm font-bold text-white hover:bg-[#6d431c]"
            href={"/weddings/parvati-shivam" as Route}
          >
            Open wedding dashboard <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-col justify-between gap-5 border-b pb-7 sm:flex-row sm:items-end">
        <div>
          <Link
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold"
            href="/weddings"
          >
            <ArrowLeft size={13} /> All weddings
          </Link>
          <p className="mt-7 text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
            New client wedding
          </p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl">
            Create a wedding workspace
          </h1>
        </div>
        <p className="text-muted-foreground flex items-center gap-2 text-xs">
          <CheckCircle2 className="text-[#366647]" size={14} />
          Progress saved on this device
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] xl:gap-12">
        <aside>
          <div className="bg-border h-1 overflow-hidden rounded-full">
            <div
              className="h-full bg-[#815123] transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <ol className="mt-5 grid grid-cols-4 gap-2 lg:grid-cols-1">
            {steps.map((label, index) => (
              <li
                className={cn(
                  "flex items-center gap-3 rounded-md p-2.5 text-xs font-semibold",
                  index === step && "bg-[#f1e8df] text-[#815123]",
                  index < step && "text-[#366647]",
                  index > step && "text-muted-foreground",
                )}
                key={label}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px]",
                    index <= step && "border-current",
                  )}
                >
                  {index < step ? <Check size={12} /> : index + 1}
                </span>
                <span className="hidden lg:inline">{label}</span>
              </li>
            ))}
          </ol>
        </aside>

        <form className="min-w-0" onSubmit={submit}>
          <section className="bg-card overflow-hidden rounded-xl border">
            <div className="border-b px-5 py-6 sm:px-8">
              <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
                Step {step + 1} of {steps.length}
              </p>
              <h2 className="font-display mt-2 text-3xl">
                {step === 0 && "Choose your starting point"}
                {step === 1 && "Tell us about the celebration"}
                {step === 2 && "Shape the event itinerary"}
                {step === 3 && "Review before you create"}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6">
                {step === 0 &&
                  "Begin with a proven Indian multi-event structure or build the schedule from scratch."}
                {step === 1 &&
                  "These details establish your workspace, date formats and planning defaults."}
                {step === 2 &&
                  "The template dates are suggestions. Edit or remove anything before continuing."}
                {step === 3 &&
                  "Confirm the foundation. Everything remains editable after creation."}
              </p>
            </div>

            <div className="p-5 sm:p-8">
              {step === 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <TemplateCard
                    active={template === "indian"}
                    description="Five key events, practical date offsets and a 15-task planning checklist."
                    icon={<Sparkles size={20} />}
                    onClick={() => setTemplate("indian")}
                    title="Indian multi-event"
                  >
                    <div className="text-muted-foreground mt-5 grid grid-cols-2 gap-2 text-[10px]">
                      {["Mehendi", "Haldi", "Sangeet", "Ceremony"].map(
                        (item) => (
                          <span
                            className="bg-background rounded border px-2 py-1.5"
                            key={item}
                          >
                            {item}
                          </span>
                        ),
                      )}
                    </div>
                  </TemplateCard>
                  <TemplateCard
                    active={template === "blank"}
                    description="An empty event schedule and checklist for a fully custom production."
                    icon={<Circle size={20} />}
                    onClick={() => {
                      setTemplate("blank");
                      setEvents([]);
                    }}
                    title="Start blank"
                  />
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Bride’s name"
                    onChange={(value) =>
                      setDetails((current) => ({ ...current, bride: value }))
                    }
                    required
                    value={details.bride}
                  />
                  <Input
                    label="Groom’s name"
                    onChange={(value) =>
                      setDetails((current) => ({ ...current, groom: value }))
                    }
                    required
                    value={details.groom}
                  />
                  <Input
                    className="sm:col-span-2"
                    label="Workspace title"
                    onChange={(value) =>
                      setDetails((current) => ({ ...current, title: value }))
                    }
                    required
                    value={details.title}
                  />
                  <Input
                    label="City"
                    onChange={(value) =>
                      setDetails((current) => ({ ...current, city: value }))
                    }
                    required
                    value={details.city}
                  />
                  <Input
                    label="Primary wedding date"
                    onChange={(value) =>
                      setDetails((current) => ({ ...current, date: value }))
                    }
                    required
                    type="date"
                    value={details.date}
                  />
                  <Select
                    label="Time zone"
                    onChange={(value) =>
                      setDetails((current) => ({ ...current, timezone: value }))
                    }
                    options={["Asia/Kolkata"]}
                    value={details.timezone}
                  />
                  <Select
                    label="Currency"
                    onChange={(value) =>
                      setDetails((current) => ({ ...current, currency: value }))
                    }
                    options={["INR"]}
                    value={details.currency}
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  {events.length ? (
                    <div className="space-y-3">
                      {events.map((item) => (
                        <div
                          className="grid gap-3 rounded-lg border p-4 sm:grid-cols-[minmax(11rem,1fr)_9rem_7rem_auto] sm:items-end"
                          key={item.id}
                        >
                          <Input
                            label="Event"
                            onChange={(value) =>
                              setEvents((current) =>
                                current.map((event) =>
                                  event.id === item.id
                                    ? { ...event, name: value }
                                    : event,
                                ),
                              )
                            }
                            value={item.name}
                          />
                          <Input
                            label="Date"
                            onChange={(value) =>
                              setEvents((current) =>
                                current.map((event) =>
                                  event.id === item.id
                                    ? { ...event, date: value }
                                    : event,
                                ),
                              )
                            }
                            type="date"
                            value={item.date}
                          />
                          <Input
                            label="Time"
                            onChange={(value) =>
                              setEvents((current) =>
                                current.map((event) =>
                                  event.id === item.id
                                    ? { ...event, time: value }
                                    : event,
                                ),
                              )
                            }
                            type="time"
                            value={item.time}
                          />
                          <button
                            aria-label={`Remove ${item.name}`}
                            className="text-muted-foreground hover:border-destructive hover:text-destructive flex size-10 items-center justify-center rounded-md border"
                            onClick={() =>
                              setEvents((current) =>
                                current.filter((event) => event.id !== item.id),
                              )
                            }
                            type="button"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed p-10 text-center">
                      <CalendarDays
                        className="mx-auto text-[#815123]"
                        size={24}
                      />
                      <h3 className="mt-4 text-sm font-bold">No events yet</h3>
                      <p className="text-muted-foreground mt-2 text-xs">
                        Add the first moment in this wedding schedule.
                      </p>
                    </div>
                  )}
                  <button
                    className="bg-card mt-4 h-10 rounded-md border px-4 text-xs font-bold hover:border-[#815123]"
                    onClick={() =>
                      setEvents((current) => [
                        ...current,
                        {
                          id: Date.now(),
                          name: "New event",
                          date: details.date,
                          time: "18:00",
                        },
                      ])
                    }
                    type="button"
                  >
                    + Add event
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                  <div className="rounded-lg border">
                    <ReviewRow label="Wedding" value={details.title} />
                    <ReviewRow
                      label="Location & date"
                      value={`${details.city} · 18 December 2026`}
                    />
                    <ReviewRow
                      label="Defaults"
                      value={`${details.timezone} · ${details.currency}`}
                    />
                    <ReviewRow
                      label="Template"
                      value={
                        template === "indian"
                          ? "Indian multi-event · 15 tasks"
                          : "Blank workspace"
                      }
                    />
                  </div>
                  <div className="bg-muted/45 rounded-lg border p-5">
                    <p className="flex items-center gap-2 text-xs font-bold">
                      <ListChecks size={15} className="text-[#815123]" />
                      {events.length} scheduled events
                    </p>
                    <ul className="mt-4 space-y-3">
                      {events.map((event) => (
                        <li
                          className="flex items-center justify-between gap-3 text-xs"
                          key={event.id}
                        >
                          <span>{event.name}</span>
                          <span className="text-muted-foreground">
                            {event.date.slice(5)} · {event.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-2">
                    <Input
                      label="Invite a couple collaborator (optional)"
                      onChange={(value) =>
                        setDetails((current) => ({
                          ...current,
                          inviteEmail: value,
                        }))
                      }
                      placeholder="parvati@example.com"
                      type="email"
                      value={details.inviteEmail}
                    />
                    <p className="text-muted-foreground mt-2 text-[10px]">
                      They will receive a private single-use invitation. You can
                      skip this and invite them later.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <footer className="bg-muted/25 flex items-center justify-between gap-4 border-t px-5 py-4 sm:px-8">
              <button
                className="text-muted-foreground h-10 px-3 text-xs font-bold disabled:opacity-40"
                disabled={step === 0}
                onClick={() => setStep((current) => current - 1)}
                type="button"
              >
                Back
              </button>
              <button
                className="flex h-10 items-center gap-2 rounded-md bg-[#815123] px-5 text-xs font-bold text-white disabled:opacity-50"
                disabled={!canContinue}
                type="submit"
              >
                {step === 3 ? "Create wedding" : "Continue"}
                <ArrowRight size={14} />
              </button>
            </footer>
          </section>
        </form>
      </div>
    </div>
  );
}

function TemplateCard({
  active,
  children,
  description,
  icon,
  onClick,
  title,
}: {
  active: boolean;
  children?: React.ReactNode;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        "min-h-52 rounded-lg border p-6 text-left transition-colors",
        active
          ? "border-[#815123] bg-[#f8f1e9] shadow-[0_0_0_1px_#815123]"
          : "hover:border-[#815123]/45",
      )}
      onClick={onClick}
      type="button"
    >
      <span className="bg-card flex size-10 items-center justify-center rounded-md border text-[#815123]">
        {icon}
      </span>
      <span className="mt-5 flex items-center justify-between gap-3 text-sm font-bold">
        {title}
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-full border",
            active && "border-[#815123] bg-[#815123] text-white",
          )}
        >
          {active && <Check size={11} />}
        </span>
      </span>
      <span className="text-muted-foreground mt-2 block text-xs leading-5">
        {description}
      </span>
      {children}
    </button>
  );
}

function Input({
  className,
  label,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={className}>
      <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <input
        className="bg-background h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-[#815123] focus:ring-2 focus:ring-[#815123]/10"
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </label>
  );
}

function Select({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label>
      <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <select
        className="bg-background h-11 w-full rounded-md border px-3 text-sm"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 border-b p-4 last:border-0">
      <MapPin className="mt-0.5 shrink-0 text-[#815123]" size={14} />
      <div>
        <p className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
          {label}
        </p>
        <p className="mt-1 text-xs font-semibold">{value}</p>
      </div>
    </div>
  );
}
