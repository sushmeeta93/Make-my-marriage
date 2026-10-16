import type { Route } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bus,
  CalendarDays,
  Camera,
  CheckCircle2,
  GalleryHorizontalEnd,
  MapPin,
  Radio,
  ShieldCheck,
  Shirt,
  Users,
} from "lucide-react";

import { GuestShell } from "@/components/guest/guest-shell";
import { WeddingEventTabs } from "@/components/guest/wedding-event-tabs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PublicWeddingPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PublicWeddingPage({
  params,
}: PublicWeddingPageProps) {
  const { slug } = await params;
  const baseHref = `/w/${slug}` as Route;

  return (
    <GuestShell baseHref={baseHref} personalized>
      <section className="relative overflow-hidden px-5 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        <div className="absolute -top-28 right-0 size-80 rounded-full bg-[#815123]/6 blur-3xl" />
        <div className="absolute bottom-0 -left-32 size-80 rounded-full bg-[#d7e3d2]/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/65 px-3 py-1.5">
              <ShieldCheck className="text-[#366647]" size={13} />
              <span className="text-[9px] font-bold tracking-[0.13em] text-[#366647] uppercase">
                Private invitation verified
              </span>
            </div>
            <p className="mt-8 text-[10px] font-bold tracking-[0.2em] text-[#815123] uppercase">
              Your private invitation
            </p>
            <h1 className="font-display mt-3 max-w-2xl text-5xl leading-[1.05] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
              Welcome to the celebration
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-base leading-8">
              Everything you need for Parvati and Shivam’s wedding in
              Udaipur—your events, travel details, RSVP, live stream, and shared
              memories.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className={cn(buttonVariants({ size: "large" }), "gap-2 px-7")}
                href="#events"
              >
                View my events <ArrowRight size={15} />
              </Link>
              <Link
                className={cn(
                  buttonVariants({ size: "large", variant: "secondary" }),
                  "bg-card px-7",
                )}
                href="#rsvp"
              >
                Update RSVP
              </Link>
            </div>
            <p className="text-muted-foreground mt-7 flex items-center gap-2 text-xs">
              <Users className="text-[#815123]" size={15} />
              Welcome, Dr. Rajan Singhania · Party of 4
            </p>
          </div>

          <article className="bg-card border-border/60 overflow-hidden rounded-xl border shadow-[0_28px_80px_-48px_rgba(27,28,25,0.4)]">
            <div className="bg-muted/70 border-b px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
                  Tomorrow evening
                </p>
                <span className="bg-[#d7e3d2] px-2 py-1 text-[9px] font-bold text-[#366647]">
                  4 attending
                </span>
              </div>
              <h2 className="font-display mt-3 text-3xl">
                Sangeet · Royal Velvet Night
              </h2>
              <p className="text-muted-foreground mt-2 text-xs">
                17 December · 7:00 PM
              </p>
            </div>
            <div className="space-y-3 p-5">
              <EventDetail
                icon={MapPin}
                label="Venue"
                value="The Zenana Mahal, City Palace"
              />
              <EventDetail
                icon={Shirt}
                label="Attire"
                value="Royal velvet and jewel tones"
              />
              <EventDetail
                icon={Bus}
                label="Transfer"
                value="Boats depart Udaivilas jetty at 6:15 PM"
              />
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "bg-card text-xs",
                  )}
                  href="#events"
                >
                  View details
                </Link>
                <Link
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "bg-card gap-1.5 text-xs",
                  )}
                  href="https://maps.google.com"
                >
                  Open map <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-card border-y px-5 py-7 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            [CheckCircle2, "RSVP", "4 attending", "#rsvp"],
            [CalendarDays, "Schedule", "5 events", "#events"],
            [MapPin, "Travel", "Maps & transfers", "#events"],
            [Radio, "Watch live", "Pheras broadcast", "#live"],
            [Camera, "Share photos", "Private gallery", "#gallery"],
          ].map(([Icon, label, note, href], index) => {
            const ActionIcon = Icon as typeof CheckCircle2;
            return (
              <Link
                className={cn(
                  "hover:bg-muted rounded-lg border p-4 transition-colors",
                  index === 4 && "col-span-2 sm:col-span-1",
                )}
                href={href as Route}
                key={label as string}
              >
                <ActionIcon className="text-[#815123]" size={18} />
                <p className="mt-4 text-xs font-bold">{label as string}</p>
                <p className="text-muted-foreground mt-1 text-[10px]">
                  {note as string}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6" id="events">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            description="Your household is invited to each of these celebration moments."
            eyebrow="Your itinerary"
            title="Three days in the City of Lakes"
          />
          <WeddingEventTabs />
        </div>
      </section>

      <section className="bg-muted/65 border-y px-5 py-20 sm:px-6" id="rsvp">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)]">
          <div>
            <SectionHeading
              description="Your household response is saved. You can return through your private link to update it until 1 December."
              eyebrow="Household RSVP"
              title="We’re delighted you’ll be joining us"
            />
            <div className="bg-card mt-8 overflow-hidden rounded-xl border">
              {[
                ["Welcome Mehendi", "4 attending"],
                ["Sangeet Night", "4 attending"],
                ["Vedic Vivah & Pheras", "4 attending"],
              ].map(([event, status]) => (
                <div
                  className="flex items-center justify-between gap-4 border-b px-5 py-4 last:border-0"
                  key={event}
                >
                  <span className="text-xs font-semibold">{event}</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#366647]">
                    <CheckCircle2 size={13} />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <aside className="bg-card rounded-xl border p-6">
            <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
              Household details
            </p>
            <p className="font-display mt-4 text-2xl">Dr. Rajan Singhania</p>
            <p className="text-muted-foreground mt-2 text-xs">
              Party of 4 · 2 Jain meals
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Oberoi Udaivilas · Suite 204
            </p>
            <button
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "mt-7 w-full",
              )}
              type="button"
            >
              Update my response
            </button>
          </aside>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6" id="live">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            description="For loved ones celebrating from afar, the private broadcast will become available before the ceremony."
            eyebrow="Live ceremony"
            title="Join the pheras from anywhere"
          />
          <div className="bg-card mt-9 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <span className="bg-muted flex size-12 items-center justify-center rounded-full text-[#815123]">
              <Radio size={21} />
            </span>
            <h3 className="mt-5 text-sm font-bold">
              The live stream will appear here
            </h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-xs leading-6">
              The private broadcast opens at 4:45 PM on 18 December, shortly
              before the ceremony begins.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card border-y px-5 py-20 sm:px-6" id="gallery">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(22rem,1fr)]">
          <SectionHeading
            description="Share your candid moments directly from your phone. Photos appear after the couple and planner curate them."
            eyebrow="Shared memories"
            title="Help us remember every perspective"
          />
          <div className="bg-background rounded-xl border p-6">
            <div className="flex items-center gap-4">
              <span className="bg-muted flex size-12 items-center justify-center rounded-lg text-[#815123]">
                <GalleryHorizontalEnd size={21} />
              </span>
              <div>
                <h3 className="text-sm font-bold">Private guest gallery</h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  Approved memories and guest photo upload
                </p>
              </div>
            </div>
            <Link
              className={cn(buttonVariants(), "mt-6 w-full gap-2")}
              href={`/g/${slug}-gallery` as Route}
            >
              Open private gallery <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6">
        <div className="bg-muted/65 mx-auto flex max-w-6xl items-start gap-3 rounded-lg border p-4">
          <ShieldCheck className="mt-0.5 shrink-0 text-[#566254]" size={17} />
          <div>
            <p className="text-xs font-bold">Your household’s private link</p>
            <p className="text-muted-foreground mt-1 text-[10px] leading-5">
              This link is unique to your invitation. No account or app is
              required, and your personal response is not visible to other
              guests.
            </p>
          </div>
        </div>
      </section>
    </GuestShell>
  );
}

function EventDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-md border p-3">
      <Icon className="mt-0.5 shrink-0 text-[#815123]" size={15} />
      <div>
        <p className="text-muted-foreground text-[9px] font-semibold uppercase">
          {label}
        </p>
        <p className="mt-1 text-xs font-semibold">{value}</p>
      </div>
    </div>
  );
}

function SectionHeading({
  description,
  eyebrow,
  title,
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">
        {title}
      </h2>
      <p className="text-muted-foreground mt-4 text-sm leading-7">
        {description}
      </p>
    </div>
  );
}
