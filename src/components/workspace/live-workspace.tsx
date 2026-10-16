"use client";

import { useState } from "react";

import { WorkspaceHeader } from "@/components/workspace/vendors-workspace";

const allowed = /^https?:\/\/(www\.)?(youtube\.com\/(watch|live)|youtu\.be\/)/;

export function LiveWorkspace() {
  const [draft, setDraft] = useState(
    "https://www.youtube.com/watch?v=parvati_shivam_live",
  );
  const [saved, setSaved] = useState(
    "https://www.youtube.com/watch?v=parvati_shivam_live",
  );
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState("");

  const embedId = youtubeId(saved);
  const showEmbed = visible && saved.length > 0 && Boolean(embedId);

  function save() {
    const value = draft.trim();
    if (!value) {
      setSaved("");
      setError("");
      return;
    }
    if (!allowed.test(value)) {
      setError(
        "Invalid YouTube URL format. Must be a valid youtube.com/watch, youtu.be, or youtube.com/live link.",
      );
      return;
    }
    setSaved(value);
    setError("");
  }

  return (
    <>
      <WorkspaceHeader
        description="Configure the YouTube broadcast and whether guests can see it on the wedding page."
        eyebrow="Publishing"
        title="Live stream"
      >
        <span />
      </WorkspaceHeader>

      <section className="mt-6 grid gap-4 xl:grid-cols-2">
        <form
          className="bg-card space-y-4 rounded-lg border p-5"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl">Primary broadcast</h2>
            <span className="rounded-full border border-[#815123]/30 px-3 py-1 text-[10px] font-bold text-[#815123] uppercase">
              {error ? "Needs a fix" : "Connected"}
            </span>
          </div>
          <label>
            <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
              YouTube stream URL
            </span>
            <input
              className="bg-background h-11 w-full rounded-md border px-3 text-sm"
              onChange={(event) => setDraft(event.target.value)}
              value={draft}
            />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
            <span>
              Guest portal visibility
              <span className="text-muted-foreground mt-1 block text-xs">
                {visible
                  ? "Stream widget active on the wedding page"
                  : "Stream widget hidden"}
              </span>
            </span>
            <input
              checked={visible}
              className="size-4"
              onChange={(event) => setVisible(event.target.checked)}
              type="checkbox"
            />
          </label>
          <p className="text-muted-foreground text-xs">
            An empty URL or visibility off hides the embed on every guest page.
          </p>
          <div className="flex gap-2">
            <button
              className="h-10 rounded-md border px-4 text-xs font-bold"
              onClick={() => {
                setDraft(saved);
                setError("");
              }}
              type="button"
            >
              Discard changes
            </button>
            <button
              className="h-10 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
              type="submit"
            >
              Save configuration
            </button>
          </div>
        </form>

        <article className="bg-card space-y-4 rounded-lg border p-5">
          <h2 className="font-display text-2xl">Validation</h2>
          {error ? (
            <p className="rounded-md border border-[#8c3b34]/30 bg-[#f8ecea] px-3 py-3 text-sm text-[#8c3b34]">
              {error}
            </p>
          ) : showEmbed ? (
            <iframe
              className="aspect-video w-full rounded-md border"
              src={`https://www.youtube.com/embed/${embedId}`}
              title="Live stream preview"
            />
          ) : (
            <p className="text-muted-foreground text-sm">
              The live block is hidden.
            </p>
          )}
          <p className="text-muted-foreground text-xs">
            If the primary link fails before Sangeet, guests would see the venue
            notice instead of a broken player.
          </p>
        </article>
      </section>
    </>
  );
}

function youtubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    if (parsed.pathname.startsWith("/live/")) {
      return parsed.pathname.split("/")[2] ?? "";
    }
    return parsed.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}
