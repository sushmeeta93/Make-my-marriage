"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  CheckSquare2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  Globe2,
  ImageIcon,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Plus,
  Radio,
  Search,
  Settings,
  StoreIcon,
  UserRoundCog,
  Users,
  WalletCards,
  X,
} from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Planning",
    items: [
      { href: "/weddings", label: "Overview", icon: LayoutDashboard },
      { href: "/weddings?view=events", label: "Events", icon: CalendarDays },
      { href: "/weddings?view=tasks", label: "Tasks", icon: CheckSquare2 },
    ],
  },
  {
    label: "Partners & money",
    items: [
      { href: "/weddings?view=vendors", label: "Vendors", icon: StoreIcon },
      { href: "/weddings?view=budget", label: "Budget", icon: WalletCards },
    ],
  },
  {
    label: "Guests & collaboration",
    items: [
      { href: "/weddings?view=guests", label: "Guests", icon: Users },
      { href: "/weddings?view=people", label: "People", icon: UserRoundCog },
    ],
  },
  {
    label: "Publishing",
    items: [
      { href: "/weddings?view=website", label: "Website", icon: Globe2 },
      { href: "/weddings?view=live", label: "Live", icon: Radio },
      { href: "/weddings?view=gallery", label: "Gallery", icon: ImageIcon },
    ],
  },
] as const;

