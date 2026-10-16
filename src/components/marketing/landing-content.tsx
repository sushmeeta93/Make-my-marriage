import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Banknote,
  CalendarClock,
  Check,
  CheckCircle2,
  FileCheck2,
  GalleryHorizontalEnd,
  Globe2,
  Heart,
  KeyRound,
  ListChecks,
  LockKeyhole,
  MapPin,
  PlayCircle,
  QrCode,
  Radio,
  ReceiptIndianRupee,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  Utensils,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ribbonItems = [
  "Events & run sheets",
  "Vendor logistics",
  "Budget ledgers",
  "Household RSVPs",
  "Client web portals",
  "Curation galleries",
];

const capabilities = [
  {
    eyebrow: "01 · Production choreography",
    title: "Events and run sheets",
    description:
      "Coordinate every ceremony, venue, dress code, micro-timing, and day-of lead responsibility down to the minute.",
    icon: CalendarClock,
    span: "lg:col-span-8",
    detail: (
      <div className="space-y-2.5">
        {[
          ["16 Dec · 16:00", "Mehendi by the Poolside", "Decor lead: Devika"],
          ["17 Dec · 10:30", "Haldi & Phoolon Ki Holi", "F&B: Live chaat"],
          ["18 Dec · 17:00", "Vedic Vivah & Pheras", "Island Palace Mandap"],
        ].map(([time, event, owner], index) => (
          <div
            className={cn(
              "bg-background flex flex-col justify-between gap-2 rounded-md border border-l-4 p-3.5 sm:flex-row sm:items-center",
              index === 1 ? "border-l-[#815123]" : "border-l-[#d6c3b6]",
            )}
            key={event}
          >
            <div>
              <p className="text-muted-foreground text-[11px] font-semibold uppercase">
                {time}
              </p>
              <p className="mt-0.5 text-sm font-semibold">{event}</p>
            </div>
            <span className="bg-muted text-muted-foreground rounded px-2 py-1 text-[11px]">
              {owner}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "02 · Accountability",
    title: "Tasks & assignments",
    description:
      "Assign work, track deadlines, and keep family members aligned without confusion.",
    icon: ListChecks,
    span: "lg:col-span-4",
    detail: (
      <div className="space-y-2.5">
        {[
          ["Safas & stoles count check", "Done", "text-[#366647]"],
          ["Guest airport fleet roster", "Due today", "text-[#815123]"],
          ["Sign off Baraat route permit", "Urgent", "text-red-700"],
        ].map(([task, status, tone]) => (
          <div className="bg-background rounded-md border p-3" key={task}>
            <div className="flex items-start justify-between gap-3 text-xs">
              <span className="font-semibold">{task}</span>
              <span className={cn("shrink-0 font-semibold", tone)}>
                {status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "03 · Procurement",
    title: "Vendors & milestones",
    description:
      "Track contacts, contracts, quotes, advances, balances, and critical due dates in real time.",
    icon: FileCheck2,
    span: "lg:col-span-4",
    detail: (
      <div className="bg-background space-y-3 rounded-md border p-4 text-xs">
        <div>
          <p className="font-semibold">Devika Narain Decor</p>
          <p className="text-muted-foreground">Stage & Mandap Architecture</p>
        </div>
        <div className="border-t pt-3">
          <p className="flex justify-between">
            <span className="text-muted-foreground">Contract</span>
            <strong>₹28,00,000</strong>
          </p>
          <p className="mt-2 flex justify-between text-[#366647]">
            <span>Advance paid</span>
            <strong>₹14,00,000</strong>
          </p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "04 · Financial allocation",
    title: "Budget by family side",
    description:
      "Track planned, spent, and remaining costs across Bride, Groom, and Shared ledger splits.",
    icon: Banknote,
    span: "lg:col-span-4",
    detail: (
      <div className="space-y-4">
        {[
          ["Bride family", "₹32L", "72%", "w-[72%] bg-[#815123]"],
          ["Groom family", "₹26L", "65%", "w-[65%] bg-[#566254]"],
          ["Shared pool", "₹14.4L", "69%", "w-[69%] bg-[#366647]"],
        ].map(([label, amount, percent, width]) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-semibold">{label}</span>
              <span className="text-muted-foreground">{amount}</span>
            </div>
            <div className="bg-muted h-2 overflow-hidden rounded-full">
              <div className={cn("h-full", width)} />
            </div>
            <p className="text-muted-foreground mt-1 text-[10px]">
              {percent} committed
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "05 · Hospitality",
    title: "Household RSVPs & stays",
    description:
      "Invite households to selected events, track meals, rooming, and replies together.",
    icon: Users,
    span: "lg:col-span-4",
    detail: (
      <div className="bg-background rounded-md border p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Dr. Rajan Singhania</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Party of 4 · Suite 204
            </p>
          </div>
          <span className="bg-[#e1eee3] px-2 py-1 text-[10px] font-semibold text-[#366647]">
            Attending
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["2× Jain meals", "Airport pickup", "VIP tier 1"].map((tag) => (
            <span
              className="bg-muted text-muted-foreground rounded px-2 py-1 text-[10px]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    eyebrow: "06 · Digital concierge",
    title: "Wedding website & live stream",
    description:
      "Publish a private portal with attire guides, maps, and unlisted YouTube Live integration.",
    icon: Globe2,
    span: "lg:col-span-6",
    detail: (
      <div className="bg-background flex items-center gap-4 rounded-md border p-4">
        <div className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-md">
          <Radio className="text-[#815123]" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#366647]">
            Private broadcast active
          </p>
          <p className="mt-1 truncate text-sm font-semibold">
            parvati-shivam.makemymarriage.com
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Global access without account friction.
          </p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "07 · Curation control",
    title: "Curated guest photo drops",
    description:
      "Guests scan table QR codes to upload instantly while planners moderate the public feed.",
    icon: GalleryHorizontalEnd,
    span: "lg:col-span-6",
    detail: (
      <div className="bg-background flex items-center gap-4 rounded-md border p-4">
        <div className="bg-muted flex size-16 shrink-0 items-center justify-center rounded-md">
          <QrCode className="text-[#815123]" />
        </div>
        <div>
          <p className="text-sm font-semibold">Table QR drops active</p>
          <p className="text-muted-foreground mt-1 text-xs">
            320 uploads queued from Sangeet night
          </p>
        </div>
      </div>
    ),
  },
];

const workflow = [
  [
    "Create the wedding",
    "Start blank or use a multi-day Indian wedding template.",
    "Setup in 3 mins",
  ],
  [
    "Invite the couple",
    "Grant protected access to the couple and family.",
    "Role protected",
  ],
  [
    "Coordinate details",
    "Orchestrate events, payments, rooming, and riders.",
    "Production heart",
  ],
  [
    "Collect RSVPs",
    "Send private links and collect household-level responses.",
    "No app required",
  ],
  [
    "Publish & celebrate",
    "Launch the site, stream live, and curate memories.",
    "Flawless finale",
  ],
];

const roles = [
  {
    label: "Master admin",
    title: "Planner workspace",
    description:
      "Owns the environment, vendor negotiations, financial ledgers, run sheets, and access limits.",
    items: ["Master budget control", "Vendor contracts", "Run sheet editing"],
    icon: ShieldCheck,
  },
  {
    label: "Collaborator",
    title: "The couple",
    description:
      "Selects vendors, approves milestones, edits the website story, and reviews responses.",
    items: ["Milestone approval", "Website touchpoints", "Photo moderation"],
    icon: Heart,
  },
  {
    label: "Family desk",
    title: "Family & patrons",
    description:
      "Oversees designated guest lists, meal preferences, rooms, and airport assignments.",
    items: ["Household RSVPs", "Rooming roster", "No vendor payments"],
    icon: Users,
  },
  {
    label: "Guest tier",
    title: "Invited guests",
    description:
      "Opens the private wedding hub with no password headaches or app downloads.",
    items: ["WhatsApp RSVP", "Timings & maps", "Stream & photo drop"],
    icon: MapPin,
  },
];

const guestScreens = [
  {
    label: "01 · Wedding portal",
    title: "Parvati & Shivam",
    icon: Sparkles,
    body: "16–18 December · Udaipur",
    detail: "A private, elegant home for every guest detail.",
  },
  {
    label: "02 · Household RSVP",
    title: "The Kapoor Family",
    icon: CheckCircle2,
    body: "3 attending · Oberoi Udaivilas",
    detail: "Respond once for the family, event by event.",
  },
  {
    label: "03 · Dynamic schedule",
    title: "Sangeet Extravaganza",
    icon: CalendarClock,
    body: "Tonight · 7:00 PM · Zenana Mahal",
    detail: "Live travel, venue, and attire instructions.",
  },
  {
    label: "04 · Live stream",
    title: "Mandap Broadcast",
    icon: PlayCircle,
    body: "LIVE · 218 viewers",
    detail: "Unlisted YouTube stream for family worldwide.",
  },
  {
    label: "05 · Guest photo drop",
    title: "Share your moments",
    icon: Upload,
    body: "No account needed",
    detail: "Upload directly from the camera roll for curation.",
  },
];

function SectionIntro({
  centered = false,
  description,
  eyebrow,
  title,
}: {
  centered?: boolean;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      <p className="text-[11px] font-bold tracking-[0.18em] text-[#815123] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">
        {title}
      </h2>
      <p className="text-muted-foreground mt-5 text-base leading-7 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div
      className="border-border/60 bg-card w-full max-w-6xl overflow-hidden rounded-xl border text-left shadow-[0_30px_90px_-45px_rgba(35,28,20,0.42)]"
      id="product"
    >
      <div className="bg-muted/80 border-border/40 flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <span
                className="bg-border block size-2.5 rounded-full"
                key={dot}
              />
            ))}
          </div>
          <span className="font-display text-lg font-semibold">
            Parvati &amp; Shivam
          </span>
          <span className="text-muted-foreground hidden text-xs sm:inline">
            · Udaipur, Rajasthan
          </span>
          <span className="bg-[#d7e3d2] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#3e4a3d] uppercase">
            Production run
          </span>
        </div>
        <span className="text-xs font-semibold text-[#366647]">
          ● All 14 vendors synced
        </span>
      </div>

      <div className="space-y-5 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="bg-muted/70 rounded-lg border p-5 md:col-span-3">
            <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
              Production window
            </p>
            <p className="font-display mt-2 text-5xl">
              64 <span className="font-sans text-sm">days to go</span>
            </p>
            <p className="text-muted-foreground mt-3 text-xs">
              Vendor finalization & RSVP lock
            </p>
          </div>
          <div className="bg-background flex flex-col justify-between gap-4 rounded-lg border border-l-4 border-l-[#815123] p-5 sm:flex-row sm:items-center md:col-span-9">
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded bg-[#ffdcc1] text-[#815123]">
                <Sparkles size={19} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
                  Next function in cue
                </p>
                <p className="font-display mt-1 text-xl">
                  Sangeet · Royal Velvet Night
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  17 Dec · 7:00 PM · Zenana Mahal
                </p>
              </div>
            </div>
            <span className="bg-muted self-start rounded px-3 py-2 text-xs font-semibold sm:self-center">
              Run sheet
            </span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <DashboardMetric
            eyebrow="Task progression"
            footer="Assigned to Priya S. (Lead)"
            title="12 tasks open"
          >
            {[
              "Sound engineer rider",
              "Mandap CAD approval",
              "Baraat transit permit",
            ].map((task, index) => (
              <p
                className="bg-card flex items-center justify-between rounded border p-2.5 text-xs"
                key={task}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-3.5 rounded-sm border",
                      index === 0 && "border-[#815123] bg-[#815123]",
                    )}
                  />
                  {task}
                </span>
                <span className="text-muted-foreground">
                  {index === 0 ? "Today" : "Nov"}
                </span>
              </p>
            ))}
          </DashboardMetric>
          <DashboardMetric
            eyebrow="Guest response ratio"
            footer="64 dietary preferences flagged"
            title="184 / 240 households"
          >
            <div className="bg-muted mt-1 flex h-2 overflow-hidden rounded-full">
              <span className="w-[58%] bg-[#366647]" />
              <span className="w-[18%] bg-[#815123]" />
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <p className="flex justify-between">
                <span>Bride side</span>
                <strong>92 confirmed</strong>
              </p>
              <p className="flex justify-between">
                <span>Groom side</span>
                <strong>92 confirmed</strong>
              </p>
              <p className="text-muted-foreground flex justify-between">
                <span>Pending follow-up</span>
                <span>56 households</span>
              </p>
            </div>
          </DashboardMetric>
          <DashboardMetric
            eyebrow="Consolidated budget"
            footer="Next advance · 10 Dec"
            title="₹49,85,000 committed"
          >
            {[
              ["Decor & production", "80%"],
              ["Hospitality & rooms", "66%"],
              ["Artistes, sound & light", "48%"],
            ].map(([label, width], index) => (
              <div key={label}>
                <p className="text-muted-foreground mb-1 flex justify-between text-[10px]">
                  <span>{label}</span>
                  <span>{width}</span>
                </p>
                <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-full",
                      index === 0
                        ? "w-4/5 bg-[#815123]"
                        : index === 1
                          ? "w-2/3 bg-[#566254]"
                          : "w-1/2 bg-[#366647]",
                    )}
                  />
                </div>
              </div>
            ))}
          </DashboardMetric>
        </div>

        <div className="bg-muted/70 flex flex-wrap items-center gap-2 rounded-lg border p-4">
          <span className="text-muted-foreground mr-1 text-[10px] font-semibold uppercase">
            Ceremonies
          </span>
          {[
            "16 Dec · Mehendi",
            "17 Dec · Haldi",
            "17 Dec · Sangeet",
            "18 Dec · Pheras",
          ].map((event, index) => (
            <span
              className={cn(
                "bg-card rounded border px-3 py-1 text-[11px]",
                index === 2 && "border-[#815123] bg-[#ffdcc1]",
              )}
              key={event}
            >
              {event}
            </span>
          ))}
          <span className="ml-auto text-[11px] font-semibold text-[#815123]">
            ● 18 photos awaiting review
          </span>
        </div>
      </div>
    </div>
  );
}

function DashboardMetric({
  children,
  eyebrow,
  footer,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  footer: string;
  title: string;
}) {
  return (
    <article className="bg-background flex min-h-64 flex-col rounded-lg border p-5">
      <p className="text-muted-foreground border-b pb-3 text-[10px] font-semibold tracking-wider uppercase">
        {eyebrow}
      </p>
      <p className="mt-3 text-base font-semibold">{title}</p>
      <div className="mt-4 flex-1 space-y-2">{children}</div>
      <p className="text-muted-foreground mt-4 border-t pt-3 text-[11px]">
        {footer}
      </p>
    </article>
  );
}

export function LandingContent() {
  return (
    <main>
      <section className="relative overflow-hidden px-5 pt-12 pb-24 lg:px-12">
        <div className="absolute -top-32 right-1/4 size-96 rounded-full bg-[#815123]/5 blur-3xl" />
        <div className="absolute top-1/3 -left-20 size-80 rounded-full bg-[#d7e3d2]/40 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="bg-muted/80 border-border/40 mb-8 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5">
            <span className="size-2 rounded-full bg-[#815123]" />
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">
              Wedding planning workspace for professionals
            </span>
          </div>
          <h1 className="font-display max-w-4xl text-5xl leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            Every wedding.
            <br />
            <em className="font-normal text-[#815123]">
              Beautifully orchestrated.
            </em>
          </h1>
          <p className="text-muted-foreground mt-7 max-w-2xl text-base leading-8 sm:text-lg">
            Plan events, vendors, budgets, guests, RSVPs, websites, and memories
            from one calm workspace built for luxury Indian wedding planners
            managing multi-day productions.
          </p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              className={cn(buttonVariants({ size: "large" }), "px-8")}
              href="/signup"
            >
              Start planning
            </Link>
            <Link
              className={cn(
                buttonVariants({ size: "large", variant: "secondary" }),
                "gap-2 px-7",
              )}
              href="#features"
            >
              See how it works <ArrowDown size={16} />
            </Link>
          </div>
          <p className="text-muted-foreground mt-5 mb-14 text-xs">
            Built for planners managing complex, multi-event destination
            celebrations.
          </p>
          <DashboardPreview />
        </div>
      </section>

      <section className="bg-muted/70 border-y px-5 py-6">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] font-semibold tracking-[0.12em] uppercase">
          {ribbonItems.map((item, index) => (
            <div className="flex items-center gap-7" key={item}>
              <span>{item}</span>
              {index < ribbonItems.length - 1 && (
                <span className="text-[8px] text-[#815123]">◆</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 lg:px-12" id="planners">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            description="Replace scattered spreadsheets, payment notes, guest lists, vendor documents, and WhatsApp follow-ups with one organized workspace built for the scale of Indian celebrations."
            eyebrow="The paradigm shift"
            title="Indian weddings are complex. Your workspace should not be."
          />
          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            <article className="bg-muted/70 rounded-xl border p-7 sm:p-8">
              <p className="text-xs font-bold tracking-wider text-red-700 uppercase">
                Current reality
              </p>
              <h3 className="font-display mt-5 text-3xl">
                The fragmented chaos
              </h3>
              <p className="text-muted-foreground mt-3 leading-7">
                Critical details live across conflicting sheets, WhatsApp audio
                notes, buried invoices, and outdated room allocations.
              </p>
              <div className="mt-7 space-y-3">
                {[
                  ["Guestlist_FINAL_v6.xlsx", "Modified 3d ago"],
                  ["Baraat permissions group", "142 unread"],
                  ["Decor advance screenshot", "Unverified"],
                  ["Udaivilas rooming sheet", "Overbooked"],
                ].map(([item, status]) => (
                  <div
                    className="bg-card text-muted-foreground flex items-center justify-between gap-4 rounded-md border p-3.5 text-xs"
                    key={item}
                  >
                    <span>{item}</span>
                    <span className="shrink-0">{status}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="bg-card rounded-xl border border-[#815123]/40 p-7 shadow-sm sm:p-8">
              <p className="text-xs font-bold tracking-wider text-[#815123] uppercase">
                Make My Marriage
              </p>
              <h3 className="font-display mt-5 text-3xl">
                One calm operational truth
              </h3>
              <p className="text-muted-foreground mt-3 leading-7">
                A synchronized command center where schedules, vendor
                milestones, family budgets, and rooming exist in clear context.
              </p>
              <div className="bg-background mt-7 rounded-lg border p-4">
                <p className="border-b pb-3 text-sm font-semibold text-[#366647]">
                  ● Live event sync active
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    ["Vendor payments", "Tracked balances"],
                    ["Guest roster", "Instant RSVPs"],
                    ["Run-sheet alerts", "Locked milestones"],
                    ["Live streaming", "Private broadcast"],
                  ].map(([label, value]) => (
                    <div className="bg-muted rounded p-3" key={label}>
                      <p className="text-muted-foreground text-[10px]">
                        {label}
                      </p>
                      <p className="mt-1 text-xs font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-muted/65 px-5 py-24 lg:px-12" id="features">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            description="Engineered for the high velocity of Indian multi-day productions without visual clutter or spreadsheet fragility."
            eyebrow="Workspace capabilities"
            title="Everything behind an extraordinary wedding, in one place."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            {capabilities.map(
              ({ description, detail, eyebrow, icon: Icon, span, title }) => (
                <article
                  className={cn(
                    "bg-card flex min-w-0 flex-col rounded-xl border p-6 lg:p-8",
                    span,
                  )}
                  key={title}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                      {eyebrow}
                    </p>
                    <Icon className="text-[#815123]" size={20} />
                  </div>
                  <h3 className="font-display mt-5 text-2xl">{title}</h3>
                  <p className="text-muted-foreground mt-2 min-h-12 text-sm leading-6">
                    {description}
                  </p>
                  <div className="mt-6 flex-1">{detail}</div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            centered
            description="Built to guide the planner’s entire journey with structured serenity at every milestone."
            eyebrow="Operational continuum"
            title="One workflow, from the first brief to the final photograph."
          />
          <div className="mt-16 grid gap-4 md:grid-cols-5">
            {workflow.map(([title, description, label], index) => (
              <article
                className={cn(
                  "bg-muted/70 flex min-h-72 flex-col rounded-lg border p-5",
                  index === 4 && "bg-card border-[#815123]/40 shadow-sm",
                )}
                key={title}
              >
                <span
                  className={cn(
                    "bg-card flex size-8 items-center justify-center rounded-full text-xs font-bold",
                    index === 4 && "bg-[#815123] text-white",
                  )}
                >
                  0{index + 1}
                </span>
                <h3 className="font-display mt-7 text-xl">{title}</h3>
                <p className="text-muted-foreground mt-3 flex-1 text-xs leading-6">
                  {description}
                </p>
                <p className="mt-6 text-[10px] font-bold tracking-wider text-[#815123] uppercase">
                  {label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/65 px-5 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            description="The planner stays in command while the couple, elders, and guests collaborate through carefully bounded permissions."
            eyebrow="Governance matrix"
            title="Everyone involved. Everyone in the right place."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {roles.map(
              ({ description, icon: Icon, items, label, title }, index) => (
                <article
                  className={cn(
                    "bg-card rounded-xl border p-6",
                    index === 0 && "border-t-4 border-t-[#815123]",
                  )}
                  key={title}
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-muted flex size-9 items-center justify-center rounded text-[#815123]">
                      <Icon size={18} />
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
                      {label}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-2xl">{title}</h3>
                  <p className="text-muted-foreground mt-3 min-h-28 text-xs leading-6">
                    {description}
                  </p>
                  <ul className="mt-6 space-y-2 border-t pt-5 text-xs">
                    {items.map((item) => (
                      <li className="flex items-center gap-2" key={item}>
                        <Check className="text-[#366647]" size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="overflow-hidden px-5 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            description="Guests open a private link to view the itinerary, respond for their household, stream live, and share candid photos."
            eyebrow="Elevated hospitality"
            title="A premium guest experience, without another app to install."
          />
          <div className="hide-scrollbar mt-14 flex snap-x gap-5 overflow-x-auto pb-6">
            {guestScreens.map(({ body, detail, icon: Icon, label, title }) => (
              <article
                className="bg-card flex min-h-96 w-[285px] shrink-0 snap-center flex-col rounded-2xl border p-4 shadow-sm"
                key={label}
              >
                <div className="text-muted-foreground flex items-center justify-between text-[10px]">
                  <span>9:41</span>
                  <span>Private access</span>
                </div>
                <div className="bg-muted mt-5 flex flex-1 flex-col items-center justify-center rounded-xl p-6 text-center">
                  <Icon className="text-[#815123]" size={34} />
                  <h3 className="font-display mt-5 text-2xl">{title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#815123]">
                    {body}
                  </p>
                  <p className="text-muted-foreground mt-4 text-xs leading-6">
                    {detail}
                  </p>
                </div>
                <p className="mt-5 border-t pt-4 text-center text-[10px] font-bold tracking-wider text-[#815123] uppercase">
                  {label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/65 border-t px-5 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            description="Built for high-profile clients, business families, and destination celebrations where discretion is non-negotiable."
            eyebrow="Security & privacy"
            title="Your clients’ weddings stay in the right hands."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                ShieldCheck,
                "Role-based access",
                "Every collaborator sees only what their permission allows.",
              ],
              [
                LockKeyhole,
                "Isolated client vaults",
                "Each celebration is isolated inside the planner account.",
              ],
              [
                KeyRound,
                "Private tokenized links",
                "Personal RSVP and rooming details use unguessable links.",
              ],
              [
                ReceiptIndianRupee,
                "Protected ledger records",
                "Contracts, receipts, and private media remain shielded.",
              ],
            ].map(([Icon, title, description]) => {
              const CardIcon = Icon as typeof ShieldCheck;
              return (
                <article
                  className="bg-card rounded-lg border p-6"
                  key={title as string}
                >
                  <span className="bg-muted flex size-10 items-center justify-center rounded text-[#815123]">
                    <CardIcon size={20} />
                  </span>
                  <h3 className="mt-5 font-semibold">{title as string}</h3>
                  <p className="text-muted-foreground mt-3 text-xs leading-6">
                    {description as string}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            centered
            description="Generic tools assume a five-hour reception. Indian weddings are multi-day productions with hundreds of stakeholder dependencies."
            eyebrow="Why generic project software fails"
            title="Designed around the way planners actually work."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              [
                CalendarClock,
                "Multi-event architecture",
                "Independent itineraries for Mehendi, Haldi, Sangeet, Baraat, Pheras, and Reception.",
              ],
              [
                ReceiptIndianRupee,
                "Bride vs. Groom ledgers",
                "Separate Bride, Groom, and shared pools with exportable balance sheets.",
              ],
              [
                Utensils,
                "Household-level RSVPs",
                "Joint arrivals, rooms, diets, and event attendance tracked as a family.",
              ],
            ].map(([Icon, title, description], index) => {
              const CardIcon = Icon as typeof CalendarClock;
              return (
                <article
                  className="bg-muted/70 rounded-xl border p-7"
                  key={title as string}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl text-[#815123]">
                      0{index + 1}
                    </span>
                    <CardIcon className="text-[#815123]" size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">
                    {title as string}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-6">
                    {description as string}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1b1c19] px-5 py-28 text-[#fbf9f4] lg:px-12">
        <div className="absolute -bottom-40 -left-32 size-96 rounded-full bg-[#815123]/25 blur-3xl" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#ffdcc1] uppercase">
            Elevate your planning practice
          </p>
          <h2 className="font-display mt-5 text-5xl leading-tight tracking-[-0.02em] sm:text-6xl">
            Run your next wedding from
            <br />
            <em className="font-normal text-[#ffdcc1]">one calm workspace.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#d6c3b6]">
            Bring events, people, money, communication, and memories together
            before the next client review.
          </p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              className="inline-flex h-13 items-center justify-center rounded bg-[#815123] px-9 text-sm font-semibold text-white transition-colors hover:bg-[#9d6939]"
              href="/signup"
            >
              Start planning
            </Link>
            <Link
              className="inline-flex h-13 items-center justify-center gap-2 rounded border border-white/20 bg-white/5 px-8 text-sm font-semibold transition-colors hover:bg-white/10"
              href="/login"
            >
              Sign in to studio <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-[#d6c3b6]">
            {[
              "No credit card required",
              "Indian wedding templates",
              "Setup in under 5 minutes",
            ].map((item) => (
              <span className="flex items-center gap-2" key={item}>
                <CheckCircle2 className="text-[#ffdcc1]" size={15} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-muted/70 border-t px-5 py-14 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl">Make My Marriage</p>
            <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-6">
              A professional workspace for planning complex Indian weddings with
              calm, clarity, and control.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {[
              ["Platform", ["Product", "Features", "For planners"]],
              ["Access", ["Sign in", "Start planning", "Dashboard"]],
              ["Company", ["Contact", "Privacy", "Terms"]],
            ].map(([heading, links]) => (
              <div key={heading as string}>
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  {heading as string}
                </p>
                <div className="mt-4 flex flex-col gap-3 text-xs">
                  {(links as string[]).map((link) => (
                    <span key={link}>{link}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-3 border-t pt-7 text-xs sm:flex-row">
          <span>© 2026 Make My Marriage. All rights reserved.</span>
          <span className="tracking-wider uppercase">
            Curated for modern celebrations
          </span>
        </div>
      </footer>
    </main>
  );
}
