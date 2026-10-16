"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { WorkspaceHeader } from "@/components/workspace/vendors-workspace";

const templates = [
  {
    id: "Editorial",
    title: "Editorial Minimalist",
    copy: "High-fashion publishing style with dramatic whitespace, serif headings, and high-contrast precision.",
    image: "/design/editorial.jpg",
    mark: "P & S",
  },
  {
    id: "Festive",
    title: "Festive Warmth",
    copy: "Warm terracotta undertones and structured multi-day celebration highlights suited for grand palace settings.",
    image: "/design/festive.jpg",
    mark: "Udaipur '25",
  },
  {
    id: "Minimal",
    title: "Pure Minimal",
    copy: "Stripped down to absolute essentials. Monochromatic discipline focusing purely on schedule and logistics.",
    image: "/design/minimal.jpg",
    mark: "Parvati",
  },
] as const;

const publicEvents = [
  "Mehendi",
  "Sangeet",
  "Wedding Ceremony",
  "Reception",
] as const;

export function WebsiteWorkspace() {
  const [template, setTemplate] =
    useState<(typeof templates)[number]["id"]>("Editorial");
  const [names, setNames] = useState("Parvati & Shivam");
  const [date, setDate] = useState("18 Dec 2026");
  const [city, setCity] = useState("Udaipur");
  const [story, setStory] = useState(
    "We are delighted to welcome our cherished family and closest friends to join us in the historic lakeside city of Udaipur as we celebrate three days of ceremonies, heritage feasts, and joyous festivities.",
  );
  const [savedSlug, setSavedSlug] = useState("parvati-shivam");
  const [slug, setSlug] = useState("parvati-shivam");
  const [events, setEvents] = useState<string[]>([...publicEvents]);
  const [published, setPublished] = useState(false);
  const [confirmSlug, setConfirmSlug] = useState(false);
  const [notice, setNotice] = useState("");

  function requestSave() {
    if (slug !== savedSlug) {
      setConfirmSlug(true);
      return;
    }
    setNotice("Website details saved.");
  }

  return (
    <>
      <WorkspaceHeader
        description="Configure the guest-facing page, story, and which events stay public."
        eyebrow="Publishing"
        title="Wedding website"
      >
        <a
          className="flex h-10 items-center rounded-md border px-4 text-xs font-bold"
          href="/w/parvati-shivam"
          rel="noreferrer"
          target="_blank"
        >
          Preview site
        </a>
        <button
          className="h-10 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
          onClick={() => {
            setPublished((current) => !current);
            setNotice(
              published
                ? "The site is unpublished. Visitors would see a short unpublished message."
                : "The site is published.",
            );
          }}
          type="button"
        >
          {published ? "Unpublish site" : "Publish site"}
        </button>
      </WorkspaceHeader>

      <section className="mt-6 rounded-lg border border-[#815123]/30 bg-[#f1e8df] p-4">
        <p className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
          Site status: {published ? "Published" : "Unpublished"}
        </p>
        <p className="mt-2 text-sm">
          {published
            ? `Guests can open /w/${savedSlug}.`
            : "When unpublished, visitors attempting to access the public page see a polite notice: this wedding website is not available yet."}
        </p>
      </section>
      {notice && (
        <p className="mt-4 rounded-md border px-4 py-3 text-xs">{notice}</p>
      )}

      <section className="mt-8">
        <h2 className="font-display text-2xl">Layout templates</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Select one active theme
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {templates.map((item) => (
            <button
              className={cn(
                "bg-card overflow-hidden rounded-lg border text-left",
                template === item.id && "border-[#815123]",
              )}
              key={item.id}
              onClick={() => setTemplate(item.id)}
              type="button"
            >
              <div className="relative h-36">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  src={item.image}
                />
                <span className="absolute bottom-3 left-3 rounded-sm bg-[#fbf9f4]/90 px-2 py-1 text-[10px] font-bold">
                  {item.mark}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
                  {template === item.id ? "Active" : "Template"} · {item.id}
                </p>
                <p className="font-display mt-2 text-xl">{item.title}</p>
                <p className="text-muted-foreground mt-2 text-xs">
                  {item.copy}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <form
        className="mt-8 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]"
        onSubmit={(event) => {
          event.preventDefault();
          requestSave();
        }}
      >
        <section className="bg-card space-y-4 rounded-lg border p-5">
          <h2 className="font-display text-2xl">Core portal configuration</h2>
          <Field label="Couple names" onChange={setNames} value={names} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Wedding date" onChange={setDate} value={date} />
            <Field label="Destination city" onChange={setCity} value={city} />
          </div>
          <label>
            <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
              Short love story
            </span>
            <textarea
              className="bg-background min-h-32 w-full rounded-md border p-3 text-sm"
              onChange={(event) => setStory(event.target.value)}
              value={story}
            />
          </label>
          <fieldset>
            <legend className="text-muted-foreground mb-2 text-[10px] font-bold tracking-wider uppercase">
              Public events
            </legend>
            <div className="flex flex-wrap gap-3">
              {publicEvents.map((item) => (
                <label className="flex items-center gap-2 text-xs" key={item}>
                  <input
                    checked={events.includes(item)}
                    onChange={() =>
                      setEvents((current) =>
                        current.includes(item)
                          ? current.filter((event) => event !== item)
                          : [...current, item],
                      )
                    }
                    type="checkbox"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="bg-card space-y-4 rounded-lg border p-5">
          <h2 className="font-display text-2xl">Cover and URL</h2>
          <div className="relative h-44 overflow-hidden rounded-md">
            <Image
              alt="Udaipur palace cover"
              className="object-cover"
              fill
              sizes="400px"
              src="/design/cover.jpg"
            />
          </div>
          <p className="text-sm font-bold">udaipur_palace_hero.jpg</p>
          <p className="text-muted-foreground text-xs">
            High-res master asset (2400×1600px, 3.4 MB)
          </p>
          <label>
            <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
              URL slug
            </span>
            <div className="flex overflow-hidden rounded-md border">
              <span className="bg-muted text-muted-foreground flex items-center px-3 text-xs">
                /w/
              </span>
              <input
                className="bg-background h-11 min-w-0 flex-1 px-3 text-sm"
                onChange={(event) => setSlug(event.target.value)}
                value={slug}
              />
            </div>
          </label>
          <p className="text-muted-foreground text-xs">
            Saved public URL: /w/{savedSlug}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className="h-10 rounded-md border px-4 text-xs font-bold"
              type="submit"
            >
              Save draft
            </button>
            <button
              className="h-10 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
              onClick={() => setPublished(true)}
              type="button"
            >
              Publish site
            </button>
          </div>
        </section>
      </form>

      {confirmSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
          <div
            aria-modal="true"
            className="bg-card w-full max-w-md rounded-lg border p-6"
            role="dialog"
          >
            <h2 className="font-display text-2xl">Change website URL?</h2>
            <p className="text-muted-foreground mt-3 text-sm">
              The public URL changes from /w/{savedSlug} to /w/{slug}. The
              previous URL stops working, including links already shared.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                className="h-10 rounded-md border px-4 text-xs font-bold"
                onClick={() => {
                  setSlug(savedSlug);
                  setConfirmSlug(false);
                }}
                type="button"
              >
                Keep current slug
              </button>
              <button
                className="h-10 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
                onClick={() => {
                  setSavedSlug(slug);
                  setConfirmSlug(false);
                  setNotice(`Public URL is now /w/${slug}.`);
                }}
                type="button"
              >
                Save new slug
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label>
      <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <input
        className="bg-background h-11 w-full rounded-md border px-3 text-sm"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}