const weddings = [
  {
    name: "Parvati & Shivam",
    location: "Udaipur",
    date: "18 Dec 2026",
    role: "Owned by you",
  },
  {
    name: "Aanya & Rohan",
    location: "Jaipur",
    date: "08 Feb 2027",
    role: "Owned by you",
  },
  {
    name: "Meera & Arjun",
    location: "Goa",
    date: "21 Mar 2027",
    role: "Shared with you",
  },
] as const;

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <aside
        className={cn(
          "bg-card fixed inset-y-0 left-0 z-40 hidden border-r transition-[width] duration-200 lg:flex lg:flex-col",
          isCollapsed ? "w-20" : "w-72",
        )}
      >
        <div
          className={cn(
            "flex h-20 items-center border-b",
            isCollapsed ? "justify-center px-3" : "px-5",
          )}
        >
          <SiteLogo
            className={cn(
              "overflow-hidden transition-[width]",
              isCollapsed ? "w-10" : "w-56",
            )}
          />
        </div>

        <div className={cn("relative", isCollapsed ? "p-3" : "p-4")}>
          <WeddingSwitcher
            collapsed={isCollapsed}
            isOpen={isSwitcherOpen}
            onToggle={() => {
              setIsSwitcherOpen((open) => !open);
              setIsAccountOpen(false);
            }}
          />
        </div>

        <nav
          aria-label="Wedding workspace"
          className={cn(
            "min-h-0 flex-1 overflow-y-auto",
            isCollapsed ? "px-3" : "px-4",
          )}
        >
          {navigation.map((group, groupIndex) => (
            <div
              className={cn(
                groupIndex > 0 && !isCollapsed && "mt-5 border-t pt-5",
                groupIndex > 0 && isCollapsed && "mt-2",
              )}
              key={group.label}
            >
              {!isCollapsed && (
                <p className="text-muted-foreground mb-2 px-3 text-[9px] font-bold tracking-[0.14em] uppercase">
                  {group.label}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map(({ href, icon: Icon, label }) => {
                  const active = label === "Overview";
                  return (
                    <Link
                      aria-current={active ? "page" : undefined}
                      aria-label={isCollapsed ? label : undefined}
                      className={cn(
                        "group relative flex h-10 items-center rounded-md text-sm transition-colors",
                        isCollapsed
                          ? "justify-center"
                          : "gap-3 px-3 font-medium",
                        active
                          ? "bg-[#f1e8df] text-[#815123]"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      href={href}
                      key={label}
                      title={isCollapsed ? label : undefined}
                    >
                      {active && (
                        <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-[#815123]" />
                      )}
                      <Icon aria-hidden="true" size={17} />
                      {!isCollapsed && <span>{label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          <div className={cn(!isCollapsed && "mt-5 border-t pt-5")}>
            <Link
              aria-label={isCollapsed ? "Settings" : undefined}
              className={cn(
                "text-muted-foreground hover:bg-muted hover:text-foreground flex h-10 items-center rounded-md text-sm font-medium transition-colors",
                isCollapsed ? "justify-center" : "gap-3 px-3",
              )}
              href="/weddings?view=settings"
              title={isCollapsed ? "Settings" : undefined}
            >
              <Settings aria-hidden="true" size={17} />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </div>
        </nav>

        <div className={cn("relative border-t", isCollapsed ? "p-3" : "p-4")}>
          <AccountMenu
            collapsed={isCollapsed}
            isOpen={isAccountOpen}
            onToggle={() => {
              setIsAccountOpen((open) => !open);
              setIsSwitcherOpen(false);
            }}
          />
        </div>

        <button
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="bg-card text-muted-foreground hover:text-foreground absolute top-24 -right-3 flex size-7 items-center justify-center rounded-full border shadow-sm"
          onClick={() => {
            setIsCollapsed((collapsed) => !collapsed);
            setIsSwitcherOpen(false);
            setIsAccountOpen(false);
          }}
          type="button"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      <div
        className={cn(
          "transition-[padding] duration-200",
          isCollapsed ? "lg:pl-20" : "lg:pl-72",
        )}
      >
        <header className="bg-card sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 sm:px-6 lg:h-20 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-label="Open navigation"
              className="text-muted-foreground hover:text-foreground flex size-10 items-center justify-center lg:hidden"
              onClick={() => setIsMobileOpen(true)}
              type="button"
            >
              <Menu size={21} />
            </button>
            <SiteLogo className="w-44 sm:w-52 lg:hidden" />
            <div className="hidden min-w-0 items-center gap-2 text-xs lg:flex">
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="/weddings"
              >
                Weddings
              </Link>
              <ChevronRight
                aria-hidden="true"
                className="text-border"
                size={13}
              />
              <span className="text-muted-foreground">
                Parvati &amp; Shivam
              </span>
              <ChevronRight
                aria-hidden="true"
                className="text-border"
                size={13}
              />
              <span className="font-semibold">Overview</span>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Search"
              className="text-muted-foreground hover:bg-muted hover:text-foreground hidden size-10 items-center justify-center rounded-md sm:flex"
              type="button"
            >
              <Search size={18} />
            </button>
            <button
              aria-label="Help"
              className="text-muted-foreground hover:bg-muted hover:text-foreground hidden size-10 items-center justify-center rounded-md lg:flex"
              type="button"
            >
              <CircleHelp size={18} />
            </button>
            <button
              aria-label="Notifications, 2 unread"
              className="text-muted-foreground hover:bg-muted hover:text-foreground relative flex size-10 items-center justify-center rounded-md"
              type="button"
            >
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-[#815123]" />
            </button>
            <button
              aria-label="Open account menu"
              className="bg-primary text-primary-foreground ml-1 flex size-9 items-center justify-center rounded-full text-xs font-bold"
              type="button"
            >
              PS
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[100rem] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}

function WeddingSwitcher({
  collapsed,
  isOpen,
  onToggle,
}: {
  collapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [query, setQuery] = useState("");
  const filteredWeddings = useMemo(
    () =>
      weddings.filter((wedding) =>
        `${wedding.name} ${wedding.location}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <button
        aria-expanded={isOpen}
        className={cn(
          "hover:bg-muted flex w-full items-center rounded-lg border text-left transition-colors",
          collapsed ? "size-12 justify-center p-0" : "gap-3 p-3",
        )}
        onClick={onToggle}
        type="button"
      >
        <span className="font-display flex size-9 shrink-0 items-center justify-center rounded-md bg-[#f1e8df] text-sm font-bold text-[#815123]">
          P&S
        </span>
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">
                Parvati &amp; Shivam
              </span>
              <span className="text-muted-foreground mt-0.5 block truncate text-[10px]">
                Udaipur · 64 days to go
              </span>
            </span>
            <ChevronDown
              className={cn(
                "text-muted-foreground transition-transform",
                isOpen && "rotate-180",
              )}
              size={15}
            />
          </>
        )}
      </button>

      {isOpen && !collapsed && (
        <div className="bg-card absolute top-full right-4 left-4 z-50 mt-1 overflow-hidden rounded-lg border shadow-xl">
          <div className="border-b p-3">
            <label className="relative block">
              <Search
                className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
                size={15}
              />
              <input
                aria-label="Search weddings"
                className="bg-background focus:border-ring h-10 w-full rounded-md border pr-3 pl-9 text-xs outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search weddings"
                value={query}
              />
            </label>
          </div>
          <div className="max-h-64 overflow-y-auto p-2">
            {filteredWeddings.length ? (
              filteredWeddings.map((wedding, index) => (
                <button
                  className={cn(
                    "hover:bg-muted flex w-full items-center gap-3 rounded-md p-2.5 text-left",
                    index === 0 && "bg-muted/70",
                  )}
                  key={wedding.name}
                  onClick={onToggle}
                  type="button"
                >
                  <span className="bg-muted flex size-8 shrink-0 items-center justify-center rounded text-[10px] font-bold">
                    {wedding.name
                      .split(" ")
                      .filter((part) => part !== "&")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold">
                      {wedding.name}
                    </span>
                    <span className="text-muted-foreground mt-0.5 block truncate text-[9px]">
                      {wedding.location} · {wedding.date} · {wedding.role}
                    </span>
                  </span>
                  {index === 0 && (
                    <span className="size-1.5 rounded-full bg-[#366647]" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-7 text-center">
                <p className="text-sm font-semibold">No weddings found</p>
                <p className="text-muted-foreground mt-1 text-[10px]">
                  Try another couple name or city.
                </p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 border-t">
            <Link
              className="text-muted-foreground hover:bg-muted flex h-11 items-center justify-center text-[10px] font-semibold"
              href="/weddings"
              onClick={onToggle}
            >
              View all weddings
            </Link>
            <Link
              className="hover:bg-muted flex h-11 items-center justify-center gap-1.5 border-l text-[10px] font-semibold text-[#815123]"
              href="/weddings/new"
              onClick={onToggle}
            >
              <Plus size={13} /> Create wedding
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function AccountMenu({
  collapsed,
  isOpen,
  onToggle,
}: {
  collapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {isOpen && !collapsed && (
        <div className="bg-card absolute right-4 bottom-full left-4 z-50 mb-2 rounded-lg border p-2 shadow-xl">
          {[
            [CircleUserRound, "Account settings"],
            [MessageSquareText, "Help & support"],
          ].map(([Icon, label]) => {
            const MenuIcon = Icon as typeof CircleUserRound;
            return (
              <button
                className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-10 w-full items-center gap-3 rounded-md px-3 text-xs"
                key={label as string}
                type="button"
              >
                <MenuIcon size={15} />
                {label as string}
              </button>
            );
          })}
          <button
            className="text-muted-foreground hover:bg-muted hover:text-foreground mt-1 flex h-10 w-full items-center gap-3 border-t px-3 pt-1 text-xs"
            type="button"
          >
            Sign out
          </button>
        </div>
      )}
      <button
        aria-expanded={isOpen}
        className={cn(
          "hover:bg-muted flex w-full items-center rounded-lg text-left transition-colors",
          collapsed ? "justify-center p-1" : "gap-3 p-2",
        )}
        onClick={onToggle}
        type="button"
      >
        <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">
          PS
        </span>
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-bold">
                Priya Sharma
              </span>
              <span className="text-muted-foreground mt-0.5 block truncate text-[9px]">
                The Wedding Atelier
              </span>
            </span>
            <ChevronDown
              className={cn(
                "text-muted-foreground transition-transform",
                isOpen && "rotate-180",
              )}
              size={14}
            />
          </>
        )}
      </button>
    </>
  );
}

function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Close navigation"
        className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside
        aria-label="Mobile wedding workspace"
        className="bg-card relative flex h-full w-[min(88vw,22rem)] flex-col shadow-2xl"
      >
        <div className="flex h-20 items-center justify-between border-b px-5">
          <SiteLogo className="w-52" />
          <button
            aria-label="Close navigation"
            className="text-muted-foreground hover:text-foreground flex size-10 items-center justify-center"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <span className="font-display flex size-9 items-center justify-center rounded-md bg-[#f1e8df] text-xs font-bold text-[#815123]">
              P&S
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">
                Parvati &amp; Shivam
              </span>
              <span className="text-muted-foreground text-[10px]">
                Udaipur · 64 days to go
              </span>
            </span>
            <ChevronDown className="text-muted-foreground" size={15} />
          </div>
        </div>
        <nav
          aria-label="Wedding workspace"
          className="min-h-0 flex-1 overflow-y-auto px-4 pb-4"
        >
          {navigation.map((group, groupIndex) => (
            <div
              className={cn(groupIndex > 0 && "mt-4 border-t pt-4")}
              key={group.label}
            >
              <p className="text-muted-foreground mb-2 px-3 text-[9px] font-bold tracking-wider uppercase">
                {group.label}
              </p>
              {group.items.map(({ href, icon: Icon, label }) => (
                <Link
                  className={cn(
                    "text-muted-foreground flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium",
                    label === "Overview" && "bg-[#f1e8df] text-[#815123]",
                  )}
                  href={href}
                  key={label}
                  onClick={onClose}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            className="text-muted-foreground mt-4 flex h-11 items-center gap-3 border-t px-3 pt-4 text-sm font-medium"
            href="/weddings?view=settings"
            onClick={onClose}
          >
            <Settings size={17} /> Settings
          </Link>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 p-2">
            <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-xs font-bold">
              PS
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold">Priya Sharma</span>
              <span className="text-muted-foreground text-[9px]">
                The Wedding Atelier
              </span>
            </span>
          </div>
          <button
            className="text-muted-foreground hover:bg-muted mt-2 h-10 w-full rounded-md border text-xs font-semibold"
            type="button"
          >
            Sign out
          </button>
        </div>
      </aside>
    </div>
  );
}
