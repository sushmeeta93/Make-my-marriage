import type { ReactNode } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CircleDollarSign,
  ClipboardCheck,
  Images,
  LayoutDashboard,
  Settings,
  Store,
  Users,
} from "lucide-react";

import { SiteLogo } from "@/components/site-logo";

const navigation = [
  { href: "/weddings", label: "Overview", icon: LayoutDashboard },
  { href: "/weddings", label: "Events", icon: CalendarDays },
  { href: "/weddings", label: "Tasks", icon: ClipboardCheck },
  { href: "/weddings", label: "Vendors", icon: Store },
  { href: "/weddings", label: "Budget", icon: CircleDollarSign },
  { href: "/weddings", label: "Guests", icon: Users },
  { href: "/weddings", label: "Gallery", icon: Images },
  { href: "/weddings", label: "Settings", icon: Settings },
] as const;

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      <aside className="bg-card fixed inset-y-0 left-0 hidden w-64 border-r p-5 lg:block">
        <SiteLogo />
        <div className="bg-background mt-8 rounded-lg border p-3">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
            Current wedding
          </p>
          <p className="mt-1 font-semibold">Aanya &amp; Rohan</p>
          <p className="text-muted-foreground text-sm">Udaipur · 18 Dec 2026</p>
        </div>
        <nav aria-label="Wedding workspace" className="mt-7 space-y-1">
          {navigation.map(({ href, icon: Icon, label }, index) => (
            <Link
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                index === 0
                  ? "bg-muted text-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              href={href}
              key={label}
            >
              <Icon aria-hidden="true" size={17} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="bg-card flex h-16 items-center justify-between border-b px-5 lg:px-8">
          <SiteLogo className="lg:hidden" />
          <p className="text-muted-foreground hidden text-sm lg:block">
            Wedding workspace
          </p>
          <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-sm font-semibold">
            SP
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
