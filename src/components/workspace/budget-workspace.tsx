"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ChevronDown,
  IndianRupee,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";

import {
  Field,
  Kpi,
  SelectField,
  TextArea,
  WorkspaceHeader,
} from "@/components/workspace/vendors-workspace";
import { cn } from "@/lib/utils";

const budgetLines = [
  [
    "Venue & hospitality",
    "Shared",
    "₹28.00L",
    "₹24.00L",
    "₹4.00L",
    "The Oberoi Udaivilas",
    86,
  ],
  [
    "Decor & floral",
    "Bride",
    "₹9.00L",
    "₹9.50L",
    "−₹0.50L",
    "Shaadi Squad Decor",
    106,
  ],
  [
    "Catering",
    "Groom",
    "₹12.00L",
    "₹7.20L",
    "₹4.80L",
    "Royal Rasoi Catering",
    60,
  ],
  [
    "Photo & video",
    "Shared",
    "₹6.00L",
    "₹4.50L",
    "₹1.50L",
    "Studio Rivaaj",
    75,
  ],
  [
    "Music & entertainment",
    "Groom",
    "₹5.00L",
    "₹3.20L",
    "₹1.80L",
    "Beats of Rajasthan",
    64,
  ],
  [
    "Stay & travel",
    "Shared",
    "₹8.00L",
    "₹1.45L",
    "₹6.55L",
    "Multiple vendors",
    18,
  ],
] as const;

const expenses = [
  [
    "₹6.00L",
    "15 Sep 2026",
    "Shared",
    "Venue",
    "Second venue tranche",
    "Oberoi Udaivilas",
    "Milestone",
  ],
  [
    "₹2.85L",
    "25 Aug 2026",
    "Bride",
    "Decor",
    "Production advance",
    "Shaadi Squad Decor",
    "Milestone",
  ],
  [
    "₹1.50L",
    "14 Oct 2026",
    "Shared",
    "Photo & video",
    "Crew travel advance",
    "Studio Rivaaj",
    "Milestone",
  ],
  [
    "₹48,000",
    "12 Oct 2026",
    "Groom",
    "Travel",
    "Airport transfer deposit",
    "Mewar Cabs",
    "Manual",
  ],
] as const;

