"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  IndianRupee,
  Mail,
  MapPin,
  MoreHorizontal,
  Paperclip,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UploadCloud,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const vendors = [
  {
    id: "oberoi-udaivilas",
    name: "The Oberoi Udaivilas",
    place: "Haridas Ji Ki Magri, Udaipur",
    category: "Venue",
    contact: "Vikramaditya Singh",
    quote: "₹24.00L",
    status: "Booked",
    side: "Shared",
    milestone: "₹12.00L · 1 Dec",
    urgent: true,
  },
  {
    id: "royal-rasoi",
    name: "Royal Rasoi Catering",
    place: "Bhuwana, Udaipur",
    category: "Catering",
    contact: "Chef Arvind Mathur",
    quote: "₹7.20L",
    status: "Booked",
    side: "Groom",
    milestone: "₹1.95L · 20 Nov",
    urgent: true,
  },
  {
    id: "shaadi-squad",
    name: "Shaadi Squad Decor",
    place: "Ashok Nagar, Udaipur",
    category: "Decor",
    contact: "Neha Sethi",
    quote: "₹9.50L",
    status: "Booked",
    side: "Bride",
    milestone: "₹2.85L · 25 Nov",
    urgent: false,
  },
  {
    id: "studio-rivaaj",
    name: "Studio Rivaaj Photography",
    place: "Bandra West, Mumbai",
    category: "Photo & video",
    contact: "Kabir Malhotra",
    quote: "₹4.50L",
    status: "Booked",
    side: "Shared",
    milestone: "₹1.50L · Paid",
    urgent: false,
  },
  {
    id: "beats-rajasthan",
    name: "Beats of Rajasthan",
    place: "Shilpgram, Udaipur",
    category: "Entertainment",
    contact: "Bhopal Singh",
    quote: "₹3.20L",
    status: "Quoted",
    side: "Groom",
    milestone: "Awaiting booking",
    urgent: false,
  },
] as const;

