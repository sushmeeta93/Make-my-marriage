"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { WorkspaceHeader } from "@/components/workspace/vendors-workspace";

type PhotoSet = {
  id: string;
  title: string;
  status: "Pending" | "Approved";
  by: string;
  when: string;
  meta: string;
  tag: string;
  images: string[];
};

const initialSets: PhotoSet[] = [
  {
    id: "mehendi",
    title: "Mehendi portraits (Bridal Suite)",
    status: "Pending",
    by: "Dr. Rajan Singhania",
    when: "Uploaded 2h ago",
    meta: "4 files · 18.4 MB",
    tag: "Guest upload",
    images: [
      "/design/mehendi-1.jpg",
      "/design/mehendi-2.jpg",
      "/design/mehendi-3.jpg",
      "/design/mehendi-4.jpg",
    ],
  },
  {
    id: "sangeet",
    title: "Sangeet stage & royal dance floor",
    status: "Pending",
    by: "Ananya Mehta",
    when: "Uploaded yesterday",
    meta: "6 files · 32.1 MB",
    tag: "Guest upload",
    images: [
      "/design/sangeet-1.jpg",
      "/design/sangeet-2.jpg",
      "/design/sangeet-3.jpg",
      "/design/sangeet-4.jpg",
      "/design/sangeet-5.jpg",
      "/design/sangeet-6.jpg",
    ],
  },
  {
    id: "couple",
    title: "Couple portrait at sunset (Jagmandir Island)",
    status: "Approved",
    by: "Pro capture",
    when: "Added 3h ago",
    meta: "1 file",
    tag: "Family view",
    images: ["/design/couple.jpg"],
  },
  {
    id: "welcome",
    title: "Traditional welcome & rose petal shower",
    status: "Approved",
    by: "Guest upload",
    when: "Added 5h ago",
    meta: "1 file",
    tag: "Family view",
    images: ["/design/welcome.jpg"],
  },
  {
    id: "banquet",
    title: "Royal banquet dinner setup",
    status: "Approved",
    by: "Pro capture",
    when: "Added yesterday",
    meta: "1 file",
    tag: "Public gallery",
    images: ["/design/banquet.jpg"],
  },
];

const galleryUrl = "https://makemymarriage.com/g/parvati-shivam-gallery";

export function GalleryWorkspace() {
  const [photos, setPhotos] = useState(initialSets);
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Approved" | "Family"
  >("All");
  const [notice, setNotice] = useState("");
  const visible = photos.filter((photo) => {
    if (filter === "Pending") return photo.status === "Pending";
    if (filter === "Approved") return photo.status === "Approved";
    if (filter === "Family") {
      return photo.status === "Approved" && photo.tag === "Family view";
    }
    return true;
  });
  const pending = photos.filter((photo) => photo.status === "Pending").length;
  const approved = photos.length - pending;
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(galleryUrl)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(galleryUrl);
    setNotice("Private gallery link copied.");
  }

  return (
    <>
      <WorkspaceHeader
        description="Review guest uploads before they appear in the private gallery."
        eyebrow="Publishing"
        title="Gallery"
      >
        <span />
      </WorkspaceHeader>

      <section className="bg-card mt-6 grid gap-5 rounded-lg border p-5 lg:grid-cols-[1fr_180px]">
        <div>
          <p className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
            Private guest gallery
          </p>
          <p className="mt-2 text-sm font-bold break-all">{galleryUrl}</p>
          <p className="text-muted-foreground mt-2 text-xs">
            Share this link or QR with guests. It opens the private gallery, not
            the public wedding page.
          </p>
          <button
            className="mt-4 h-10 rounded-md border px-4 text-xs font-bold"
            onClick={copyLink}
            type="button"
          >
            Copy link
          </button>
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="QR code for the private gallery"
            className="size-40 border bg-white"
            src={qr}
          />
          <p className="text-muted-foreground mt-2 text-[10px] font-bold tracking-wider uppercase">
            Scan to open
          </p>
        </div>
      </section>
      {notice && (
        <p className="mt-4 rounded-md border border-[#815123]/30 bg-[#f1e8df] px-4 py-3 text-xs">
          {notice}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {(
          [
            ["All", "All submissions"],
            ["Pending", `Pending review (${pending})`],
            ["Approved", `Approved (${approved})`],
            ["Family", "Family view"],
          ] as const
        ).map(([id, label]) => (
          <button
            className={cn(
              "h-10 rounded-md border px-4 text-xs font-bold",
              filter === id && "border-[#815123] text-[#815123]",
            )}
            key={id}
            onClick={() => setFilter(id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <section className="mt-5 space-y-4">
        {visible.map((photo) => (
          <article className="bg-card rounded-lg border p-4" key={photo.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
                  {photo.status === "Pending" ? "Pending review" : "Approved"}
                </p>
                <h2 className="font-display mt-1 text-xl">{photo.title}</h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  {photo.when} · {photo.by} · {photo.meta} · {photo.tag}
                </p>
              </div>
              {photo.status === "Pending" ? (
                <div className="flex gap-2">
                  <button
                    className="h-9 rounded-md bg-[#815123] px-3 text-[10px] font-bold text-white"
                    onClick={() => {
                      setPhotos((current) =>
                        current.map((item) =>
                          item.id === photo.id
                            ? { ...item, status: "Approved" }
                            : item,
                        ),
                      );
                      setNotice(`${photo.title} approved.`);
                    }}
                    type="button"
                  >
                    Approve
                  </button>
                  <button
                    className="h-9 rounded-md border px-3 text-[10px] font-bold text-[#8c3b34]"
                    onClick={() => {
                      setPhotos((current) =>
                        current.filter((item) => item.id !== photo.id),
                      );
                      setNotice(`${photo.title} rejected.`);
                    }}
                    type="button"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <button
                  className="h-9 rounded-md border px-3 text-[10px] font-bold"
                  onClick={() => {
                    setPhotos((current) =>
                      current.map((item) =>
                        item.id === photo.id
                          ? { ...item, status: "Pending" }
                          : item,
                      ),
                    );
                    setNotice(`${photo.title} hidden from the live gallery.`);
                  }}
                  type="button"
                >
                  Manage / hide
                </button>
              )}
            </div>
            <div
              className={cn(
                "mt-4 grid gap-2",
                photo.images.length > 1
                  ? "grid-cols-2 sm:grid-cols-4"
                  : "grid-cols-1",
              )}
            >
              {photo.images.map((src) => (
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-md"
                  key={src}
                >
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="240px"
                    src={src}
                  />
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