export function BudgetWorkspace() {
  const [tab, setTab] = useState<"budget" | "expenses">("budget");
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState<"budget" | "expense" | null>(null);
  const [side, setSide] = useState("All sides");
  const filteredExpenses = useMemo(
    () =>
      expenses.filter((expense) =>
        expense.join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <WorkspaceHeader
        description="A single financial ledger for planned allocations, actual spend and family-side accountability."
        eyebrow="Financial operations"
        title="Budget & expenses"
      >
        <div className="flex gap-2">
          <button
            className="bg-card h-10 rounded-md border px-3 text-xs font-bold"
            onClick={() => setDrawer("budget")}
            type="button"
          >
            Add budget line
          </button>
          <button
            className="flex h-10 items-center gap-2 rounded-md bg-[#815123] px-3 text-xs font-bold text-white"
            onClick={() => setDrawer("expense")}
            type="button"
          >
            <Plus size={13} /> Record expense
          </button>
        </div>
      </WorkspaceHeader>

      <section className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Kpi
          icon={WalletCards}
          label="Planned"
          note="Across 12 categories"
          value="₹72.40L"
        />
        <Kpi
          icon={IndianRupee}
          label="Spent to date"
          note="68.9% utilized"
          value="₹49.85L"
        />
        <Kpi
          icon={WalletCards}
          label="Remaining"
          note="31.1% buffer"
          value="₹22.55L"
        />
        <Kpi
          icon={AlertTriangle}
          label="Outstanding"
          note="Committed liabilities"
          tone="warning"
          value="₹12.40L"
        />
      </section>

      <section className="mt-5 grid gap-3 lg:grid-cols-3">
        <AllocationCard
          planned="₹23.40L"
          side="Bride side"
          spent="₹16.20L"
          width="69%"
        />
        <AllocationCard
          planned="₹21.00L"
          side="Groom side"
          spent="₹13.65L"
          width="65%"
        />
        <AllocationCard
          planned="₹28.00L"
          side="Shared account"
          spent="₹20.00L"
          width="71%"
        />
      </section>

      <section className="bg-card mt-6 overflow-hidden rounded-lg border">
        <div className="flex gap-1 overflow-x-auto border-b px-3">
          <Tab active={tab === "budget"} onClick={() => setTab("budget")}>
            Budget allocation lines
          </Tab>
          <Tab active={tab === "expenses"} onClick={() => setTab("expenses")}>
            Master expenses ledger
          </Tab>
        </div>

        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              size={14}
            />
            <input
              className="bg-background h-10 w-full rounded-md border pr-3 pl-9 text-xs"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${tab === "budget" ? "budget lines" : "expenses"}`}
              value={query}
            />
          </label>
          <SelectFilter
            onChange={setSide}
            options={["All sides", "Bride", "Groom", "Shared"]}
            value={side}
          />
          <SelectFilter
            options={["All categories", "Venue", "Catering", "Decor", "Travel"]}
            value="All categories"
          />
        </div>

        {tab === "budget" ? (
          <BudgetLedger side={side} />
        ) : (
          <ExpenseLedger expenses={filteredExpenses} />
        )}
      </section>

      {drawer === "budget" && <BudgetDrawer onClose={() => setDrawer(null)} />}
      {drawer === "expense" && (
        <ExpenseDrawer onClose={() => setDrawer(null)} />
      )}
    </>
  );
}

function BudgetLedger({ side }: { side: string }) {
  const rows = budgetLines.filter(
    (row) => side === "All sides" || row[1] === side,
  );
  return (
    <div>
      <div className="bg-muted/45 text-muted-foreground hidden grid-cols-[minmax(11rem,1fr)_6rem_7rem_7rem_7rem_minmax(9rem,0.8fr)_2rem] gap-3 border-b px-5 py-3 text-[9px] font-bold tracking-wider uppercase lg:grid">
        <span>Category</span>
        <span>Side</span>
        <span>Planned</span>
        <span>Spent</span>
        <span>Remaining</span>
        <span>Linked vendor</span>
        <span />
      </div>
      {rows.map(
        ([
          category,
          payingSide,
          planned,
          spent,
          remaining,
          vendor,
          progress,
        ]) => (
          <article
            className={cn(
              "grid gap-3 border-b p-5 last:border-0 lg:grid-cols-[minmax(11rem,1fr)_6rem_7rem_7rem_7rem_minmax(9rem,0.8fr)_2rem] lg:items-center",
              progress > 100 && "bg-[#fff7f2]",
            )}
            key={category}
          >
            <div>
              <p className="text-xs font-bold">{category}</p>
              <div className="bg-muted mt-2 h-1.5 w-32 max-w-full overflow-hidden rounded-full">
                <div
                  className={cn(
                    "h-full",
                    progress > 100 ? "bg-[#9a512f]" : "bg-[#6f8f75]",
                  )}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-[10px] font-semibold">{payingSide}</p>
            <Money>{planned}</Money>
            <Money>{spent}</Money>
            <Money warning={progress > 100}>{remaining}</Money>
            <p className="text-muted-foreground text-[10px]">{vendor}</p>
            <button aria-label={`Actions for ${category}`} type="button">
              <MoreHorizontal size={15} />
            </button>
            {progress > 100 && (
              <p className="flex items-center gap-1.5 text-[9px] font-bold text-[#9a512f] lg:col-span-7">
                <AlertTriangle size={11} /> Overspent by ₹50,000
              </p>
            )}
          </article>
        ),
      )}
    </div>
  );
}

function ExpenseLedger({
  expenses: rows,
}: {
  expenses: (typeof expenses)[number][];
}) {
  return (
    <div>
      <div className="bg-muted/45 text-muted-foreground hidden grid-cols-[7rem_8rem_6rem_7rem_minmax(12rem,1fr)_10rem_6rem_2rem] gap-3 border-b px-5 py-3 text-[9px] font-bold tracking-wider uppercase lg:grid">
        <span>Amount</span>
        <span>Date</span>
        <span>Side</span>
        <span>Category</span>
        <span>Note</span>
        <span>Vendor</span>
        <span>Source</span>
        <span />
      </div>
      {rows.map(([amount, date, side, category, note, vendor, source]) => (
        <article
          className="grid gap-3 border-b p-5 last:border-0 lg:grid-cols-[7rem_8rem_6rem_7rem_minmax(12rem,1fr)_10rem_6rem_2rem] lg:items-center"
          key={`${date}-${note}`}
        >
          <p className="text-sm font-bold tabular-nums">{amount}</p>
          <p className="text-muted-foreground text-[10px]">{date}</p>
          <p className="text-[10px] font-semibold">{side}</p>
          <p className="text-[10px]">{category}</p>
          <p className="text-xs">{note}</p>
          <p className="text-muted-foreground text-[10px]">{vendor}</p>
          <span
            className={cn(
              "w-fit rounded border px-2 py-1 text-[9px] font-bold",
              source === "Milestone"
                ? "border-[#366647]/20 bg-[#d7e3d2]/55 text-[#366647]"
                : "bg-muted text-muted-foreground",
            )}
          >
            {source}
          </span>
          <button aria-label={`Actions for ${note}`} type="button">
            <MoreHorizontal size={15} />
          </button>
        </article>
      ))}
    </div>
  );
}

function BudgetDrawer({ onClose }: { onClose: () => void }) {
  return (
    <LedgerDrawer onClose={onClose} title="Add budget allocation">
      <div className="space-y-5">
        <SelectField
          label="Category"
          options={[
            "Venue",
            "Catering",
            "Decor",
            "Photo & video",
            "Entertainment",
            "Stay & travel",
            "Other",
          ]}
        />
        <SelectField
          label="Paying side"
          options={["Bride", "Groom", "Shared"]}
        />
        <Field label="Planned amount (INR)" value="900000" />
        <SelectField
          label="Linked vendor (optional)"
          options={[
            "None",
            "The Oberoi Udaivilas",
            "Shaadi Squad Decor",
            "Royal Rasoi Catering",
          ]}
        />
        <TextArea label="Allocation notes" />
        <p className="flex gap-2 rounded-md border border-[#b4782a]/25 bg-[#fff7ed] p-3 text-[10px] leading-5 text-[#8a5a20]">
          <AlertTriangle className="mt-0.5 shrink-0" size={13} />
          Planned amount cannot be lower than ₹9.50L already spent in this
          category.
        </p>
      </div>
    </LedgerDrawer>
  );
}

function ExpenseDrawer({ onClose }: { onClose: () => void }) {
  return (
    <LedgerDrawer onClose={onClose} title="Record expense">
      <div className="space-y-5">
        <Field label="Amount (INR)" value="" />
        <Field label="Expense date" type="date" value="2026-10-16" />
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Paying side"
            options={["Bride", "Groom", "Shared"]}
          />
          <SelectField
            label="Category"
            options={["Venue", "Catering", "Decor", "Travel", "Other"]}
          />
        </div>
        <SelectField
          label="Vendor (optional)"
          options={[
            "None",
            "The Oberoi Udaivilas",
            "Shaadi Squad Decor",
            "Royal Rasoi Catering",
          ]}
        />
        <TextArea label="Expense note" />
        <p className="rounded-md border border-[#366647]/20 bg-[#d7e3d2]/35 p-3 text-[10px] leading-5 text-[#366647]">
          Vendor milestone payments appear automatically and cannot be
          duplicated as manual expenses.
        </p>
      </div>
    </LedgerDrawer>
  );
}

function LedgerDrawer({
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
        className="bg-card relative flex h-full w-full max-w-lg flex-col border-l shadow-xl"
        role="dialog"
      >
        <header className="flex items-center justify-between border-b p-5">
          <div>
            <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
              Financial ledger
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
        <footer className="flex items-center justify-between border-t p-4">
          <button
            className="text-destructive flex items-center gap-2 text-xs font-bold"
            type="button"
          >
            <Trash2 size={13} /> Delete
          </button>
          <div className="flex gap-2">
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
              Save entry
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}

function AllocationCard({
  planned,
  side,
  spent,
  width,
}: {
  planned: string;
  side: string;
  spent: string;
  width: string;
}) {
  return (
    <article className="bg-card rounded-lg border p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold">{side}</p>
        <span className="text-muted-foreground text-[9px]">
          Planned {planned}
        </span>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <p className="font-display text-2xl">{spent}</p>
        <p className="text-muted-foreground text-[9px]">spent</p>
      </div>
      <div className="bg-muted mt-3 h-1.5 overflow-hidden rounded-full">
        <div className="h-full bg-[#6f8f75]" style={{ width }} />
      </div>
    </article>
  );
}

function Tab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "text-muted-foreground relative h-12 shrink-0 px-4 text-xs font-bold",
        active && "text-[#815123]",
      )}
      onClick={onClick}
      type="button"
    >
      {children}
      {active && (
        <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#815123]" />
      )}
    </button>
  );
}

function SelectFilter({
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

function Money({
  children,
  warning = false,
}: {
  children: ReactNode;
  warning?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-xs font-bold tabular-nums",
        warning && "text-[#9a512f]",
      )}
    >
      {children}
    </p>
  );
}