export function VendorsWorkspace({ weddingId }: { weddingId: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [drawer, setDrawer] = useState(false);
  const filtered = useMemo(
    () =>
      vendors.filter(
        (vendor) =>
          (category === "All" || vendor.category === category) &&
          `${vendor.name} ${vendor.contact}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query],
  );

  return (
    <>
      <WorkspaceHeader
        description="Oversee suppliers, contracts and payment commitments across the full celebration."
        eyebrow="Partners & production"
        title="Vendors & contracts"
      >
        <button
          className="flex h-10 items-center gap-2 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
          onClick={() => setDrawer(true)}
          type="button"
        >
          <Plus size={14} /> Add vendor
        </button>
      </WorkspaceHeader>

      <section className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Kpi
          icon={Building2}
          label="Booked"
          note="2 quoted · 1 enquiry"
          value="14"
        />
        <Kpi
          icon={IndianRupee}
          label="Committed"
          note="Across 9 categories"
          value="₹49.85L"
        />
        <Kpi
          icon={WalletCards}
          label="Outstanding"
          note="24.9% of committed"
          value="₹12.40L"
        />
        <Kpi
          icon={CheckCircle2}
          label="Due soon"
          note="₹4.80L before 1 Dec"
          tone="warning"
          value="3"
        />
      </section>

      <section className="bg-card mt-5 overflow-hidden rounded-lg border">
        <div className="flex flex-col gap-3 border-b p-4 xl:flex-row xl:items-center">
          <label className="relative min-w-0 flex-1">
            <Search
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              size={15}
            />
            <input
              className="bg-background h-10 w-full rounded-md border pr-3 pl-9 text-xs"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search vendor or contact"
              value={query}
            />
          </label>
          <div className="flex gap-2 overflow-x-auto">
            <FilterSelect
              onChange={setCategory}
              options={[
                "All",
                "Venue",
                "Catering",
                "Decor",
                "Photo & video",
                "Entertainment",
              ]}
              value={category}
            />
            <FilterSelect
              options={["All statuses", "Booked", "Quoted", "Enquiry"]}
              value="All statuses"
            />
            <FilterSelect
              options={["All sides", "Bride", "Groom", "Shared"]}
              value="All sides"
            />
          </div>
        </div>

        <div className="bg-muted/45 text-muted-foreground hidden grid-cols-[minmax(13rem,1.2fr)_8rem_10rem_6rem_6rem_6rem_9rem_2rem] gap-3 border-b px-5 py-3 text-[9px] font-bold tracking-wider uppercase lg:grid">
          <span>Vendor</span>
          <span>Category</span>
          <span>Contact</span>
          <span>Quote</span>
          <span>Status</span>
          <span>Paying side</span>
          <span>Next milestone</span>
          <span />
        </div>
        {filtered.map((vendor) => (
          <article
            className="grid gap-4 border-b p-5 last:border-0 lg:grid-cols-[minmax(13rem,1.2fr)_8rem_10rem_6rem_6rem_6rem_9rem_2rem] lg:items-center"
            key={vendor.id}
          >
            <div>
              <Link
                className="text-sm font-bold hover:text-[#815123]"
                href={`/weddings/${weddingId}/vendors/${vendor.id}` as Route}
              >
                {vendor.name}
              </Link>
              <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-[10px]">
                <MapPin size={11} /> {vendor.place}
              </p>
            </div>
            <span className="bg-muted/55 w-fit rounded border px-2 py-1 text-[9px] font-bold">
              {vendor.category}
            </span>
            <p className="text-xs">{vendor.contact}</p>
            <p className="text-xs font-bold tabular-nums">{vendor.quote}</p>
            <StatusBadge status={vendor.status} />
            <p className="text-[10px] font-semibold">{vendor.side}</p>
            <p
              className={cn(
                "text-[10px]",
                vendor.urgent
                  ? "font-bold text-[#9a512f]"
                  : "text-muted-foreground",
              )}
            >
              {vendor.milestone}
            </p>
            <button
              aria-label={`Actions for ${vendor.name}`}
              className="text-muted-foreground"
              type="button"
            >
              <MoreHorizontal size={15} />
            </button>
          </article>
        ))}
        {!filtered.length && (
          <EmptyState
            description="Change your search or category filter to see more partners."
            title="No matching vendors"
          />
        )}
      </section>

      {drawer && <VendorDrawer onClose={() => setDrawer(false)} />}
    </>
  );
}

export function VendorDetailWorkspace({ weddingId }: { weddingId: string }) {
  const [tab, setTab] = useState<"milestones" | "contracts" | "overview">(
    "milestones",
  );
  const [drawer, setDrawer] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [paid, setPaid] = useState(false);

  return (
    <>
      <Link
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-xs font-semibold"
        href={`/weddings/${weddingId}/vendors` as Route}
      >
        <ArrowLeft size={13} /> Vendors ledger
      </Link>
      <div className="mt-6 flex flex-col justify-between gap-5 border-b pb-7 sm:flex-row sm:items-end">
        <div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="Booked" />
            <span className="bg-muted rounded border px-2 py-1 text-[9px] font-bold">
              Venue
            </span>
            <span className="rounded border border-[#366647]/20 bg-[#d7e3d2]/55 px-2 py-1 text-[9px] font-bold text-[#366647]">
              Google Places verified
            </span>
          </div>
          <h1 className="font-display mt-3 text-4xl sm:text-5xl">
            The Oberoi Udaivilas
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
            <MapPin size={14} /> Haridas Ji Ki Magri, Lake Pichola, Udaipur
          </p>
        </div>
        <button
          className="bg-card h-10 rounded-md border px-4 text-xs font-bold"
          onClick={() => setDrawer(true)}
          type="button"
        >
          Edit vendor
        </button>
      </div>

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          icon={IndianRupee}
          label="Contracted quote"
          note="GST inclusive"
          value="₹24.00L"
        />
        <Kpi
          icon={WalletCards}
          label="Paying allocation"
          note="Bride ₹12L · Groom ₹12L"
          value="Shared"
        />
        <Kpi
          icon={UserRound}
          label="Primary contact"
          note="+91 98290 11820"
          value="V. Singh"
        />
        <Kpi
          icon={Building2}
          label="Linked events"
          note="Sangeet · Reception"
          value="2"
        />
      </section>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b">
        {[
          ["overview", "Overview"],
          ["milestones", "Payment milestones"],
          ["contracts", "Contracts & files"],
        ].map(([value, label]) => (
          <button
            className={cn(
              "text-muted-foreground relative h-11 shrink-0 px-4 text-xs font-bold",
              tab === value && "text-[#815123]",
            )}
            key={value}
            onClick={() => setTab(value as typeof tab)}
            type="button"
          >
            {label}
            {tab === value && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#815123]" />
            )}
          </button>
        ))}
      </div>

      {tab === "milestones" && (
        <section className="mt-6 space-y-5">
          <div className="bg-card rounded-lg border p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
                  Disbursement balance
                </p>
                <h2 className="font-display mt-2 text-2xl">
                  ₹12.00L paid · ₹12.00L outstanding
                </h2>
              </div>
              <p className="text-xs font-bold text-[#366647]">50% settled</p>
            </div>
            <div className="bg-muted mt-5 h-2 overflow-hidden rounded-full">
              <div className="h-full w-1/2 bg-[#6f8f75]" />
            </div>
            <p className="text-muted-foreground mt-4 flex items-start gap-2 text-[10px] leading-5">
              <ShieldCheck
                className="mt-0.5 shrink-0 text-[#366647]"
                size={13}
              />
              Marking a milestone paid creates exactly one linked expense.
              Reverting it removes only that linked entry.
            </p>
          </div>
          <div className="bg-card overflow-hidden rounded-lg border">
            {[
              ["Booking advance & date lock", "15 Jul 2026", "₹6.00L", "Paid"],
              ["Second tranche & menu lock", "15 Sep 2026", "₹6.00L", "Paid"],
              [
                "Final venue settlement",
                "1 Dec 2026",
                "₹12.00L",
                paid ? "Paid" : "Unpaid",
              ],
            ].map(([label, date, amount, status], index) => (
              <div
                className="grid gap-3 border-b p-5 last:border-0 md:grid-cols-[minmax(14rem,1fr)_8rem_7rem_6rem_9rem] md:items-center"
                key={label}
              >
                <p className="text-xs font-bold">{label}</p>
                <p className="text-muted-foreground text-[10px]">{date}</p>
                <p className="text-xs font-bold tabular-nums">{amount}</p>
                <StatusBadge status={status} />
                {index === 2 ? (
                  <button
                    className="bg-card h-9 rounded-md border px-3 text-[10px] font-bold text-[#815123]"
                    onClick={() =>
                      paid ? setPaid(false) : setConfirmPaid(true)
                    }
                    type="button"
                  >
                    {paid ? "Mark unpaid" : "Mark paid"}
                  </button>
                ) : (
                  <span className="text-muted-foreground text-[9px]">
                    Expense linked
                  </span>
                )}
              </div>
            ))}
          </div>
          <button
            className="bg-card flex h-10 items-center gap-2 rounded-md border px-4 text-xs font-bold"
            onClick={() => setDrawer(true)}
            type="button"
          >
            <Plus size={13} /> Add milestone
          </button>
        </section>
      )}

      {tab === "contracts" && <ContractsPanel />}
      {tab === "overview" && (
        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <InfoPanel icon={UserRound} title="Contact">
            <p>Vikramaditya Singh · GM, Events & Banquets</p>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <Phone size={13} /> +91 98290 11820
            </p>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <Mail size={13} /> events.udaivilas@example.com
            </p>
          </InfoPanel>
          <InfoPanel icon={MapPin} title="Venue address">
            <p>Haridas Ji Ki Magri, Mulla Talai, Udaipur 313001</p>
            <a
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#815123]"
              href="https://maps.google.com"
              rel="noreferrer"
              target="_blank"
            >
              Open in Maps <ExternalLink size={12} />
            </a>
          </InfoPanel>
        </section>
      )}

      {drawer && <MilestoneDrawer onClose={() => setDrawer(false)} />}
      {confirmPaid && (
        <ConfirmDialog
          onCancel={() => setConfirmPaid(false)}
          onConfirm={() => {
            setPaid(true);
            setConfirmPaid(false);
          }}
        />
      )}
    </>
  );
}

function VendorDrawer({ onClose }: { onClose: () => void }) {
  const [placeQuery, setPlaceQuery] = useState("");
  return (
    <Drawer onClose={onClose} title="Add vendor partner">
      <div className="space-y-5">
        <div className="bg-muted/35 rounded-lg border p-4">
          <p className="flex items-center justify-between text-[9px] font-bold tracking-wider text-[#815123] uppercase">
            Google Places search{" "}
            <span className="text-[#366647]">API connected</span>
          </p>
          <label className="relative mt-3 block">
            <Search
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              size={14}
            />
            <input
              className="bg-card h-11 w-full rounded-md border pr-3 pl-9 text-sm"
              onChange={(event) => setPlaceQuery(event.target.value)}
              placeholder="Search business or venue"
              value={placeQuery}
            />
          </label>
          {placeQuery && (
            <button
              className="bg-card mt-2 w-full rounded-md border p-3 text-left"
              type="button"
            >
              <span className="block text-xs font-bold">
                The Oberoi Udaivilas, Udaipur
              </span>
              <span className="text-muted-foreground mt-1 block text-[10px]">
                Haridas Ji Ki Magri, Udaipur, Rajasthan
              </span>
            </button>
          )}
        </div>
        <Field label="Vendor / business name" value="" />
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Category"
            options={[
              "Venue",
              "Catering",
              "Decor",
              "Photo & video",
              "Entertainment",
              "Other",
            ]}
          />
          <SelectField
            label="Status"
            options={["Enquiry", "Quoted", "Booked", "Completed", "Cancelled"]}
          />
        </div>
        <Field label="Primary contact" value="" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Phone" type="tel" value="" />
          <Field label="Email" type="email" value="" />
        </div>
        <Field label="Agreed quote (INR)" value="" />
        <SelectField
          label="Paying side"
          options={["Bride", "Groom", "Shared"]}
        />
        <Field label="Address" value="" />
        <TextArea label="Internal notes" />
      </div>
    </Drawer>
  );
}

function MilestoneDrawer({ onClose }: { onClose: () => void }) {
  return (
    <Drawer onClose={onClose} title="Add payment milestone">
      <div className="space-y-5">
        <Field label="Milestone label" value="" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Amount (INR)" value="" />
          <Field label="Due date" type="date" value="2026-12-01" />
        </div>
        <SelectField label="Status" options={["Unpaid", "Paid"]} />
        <TextArea label="Internal accounting note" />
        <p className="rounded-md border border-[#366647]/20 bg-[#d7e3d2]/35 p-3 text-[10px] leading-5 text-[#366647]">
          Paid milestones create one linked expense automatically.
        </p>
      </div>
    </Drawer>
  );
}

function ContractsPanel() {
  return (
    <section className="bg-card mt-6 rounded-lg border p-5">
      <div className="rounded-lg border border-dashed p-8 text-center">
        <UploadCloud className="mx-auto text-[#815123]" size={23} />
        <p className="mt-3 text-xs font-bold">Drop contracts here</p>
        <p className="text-muted-foreground mt-1 text-[10px]">
          PDF or image · private workspace access
        </p>
      </div>
      <div className="mt-4 divide-y rounded-lg border">
        {[
          ["Udaivilas_Master_Agreement_Signed.pdf", "2.8 MB · Verified"],
          ["Zenana_Courtyard_Protocol.pdf", "1.1 MB · Verified"],
          ["Banquet_VIP_Rider_v2.pdf", "Uploading · 68%"],
          ["Annexure_C_F&B.pdf", "Upload failed · Retry"],
        ].map(([name, meta], index) => (
          <div className="flex items-center gap-3 p-4" key={name}>
            <FileText className="shrink-0 text-[#815123]" size={16} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold">{name}</p>
              <p
                className={cn(
                  "mt-1 text-[9px]",
                  index === 3 ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {meta}
              </p>
            </div>
            <button aria-label={`Download ${name}`} type="button">
              <Download size={14} />
            </button>
            <button
              aria-label={`Delete ${name}`}
              className="text-muted-foreground"
              type="button"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConfirmDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4">
      <section
        aria-modal="true"
        className="bg-card w-full max-w-md rounded-xl border p-6 shadow-xl"
        role="dialog"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-[#d7e3d2] text-[#366647]">
          <WalletCards size={18} />
        </span>
        <h2 className="font-display mt-5 text-2xl">Mark ₹12.00L as paid?</h2>
        <p className="text-muted-foreground mt-3 text-xs leading-6">
          This creates one linked expense for the final venue settlement.
          Repeating this action will not duplicate the expense.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="h-10 rounded-md border px-4 text-xs font-bold"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
            onClick={onConfirm}
            type="button"
          >
            Confirm payment
          </button>
        </div>
      </section>
    </div>
  );
}

export function WorkspaceHeader({
  children,
  description,
  eyebrow,
  title,
}: {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="flex flex-col justify-between gap-5 border-b pb-7 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl">{title}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          {description}
        </p>
      </div>
      {children}
    </header>
  );
}

export function Kpi({
  icon: Icon,
  label,
  note,
  tone,
  value,
}: {
  icon: typeof Building2;
  label: string;
  note: string;
  tone?: "warning";
  value: string;
}) {
  return (
    <article className="bg-card rounded-lg border p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
          {label}
        </p>
        <Icon className="text-[#815123]" size={16} />
      </div>
      <p
        className={cn(
          "font-display mt-5 text-2xl sm:text-3xl",
          tone === "warning" && "text-[#9a512f]",
        )}
      >
        {value}
      </p>
      <p className="text-muted-foreground mt-1 text-[10px]">{note}</p>
    </article>
  );
}

function StatusBadge({ status }: { status: string }) {
  const positive = status === "Booked" || status === "Paid";
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded border px-2 py-1 text-[9px] font-bold",
        positive
          ? "border-[#366647]/20 bg-[#d7e3d2]/55 text-[#366647]"
          : "border-[#b4782a]/20 bg-[#f3e6d2] text-[#8a5a20]",
      )}
    >
      {status}
    </span>
  );
}

function FilterSelect({
  onChange,
  options,
  value,
}: {
  onChange?: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="relative shrink-0">
      <select
        className="bg-card h-10 appearance-none rounded-md border pr-9 pl-3 text-xs font-semibold"
        onChange={(event) => onChange?.(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        size={12}
      />
    </label>
  );
}

function Drawer({
  children,
  onClose,
  title,
}: {
  children: ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25">
      <button
        aria-label="Close drawer"
        className="absolute inset-0"
        onClick={onClose}
        type="button"
      />
      <aside
        aria-modal="true"
        className="bg-card relative flex h-full w-full max-w-xl flex-col border-l shadow-xl"
        role="dialog"
      >
        <header className="flex items-center justify-between border-b p-5">
          <div>
            <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
              Partner operations
            </p>
            <h2 className="font-display mt-1 text-2xl">{title}</h2>
          </div>
          <button
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-md border"
            onClick={onClose}
            type="button"
          >
            <X size={16} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">{children}</div>
        <footer className="flex justify-end gap-2 border-t p-4">
          <button
            className="h-10 rounded-md border px-4 text-xs font-bold"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-md bg-[#815123] px-5 text-xs font-bold text-white"
            onClick={onClose}
            type="button"
          >
            Save changes
          </button>
        </footer>
      </aside>
    </div>
  );
}

export function Field({
  label,
  type = "text",
  value,
}: {
  label: string;
  type?: string;
  value: string;
}) {
  return (
    <label>
      <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <input
        className="bg-background h-11 w-full rounded-md border px-3 text-sm"
        defaultValue={value}
        type={type}
      />
    </label>
  );
}

export function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label>
      <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <select className="bg-background h-11 w-full rounded-md border px-3 text-sm">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function TextArea({ label }: { label: string }) {
  return (
    <label>
      <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <textarea className="bg-background min-h-28 w-full rounded-md border p-3 text-sm" />
    </label>
  );
}

function EmptyState({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="p-12 text-center">
      <Paperclip className="mx-auto text-[#815123]" size={24} />
      <h2 className="mt-4 text-sm font-bold">{title}</h2>
      <p className="text-muted-foreground mt-2 text-xs">{description}</p>
    </div>
  );
}

function InfoPanel({
  children,
  icon: Icon,
  title,
}: {
  children: ReactNode;
  icon: typeof MapPin;
  title: string;
}) {
  return (
    <article className="bg-card rounded-lg border p-6">
      <Icon className="text-[#815123]" size={18} />
      <h2 className="font-display mt-4 text-2xl">{title}</h2>
      <div className="mt-4 text-xs leading-6">{children}</div>
    </article>
  );
}
