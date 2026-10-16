"use client";

import { useState } from "react";
import {
  Bus,
  CalendarDays,
  ExternalLink,
  MapPin,
  Navigation,
  Shirt,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const events = [
  {
    day: "16 Dec",
    shortDay: "Day 1",
    title: "Welcome Mehendi",
    time: "4:00 PM – 8:00 PM",
    venue: "The Promenade Lawn",
    address: "The Oberoi Udaivilas, Haridasji Ki Magri, Udaipur",
    attire: "Pastel festive · comfortable footwear",
    transfer: "Hotel lobby departures every 15 minutes from 3:30 PM",
    note: "An afternoon of henna, music and lakeside refreshments.",
    mapQuery: "The Oberoi Udaivilas Udaipur",
  },
  {
    day: "17 Dec",
    shortDay: "Day 2",
    title: "Sangeet · Royal Velvet Night",
    time: "7:00 PM – 11:30 PM",
    venue: "The Zenana Mahal, City Palace",
    address: "City Palace Complex, Old City, Udaipur",
    attire: "Royal velvet and jewel tones",
    transfer: "Boats depart Udaivilas jetty at 6:15 PM",
    note: "Dinner follows the performances. Please arrive before the palace gates close.",
    mapQuery: "Zenana Mahal City Palace Udaipur",
  },
  {
    day: "18 Dec",
    shortDay: "Day 3",
    title: "Vedic Vivah & Pheras",
    time: "5:00 PM – 9:30 PM",
    venue: "The Island Palace",
    address: "Jagmandir, Lake Pichola, Udaipur",
    attire: "Regal Indian",
    transfer: "Guest boats leave Bansi Ghat at 4:15 PM sharp",
    note: "The private live broadcast begins at 4:45 PM for guests joining remotely.",
    mapQuery: "Jagmandir Island Palace Udaipur",
  },
] as const;

export function WeddingEventTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const event = events[activeIndex];
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`;

  return (
    <div className="bg-card mt-10 overflow-hidden rounded-xl border">
      <div
        aria-label="Wedding event days"
        className="bg-muted/55 flex overflow-x-auto border-b px-2 sm:px-4"
        role="tablist"
      >
        {events.map((item, index) => {
          const selected = activeIndex === index;
          return (
            <button
              aria-controls={`event-panel-${index}`}
              aria-selected={selected}
              className={cn(
                "relative min-w-28 px-4 py-4 text-left transition-colors sm:min-w-40",
                selected
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              id={`event-tab-${index}`}
              key={item.day}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span className="block text-[9px] font-bold tracking-wider uppercase">
                {item.shortDay}
              </span>
              <span className="mt-1 block text-xs font-semibold">
                {item.day}
              </span>
              {selected && (
                <span className="absolute inset-x-4 bottom-0 h-0.5 bg-[#815123]" />
              )}
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`event-tab-${activeIndex}`}
        className="grid lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)]"
        id={`event-panel-${activeIndex}`}
        role="tabpanel"
      >
        <div className="p-5 sm:p-8">
          <p className="text-[9px] font-bold tracking-[0.14em] text-[#815123] uppercase">
            {event.day} · {event.time}
          </p>
          <h3 className="font-display mt-3 text-3xl sm:text-4xl">
            {event.title}
          </h3>
          <p className="text-muted-foreground mt-3 max-w-xl text-xs leading-6">
            {event.note}
          </p>

          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            <EventFact icon={MapPin} label="Venue" value={event.venue} />
            <EventFact icon={Shirt} label="Attire" value={event.attire} />
            <EventFact
              className="sm:col-span-2"
              icon={Bus}
              label="Guest transfer"
              value={event.transfer}
            />
          </dl>
        </div>

        <div className="border-t bg-[#e8e8df] p-4 lg:border-t-0 lg:border-l">
          <div className="relative flex min-h-72 overflow-hidden rounded-lg border bg-[#dfe3d9]">
            <div
              aria-hidden="true"
              className="absolute inset-0 [background-image:linear-gradient(28deg,transparent_45%,#b4bdac_46%,#b4bdac_49%,transparent_50%),linear-gradient(152deg,transparent_43%,#c8c1af_44%,#c8c1af_48%,transparent_49%),linear-gradient(90deg,transparent_48%,#f5f1e7_49%,#f5f1e7_53%,transparent_54%)] [background-size:150px_120px,190px_150px,110px_100px] opacity-60"
            />
            <div className="relative m-auto flex max-w-64 flex-col items-center p-5 text-center">
              <span className="flex size-12 items-center justify-center rounded-full border-4 border-white bg-[#815123] text-white shadow-md">
                <MapPin size={20} />
              </span>
              <div className="mt-3 rounded-md border bg-white/95 px-4 py-3 shadow-sm">
                <p className="text-xs font-bold">{event.venue}</p>
                <p className="text-muted-foreground mt-1 text-[10px] leading-4">
                  {event.address}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "bg-card gap-1.5 px-3 text-[11px]",
              )}
              href={mapHref}
              rel="noreferrer"
              target="_blank"
            >
              <Navigation size={13} /> Directions
            </a>
            <button
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "bg-card gap-1.5 px-3 text-[11px]",
              )}
              onClick={() => void navigator.clipboard?.writeText(event.address)}
              type="button"
            >
              <ExternalLink size={13} /> Copy address
            </button>
          </div>
        </div>
      </div>

      <div className="bg-muted/35 flex items-start gap-3 border-t px-5 py-4 sm:px-8">
        <CalendarDays className="mt-0.5 shrink-0 text-[#815123]" size={15} />
        <p className="text-muted-foreground text-[10px] leading-5">
          Times are shown in India Standard Time. Transport updates will appear
          here and in your private invitation.
        </p>
      </div>
    </div>
  );
}

function EventFact({
  className,
  icon: Icon,
  label,
  value,
}: {
  className?: string;
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className={cn("rounded-lg border p-4", className)}>
      <dt className="flex items-center gap-2 text-[9px] font-bold tracking-wider text-[#815123] uppercase">
        <Icon size={13} /> {label}
      </dt>
      <dd className="mt-2 text-xs leading-5 font-semibold">{value}</dd>
    </div>
  );
}
