"use client";

import { useState, type ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  GalleryHorizontalEnd,
  Heart,
  Home,
  Menu,
  Radio,
  ShieldCheck,
  X,
} from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/utils";

type GuestSection = "events" | "gallery" | "home" | "live" | "rsvp";

const navigation = [
  { id: "home", label: "Home", icon: Home },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "rsvp", label: "RSVP", icon: Heart },
  { id: "live", label: "Live", icon: Radio },
  { id: "gallery", label: "Gallery", icon: GalleryHorizontalEnd },
] as const;

type GuestShellProps = {
  active?: GuestSection;
  baseHref?: Route;
  children: ReactNode;
  personalized?: boolean;
};

export function GuestShell({
  active = "home",
  baseHref = "/w/parvati-shivam" as Route,
  children,
  personalized = false,
}: GuestShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getHref = (section: GuestSection): Route => {
    if (section === "home") return baseHref;
    return `${baseHref}#${section}` as Route;
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-background/95 sticky top-0 z-40 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <Link
            aria-label="Parvati and Shivam wedding home"
            className="group flex min-w-0 items-center gap-3"
            href={baseHref}
          >
            <span className="font-display flex size-9 shrink-0 items-center justify-center rounded-md bg-[#f1e8df] text-sm font-bold text-[#815123]">
              P&S
            </span>
            <span className="min-w-0">
              <span className="font-display block truncate text-lg font-semibold sm:text-xl">
                Parvati &amp; Shivam
              </span>
              <span className="text-muted-foreground block truncate text-[9px] font-semibold tracking-[0.12em] uppercase">
                16–18 December · Udaipur
              </span>
            </span>
          </Link>

          <nav
            aria-label="Wedding sections"
            className="hidden items-center gap-1 md:flex"
          >
            {navigation.map(({ id, label }) => (
              <Link
                aria-current={active === id ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-xs font-semibold transition-colors",
                  active === id
                    ? "bg-[#f1e8df] text-[#815123]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                href={getHref(id)}
                key={id}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {personalized && (
              <span className="hidden items-center gap-1.5 rounded-full bg-[#d7e3d2] px-3 py-1.5 text-[9px] font-bold tracking-wide text-[#3e4a3d] uppercase sm:flex">
                <ShieldCheck size={12} />
                Private invite
              </span>
            )}
            <button
              aria-expanded={isMenuOpen}
              aria-label="Open wedding navigation"
              className="text-muted-foreground hover:text-foreground flex size-10 items-center justify-center md:hidden"
              onClick={() => setIsMenuOpen(true)}
              type="button"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="Close wedding navigation"
            className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
          <aside className="bg-card absolute inset-y-0 right-0 flex w-[min(86vw,21rem)] flex-col shadow-2xl">
            <div className="flex h-20 items-center justify-between border-b px-5">
              <div>
                <p className="font-display text-xl font-semibold">
                  Parvati &amp; Shivam
                </p>
                <p className="text-muted-foreground mt-0.5 text-[9px] tracking-wider uppercase">
                  Wedding concierge
                </p>
              </div>
              <button
                aria-label="Close wedding navigation"
                className="text-muted-foreground hover:text-foreground flex size-10 items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            {personalized && (
              <div className="border-b px-5 py-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-[#366647]">
                  <ShieldCheck size={14} />
                  Private invitation verified
                </p>
                <p className="text-muted-foreground mt-1 text-[10px]">
                  Dr. Rajan Singhania · Party of 4
                </p>
              </div>
            )}

            <nav
              aria-label="Mobile wedding sections"
              className="flex-1 space-y-1 p-4"
            >
              {navigation.map(({ icon: Icon, id, label }) => (
                <Link
                  aria-current={active === id ? "page" : undefined}
                  className={cn(
                    "flex h-12 items-center gap-3 rounded-md px-3 text-sm font-semibold",
                    active === id
                      ? "bg-[#f1e8df] text-[#815123]"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  href={getHref(id)}
                  key={id}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={17} />
                  {label}
                  <ChevronRight className="ml-auto" size={14} />
                </Link>
              ))}
            </nav>

            <div className="text-muted-foreground border-t p-5 text-[10px] leading-5">
              This private celebration is hosted with Make My Marriage. No app
              or account is required.
            </div>
          </aside>
        </div>
      )}

      <main>{children}</main>

      <footer className="bg-card border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <SiteLogo className="w-44 opacity-80" />
            <span className="text-border hidden sm:inline">|</span>
            <p className="text-muted-foreground hidden text-[10px] sm:block">
              A private digital concierge for modern celebrations.
            </p>
          </div>
          <div className="text-muted-foreground flex items-center gap-5 text-[10px]">
            <Link className="hover:text-foreground" href="#">
              Privacy
            </Link>
            <Link className="hover:text-foreground" href="#">
              Help
            </Link>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
