import type { Route } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  FileImage,
  GalleryHorizontalEnd,
  ImagePlus,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

import { GuestShell } from "@/components/guest/guest-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GalleryPageProps = {
  params: Promise<{ galleryToken: string }>;
};

export default async function GalleryPage({ params }: GalleryPageProps) {
  await params;

  return (
    <GuestShell
      active="gallery"
      baseHref={"/w/parvati-shivam" as Route}
      personalized
    >
      <section className="relative overflow-hidden px-5 pt-12 pb-16 sm:px-6 sm:pt-16">
        <div className="absolute -top-40 left-1/3 size-96 rounded-full bg-[#815123]/6 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <Link
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold"
            href="/w/parvati-shivam"
          >
            <ArrowLeft size={14} /> Return to wedding
          </Link>
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-white/65 px-3 py-1.5">
                <ShieldCheck className="text-[#366647]" size={13} />
                <span className="text-[9px] font-bold tracking-wider text-[#366647] uppercase">
                  Private guest gallery
                </span>
              </div>
              <h1 className="font-display mt-6 max-w-2xl text-5xl leading-tight tracking-[-0.025em] sm:text-6xl">
                Share your moments
              </h1>
              <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-7 sm:text-base">
                Add your favorite candid photos from the celebration. The couple
                and planner will curate each memory before it appears in the
                shared gallery.
              </p>
            </div>
            <div className="bg-card flex items-center gap-3 rounded-lg border px-4 py-3">
              <span className="bg-muted flex size-9 items-center justify-center rounded text-[#815123]">
                <GalleryHorizontalEnd size={17} />
              </span>
              <div>
                <p className="text-xs font-bold">Parvati &amp; Shivam</p>
                <p className="text-muted-foreground mt-0.5 text-[10px]">
                  16–18 December · Udaipur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card border-y px-5 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(20rem,0.78fr)_minmax(0,1.22fr)]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
              Guest photo drop
            </p>
            <h2 className="font-display mt-3 text-4xl">
              Add photos from your camera roll
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-7">
              Upload up to 10 JPEG, PNG, or WebP images. Each image can be up to
              10 MB. No account is required.
            </p>
            <div className="mt-7 space-y-3">
              {[
                "Your name is shown to the couple and planner",
                "Photos remain private until approved",
                "You can upload directly from your phone",
              ].map((item) => (
                <p
                  className="text-muted-foreground flex items-center gap-2 text-xs"
                  key={item}
                >
                  <CheckCircle2 className="text-[#366647]" size={14} />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <form className="bg-background rounded-xl border p-5 sm:p-7">
            <label className="block text-sm font-semibold" htmlFor="guest-name">
              Your name
              <input
                className="bg-card focus:border-ring focus:ring-ring/15 mt-2 h-12 w-full rounded-md border px-3.5 text-sm outline-none focus:ring-4"
                id="guest-name"
                name="guestName"
                placeholder="Dr. Rajan Singhania"
                type="text"
              />
            </label>
            <label
              className="mt-5 block text-sm font-semibold"
              htmlFor="photo-note"
            >
              A note for the couple{" "}
              <span className="text-muted-foreground text-[10px] font-normal">
                Optional
              </span>
              <textarea
                className="bg-card focus:border-ring focus:ring-ring/15 mt-2 min-h-24 w-full resize-y rounded-md border p-3.5 text-sm outline-none focus:ring-4"
                id="photo-note"
                name="note"
                placeholder="A short caption or memory…"
              />
            </label>

            <label
              className="hover:bg-muted/60 mt-5 flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors"
              htmlFor="photos"
            >
              <span className="bg-muted flex size-12 items-center justify-center rounded-full text-[#815123]">
                <UploadCloud size={21} />
              </span>
              <span className="mt-4 text-sm font-bold">Choose your photos</span>
              <span className="text-muted-foreground mt-2 text-xs">
                Tap to open your camera roll or drag images here
              </span>
              <span className="text-muted-foreground mt-1 text-[10px]">
                Up to 10 photos · 10 MB each
              </span>
              <input
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                id="photos"
                multiple
                name="photos"
                type="file"
              />
            </label>

            <button
              className={cn(
                buttonVariants({ size: "large" }),
                "mt-5 w-full gap-2",
              )}
              type="button"
            >
              <ImagePlus size={16} /> Submit photos for approval
            </button>
          </form>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
                Curated memories
              </p>
              <h2 className="font-display mt-3 text-4xl">
                Celebration gallery
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-xs leading-6">
              Approved photos from the couple, photographer, and guests will
              appear here throughout the celebration.
            </p>
          </div>

          <div className="bg-card mt-9 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <span className="bg-muted flex size-12 items-center justify-center rounded-full text-[#815123]">
              <Camera size={21} />
            </span>
            <h3 className="mt-5 text-sm font-bold">
              Memories will appear here as they are approved
            </h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-xs leading-6">
              Be among the first to share a favorite moment with Parvati and
              Shivam.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/65 border-t px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-start gap-3 rounded-lg">
          <FileImage className="mt-0.5 shrink-0 text-[#566254]" size={17} />
          <p className="text-muted-foreground text-[10px] leading-5">
            Uploaded photos remain private until the wedding planner or couple
            approves them. Please upload only photos you are comfortable sharing
            with the invited wedding community.
          </p>
        </div>
      </section>
    </GuestShell>
  );
}
