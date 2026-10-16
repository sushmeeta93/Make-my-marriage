"use client";

import { useMemo, useState } from "react";
import { Copy, MessageCircle, Plus, Search, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Kpi, WorkspaceHeader } from "@/components/workspace/vendors-workspace";

const events = ["Mehendi", "Sangeet", "Wedding", "Reception"] as const;

type EventName = (typeof events)[number];
type Reply = "pending" | "yes" | "no";
type Side = "Bride" | "Groom" | "Shared";
type Meal = "Unset" | "Veg" | "Jain" | "Non-veg" | "Mixed";

type Household = {
  id: string;
  name: string;
  phone: string;
  email: string;
  side: Side;
  partySize: number;
  meal: Meal;
  mealLabel: string;
  stay: boolean;
  stayNote: string;
  notes: string;
  token: string;
  suite: string;
  table: string;
  vip: boolean;
  replies: Record<EventName, Reply | "uninvited">;
};

const initialHouseholds: Household[] = [
  {
    id: "singhania",
    name: "Singhania household",
    phone: "+91 98290 11223",
    email: "",
    side: "Groom",
    partySize: 4,
    meal: "Veg",
    mealLabel: "Vegetarian",
    stay: true,
    stayNote: "Suite 204",
    notes: "Dr. Rajan Singhania and family.",
    token: "singhania-rsvp",
    suite: "Suite 204, Oberoi Udaivilas",
    table: "14",
    vip: true,
    replies: {
      Mehendi: "yes",
      Sangeet: "yes",
      Wedding: "yes",
      Reception: "yes",
    },
  },
  {
    id: "kapoor",
    name: "The Kapoor family",
    phone: "+91 98290 11224",
    email: "kapoor.family@example.com",
    side: "Bride",
    partySize: 4,
    meal: "Veg",
    mealLabel: "Vegetarian (2), Jain (2)",
    stay: true,
    stayNote: "Two rooms, 17–19 Dec",
    notes: "Dietary sync still pending.",
    token: "kapoor-rsvp",
    suite: "",
    table: "",
    vip: false,
    replies: {
      Mehendi: "uninvited",
      Sangeet: "yes",
      Wedding: "yes",
      Reception: "pending",
    },
  },
  {
    id: "sharma",
    name: "Sharma household",
    phone: "+91 98200 44110",
    email: "",
    side: "Groom",
    partySize: 6,
    meal: "Mixed",
    mealLabel: "Mixed (4), Vegan (2)",
    stay: false,
    stayNote: "",
    notes: "VIP family. Invitation not sent yet.",
    token: "sharma-rsvp",
    suite: "",
    table: "",
    vip: true,
    replies: {
      Mehendi: "pending",
      Sangeet: "pending",
      Wedding: "pending",
      Reception: "pending",
    },
  },
  {
    id: "iyer",
    name: "Iyer family",
    phone: "+91 94140 77889",
    email: "",
    side: "Bride",
    partySize: 2,
    meal: "Jain",
    mealLabel: "Jain",
    stay: false,
    stayNote: "",
    notes: "Declined travel from Chennai.",
    token: "iyer-rsvp",
    suite: "",
    table: "",
    vip: false,
    replies: {
      Mehendi: "uninvited",
      Sangeet: "uninvited",
      Wedding: "no",
      Reception: "uninvited",
    },
  },
  {
    id: "rathore",
    name: "Rathore contingent",
    phone: "+91 99280 33441",
    email: "",
    side: "Shared",
    partySize: 5,
    meal: "Unset",
    mealLabel: "Standard",
    stay: false,
    stayNote: "",
    notes: "",
    token: "rathore-rsvp",
    suite: "",
    table: "",
    vip: false,
    replies: {
      Mehendi: "uninvited",
      Sangeet: "yes",
      Wedding: "uninvited",
      Reception: "yes",
    },
  },
  {
    id: "mehta",
    name: "Mehta & Associates",
    phone: "+91 97822 55667",
    email: "",
    side: "Bride",
    partySize: 3,
    meal: "Veg",
    mealLabel: "Vegetarian",
    stay: false,
    stayNote: "",
    notes: "",
    token: "mehta-rsvp",
    suite: "",
    table: "8",
    vip: false,
    replies: {
      Mehendi: "yes",
      Sangeet: "yes",
      Wedding: "yes",
      Reception: "yes",
    },
  },
];

const invitationDefault =
  "Dear {guest}, Parvati & Shivam invite you to {events} in Udaipur. Please reply here: {link}";
const reminderDefault =
  "Dear {guest}, a gentle reminder to reply for {events}. Your private link: {link}";

export function GuestsWorkspace({ weddingId }: { weddingId: string }) {
  const [households, setHouseholds] = useState(initialHouseholds);
  const [query, setQuery] = useState("");
  const [side, setSide] = useState("All sides");
  const [eventName, setEventName] = useState("All events");
  const [reply, setReply] = useState("All replies");
  const [chip, setChip] = useState("All");
  const [tab, setTab] = useState<"list" | "messages">("list");
  const [drawer, setDrawer] = useState<"add" | "paste" | null>(null);
  const [editing, setEditing] = useState<Household | null>(null);
  const [viewing, setViewing] = useState<Household | null>(null);
  const [notice, setNotice] = useState("");
  const [invitation, setInvitation] = useState(invitationDefault);
  const [reminder, setReminder] = useState(reminderDefault);
  const [reminderIndex, setReminderIndex] = useState(0);

  const filtered = useMemo(
    () =>
      households.filter((household) => {
        const invited = invitedEvents(household);
        const status = replyStatus(household);
        const matchesQuery = `${household.name} ${household.phone}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesSide = side === "All sides" || household.side === side;
        const matchesEvent =
          eventName === "All events" ||
          invited.includes(eventName as EventName);
        const matchesReply =
          reply === "All replies" ||
          (reply === "No reply yet" && status === "pending") ||
          (reply === "Replied" && status === "replied") ||
          (reply === "Declined" && declined(household));
        const matchesChip =
          chip === "All" ||
          (chip === "VIP suites" && household.vip) ||
          (chip === "Confirmed" &&
            status === "replied" &&
            !declined(household)) ||
          (chip === "Pending" && status === "pending");
        return (
          matchesQuery &&
          matchesSide &&
          matchesEvent &&
          matchesReply &&
          matchesChip
        );
      }),
    [chip, eventName, households, query, reply, side],
  );

  const reminderQueue = filtered.filter(
    (household) => replyStatus(household) === "pending",
  );
  const currentReminder = reminderQueue[reminderIndex] ?? reminderQueue[0];

  function addHousehold(household: Household) {
    setHouseholds((current) => [household, ...current]);
    setDrawer(null);
    setNotice(`${household.name} added.`);
  }

  function pasteHouseholds(text: string) {
    const rows = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [name, phone = ""] = line.split(",").map((part) => part.trim());
        return blankHousehold(`pasted-${Date.now()}-${index}`, name, phone);
      })
      .filter((row) => row.name);
    setHouseholds((current) => [...rows, ...current]);
    setDrawer(null);
    setNotice(
      rows.length
        ? `${rows.length} households added on the bride side.`
        : "No names were found.",
    );
  }

  async function openWhatsApp(household: Household, template: string) {
    const message = fillTemplate(template, household, weddingId);
    const digits = household.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      await navigator.clipboard.writeText(message);
      setNotice("Phone cannot be used. Message copied.");
      return;
    }
    window.open(
      `https://wa.me/${digits}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function copyLink(household: Household) {
    await navigator.clipboard.writeText(rsvpLink(weddingId, household.token));
    setNotice(`RSVP link copied for ${household.name}.`);
  }

  return (
    <>
      <WorkspaceHeader
        description="Household invitations, replies, and the messages sent one guest at a time."
        eyebrow="Guests & collaboration"
        title="Guests & households"
      >
        <button
          className="h-10 rounded-md border px-4 text-xs font-bold"
          onClick={() => setDrawer("paste")}
          type="button"
        >
          Paste names
        </button>
        <button
          className="flex h-10 items-center gap-2 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
          onClick={() => setDrawer("add")}
          type="button"
        >
          <Plus size={14} /> Add household
        </button>
      </WorkspaceHeader>

      <section className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Kpi
          icon={Users}
          label="Households"
          note="On this wedding"
          value="86"
        />
        <Kpi
          icon={Users}
          label="Invited"
          note="Party size with events"
          value="214"
        />
        <Kpi
          icon={Users}
          label="Replied"
          note="Every invited event answered"
          value="61"
        />
        <Kpi
          icon={Users}
          label="Attending"
          note="Yes replies use party size"
          value="148"
        />
      </section>

      <div className="mt-5 flex gap-2">
        {(
          [
            ["list", "Households"],
            ["messages", "Invites & reminders"],
          ] as const
        ).map(([id, label]) => (
          <button
            className={cn(
              "h-10 rounded-md border px-4 text-xs font-bold",
              tab === id && "border-[#815123] bg-[#f1e8df] text-[#815123]",
            )}
            key={id}
            onClick={() => setTab(id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {notice && (
        <p className="mt-4 rounded-md border border-[#815123]/30 bg-[#f1e8df] px-4 py-3 text-xs">
          {notice}
        </p>
      )}

      {tab === "list" ? (
        <section className="bg-card mt-5 overflow-hidden rounded-lg border">
          <div className="flex flex-col gap-3 border-b p-4 xl:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search
                className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
                size={15}
              />
              <input
                className="bg-background h-10 w-full rounded-md border pr-3 pl-9 text-xs"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search household or phone"
                value={query}
              />
            </label>
            <div className="flex gap-2 overflow-x-auto">
              {["All", "VIP suites", "Confirmed", "Pending"].map((item) => (
                <button
                  className={cn(
                    "h-10 shrink-0 rounded-md border px-3 text-[10px] font-bold",
                    chip === item && "border-[#815123] text-[#815123]",
                  )}
                  key={item}
                  onClick={() => setChip(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <Filter
              onChange={setSide}
              options={["All sides", "Bride", "Groom", "Shared"]}
              value={side}
            />
            <Filter
              onChange={setEventName}
              options={["All events", ...events]}
              value={eventName}
            />
            <Filter
              onChange={setReply}
              options={["All replies", "No reply yet", "Replied", "Declined"]}
              value={reply}
            />
          </div>
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <h2 className="text-sm font-bold">No households in this view</h2>
              <p className="text-muted-foreground mt-2 text-xs">
                Change the filters or add a household.
              </p>
            </div>
          ) : (
            filtered.map((household) => (
              <article
                className="grid gap-3 border-b p-5 last:border-0 lg:grid-cols-[1.4fr_5rem_4rem_1fr_5rem_8rem_auto] lg:items-center"
                key={household.id}
              >
                <div>
                  <p className="text-sm font-bold">{household.name}</p>
                  <p className="text-muted-foreground mt-1 text-[10px]">
                    {household.phone || "No phone"}
                  </p>
                </div>
                <p className="text-xs">{household.side}</p>
                <p className="text-xs tabular-nums">{household.partySize}</p>
                <p className="text-[10px]">
                  {invitedEvents(household).join(" · ") || "No events"}
                </p>
                <p className="text-xs">{household.mealLabel}</p>
                <div>
                  <p className="text-[10px] font-semibold">
                    {summary(household)}
                  </p>
                  <p className="text-muted-foreground mt-1 text-[10px]">
                    {household.suite || "No suite"}
                    {household.table ? ` · Table ${household.table}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="h-9 rounded-md border px-3 text-[10px] font-bold"
                    onClick={() => setViewing(household)}
                    type="button"
                  >
                    View
                  </button>
                  <button
                    className="h-9 rounded-md border px-3 text-[10px] font-bold"
                    onClick={() => setEditing(household)}
                    type="button"
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      ) : (
        <section className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <TemplateCard
              label="Invitation"
              onChange={setInvitation}
              value={invitation}
            />
            <TemplateCard
              label="Reminder"
              onChange={setReminder}
              value={reminder}
            />
            <p className="text-muted-foreground text-xs">
              Placeholders: {"{guest}"}, {"{couple}"}, {"{link}"}, {"{events}"}.
              WhatsApp opens on this device. Nothing is sent from a server.
            </p>
          </div>
          <article className="bg-card rounded-lg border p-5">
            <p className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
              Reminder queue
            </p>
            <h2 className="font-display mt-2 text-2xl">
              12 households in this filter
            </h2>
            <p className="text-muted-foreground mt-2 text-xs">
              Bride side · no reply yet. This sample shows the next household
              one at a time.
            </p>
            {currentReminder ? (
              <div className="mt-5">
                <p className="text-sm font-bold">{currentReminder.name}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {currentReminder.phone || "No usable phone"} ·{" "}
                  {currentReminder.side}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    className="flex h-10 items-center gap-2 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
                    onClick={() => openWhatsApp(currentReminder, reminder)}
                    type="button"
                  >
                    <MessageCircle size={14} /> Open WhatsApp
                  </button>
                  <button
                    className="flex h-10 items-center gap-2 rounded-md border px-4 text-xs font-bold"
                    onClick={() => copyLink(currentReminder)}
                    type="button"
                  >
                    <Copy size={14} /> Copy RSVP link
                  </button>
                  <button
                    className="h-10 rounded-md border px-4 text-xs font-bold"
                    onClick={() =>
                      setReminderIndex(
                        (index) => (index + 1) % reminderQueue.length,
                      )
                    }
                    type="button"
                  >
                    Next household
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground mt-4 text-xs">
                Everyone in the current filter has replied.
              </p>
            )}
          </article>
        </section>
      )}

      {drawer === "add" && (
        <HouseholdDrawer
          onClose={() => setDrawer(null)}
          onSave={addHousehold}
        />
      )}
      {editing && (
        <HouseholdDrawer
          household={editing}
          onClose={() => setEditing(null)}
          onSave={(household) => {
            setHouseholds((current) =>
              current.map((item) =>
                item.id === household.id ? household : item,
              ),
            );
            setEditing(null);
            setNotice(`${household.name} updated.`);
          }}
        />
      )}
      {viewing && (
        <ActionSheet
          household={viewing}
          onAssign={(suite, table) => {
            setHouseholds((current) =>
              current.map((item) =>
                item.id === viewing.id ? { ...item, suite, table } : item,
              ),
            );
            setViewing((current) =>
              current ? { ...current, suite, table } : current,
            );
            setNotice(`Suite and table saved for ${viewing.name}.`);
          }}
          onClose={() => setViewing(null)}
          onCopy={() => copyLink(viewing)}
          onResend={() => openWhatsApp(viewing, invitation)}
          onWhatsApp={() => openWhatsApp(viewing, invitation)}
        />
      )}
      {drawer === "paste" && (
        <PasteDrawer onClose={() => setDrawer(null)} onSave={pasteHouseholds} />
      )}
    </>
  );
}

function HouseholdDrawer({
  household,
  onClose,
  onSave,
}: {
  household?: Household;
  onClose: () => void;
  onSave: (household: Household) => void;
}) {
  const [name, setName] = useState(household?.name ?? "");
  const [phone, setPhone] = useState(household?.phone ?? "");
  const [email, setEmail] = useState(household?.email ?? "");
  const [side, setSide] = useState<Side>(household?.side ?? "Bride");
  const [partySize, setPartySize] = useState(household?.partySize ?? 1);
  const [meal, setMeal] = useState<Meal>(household?.meal ?? "Unset");
  const [mealLabel, setMealLabel] = useState(household?.mealLabel ?? "");
  const [suite, setSuite] = useState(household?.suite ?? "");
  const [table, setTable] = useState(household?.table ?? "");
  const [stay, setStay] = useState(household?.stay ?? false);
  const [stayNote, setStayNote] = useState(household?.stayNote ?? "");
  const [notes, setNotes] = useState(household?.notes ?? "");
  const [selected, setSelected] = useState<EventName[]>(
    household ? invitedEvents(household) : ["Wedding"],
  );

  return (
    <Drawer
      onClose={onClose}
      title={household ? "Edit household" : "Add household"}
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const replies = Object.fromEntries(
            events.map((item) => [
              item,
              selected.includes(item) ? "pending" : "uninvited",
            ]),
          ) as Household["replies"];
          onSave({
            id: household?.id ?? `house-${Date.now()}`,
            name,
            phone,
            email,
            side,
            partySize: Math.max(1, partySize),
            meal,
            mealLabel: mealLabel || meal,
            stay,
            stayNote,
            notes,
            token: household?.token ?? `rsvp-${Date.now()}`,
            suite,
            table,
            vip: household?.vip ?? false,
            replies: household ? household.replies : replies,
          });
        }}
      >
        <TextInput label="Household name" onChange={setName} value={name} />
        <TextInput label="Phone" onChange={setPhone} value={phone} />
        <TextInput label="Email" onChange={setEmail} value={email} />
        <Filter
          onChange={(value) => setSide(value as Side)}
          options={["Bride", "Groom", "Shared"]}
          value={side}
        />
        <label>
          <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
            Party size
          </span>
          <input
            className="bg-background h-11 w-full rounded-md border px-3 text-sm"
            min={1}
            onChange={(event) => setPartySize(Number(event.target.value))}
            type="number"
            value={partySize}
          />
        </label>
        <Filter
          onChange={(value) => setMeal(value as Meal)}
          options={["Unset", "Veg", "Jain", "Non-veg", "Mixed"]}
          value={meal}
        />
        <fieldset>
          <legend className="text-muted-foreground mb-2 text-[10px] font-bold tracking-wider uppercase">
            Invited events
          </legend>
          <div className="flex flex-wrap gap-2">
            {events.map((item) => (
              <label className="flex items-center gap-2 text-xs" key={item}>
                <input
                  checked={selected.includes(item)}
                  onChange={() =>
                    setSelected((current) =>
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
        <label className="flex items-center gap-2 text-xs">
          <input
            checked={stay}
            onChange={(event) => setStay(event.target.checked)}
            type="checkbox"
          />
          Needs a stay
        </label>
        <TextInput
          label="Meal detail"
          onChange={setMealLabel}
          value={mealLabel}
        />
        <TextInput label="Suite" onChange={setSuite} value={suite} />
        <TextInput label="Table" onChange={setTable} value={table} />
        <TextInput label="Stay note" onChange={setStayNote} value={stayNote} />
        <label>
          <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
            Internal notes
          </span>
          <textarea
            className="bg-background min-h-24 w-full rounded-md border p-3 text-sm"
            onChange={(event) => setNotes(event.target.value)}
            value={notes}
          />
        </label>
        <p className="text-muted-foreground text-[10px]">
          Internal notes stay in this workspace and are never shown to guests.
        </p>
        <button
          className="h-10 rounded-md bg-[#815123] px-5 text-xs font-bold text-white"
          type="submit"
        >
          Save household
        </button>
      </form>
    </Drawer>
  );
}

function PasteDrawer({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (text: string) => void;
}) {
  const [text, setText] = useState("Mehta family, +91 98111 22001");
  return (
    <Drawer onClose={onClose} title="Paste names">
      <p className="text-muted-foreground text-xs">
        One household per line: Name, phone. New rows start on the bride side,
        with party size 1 and no events selected.
      </p>
      <textarea
        className="bg-background mt-4 min-h-40 w-full rounded-md border p-3 text-sm"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <button
        className="mt-4 h-10 rounded-md bg-[#815123] px-5 text-xs font-bold text-white"
        onClick={() => onSave(text)}
        type="button"
      >
        Add rows
      </button>
    </Drawer>
  );
}

function TemplateCard({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="bg-card block rounded-lg border p-5">
      <span className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
        {label}
      </span>
      <textarea
        className="bg-background mt-3 min-h-28 w-full rounded-md border p-3 text-sm"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}

function Drawer({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
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
        className="bg-card relative h-full w-full max-w-xl overflow-y-auto border-l p-5 shadow-xl sm:p-7"
        role="dialog"
      >
        <h2 className="font-display text-2xl">{title}</h2>
        <div className="mt-5">{children}</div>
      </aside>
    </div>
  );
}

function Filter({
  onChange,
  options,
  value,
}: {
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <select
      className="bg-background h-10 rounded-md border px-3 text-xs"
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

function TextInput({
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
        required={label === "Household name"}
        value={value}
      />
    </label>
  );
}

function ActionSheet({
  household,
  onAssign,
  onClose,
  onCopy,
  onResend,
  onWhatsApp,
}: {
  household: Household;
  onAssign: (suite: string, table: string) => void;
  onClose: () => void;
  onCopy: () => void;
  onResend: () => void;
  onWhatsApp: () => void;
}) {
  const [suite, setSuite] = useState(household.suite);
  const [table, setTable] = useState(household.table);
  return (
    <Drawer onClose={onClose} title={household.name}>
      <p className="text-muted-foreground text-xs">
        {household.partySize} guests · {household.mealLabel}
      </p>
      <p className="mt-3 text-xs">{household.notes || "No dietary notes."}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="h-10 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
          onClick={onWhatsApp}
          type="button"
        >
          Open WhatsApp
        </button>
        <button
          className="h-10 rounded-md border px-4 text-xs font-bold"
          onClick={onCopy}
          type="button"
        >
          Copy RSVP link
        </button>
        <button
          className="h-10 rounded-md border px-4 text-xs font-bold"
          onClick={onResend}
          type="button"
        >
          Resend invitation
        </button>
      </div>
      <div className="mt-5 space-y-3">
        <TextInput label="Suite" onChange={setSuite} value={suite} />
        <TextInput label="Table" onChange={setTable} value={table} />
        <button
          className="h-10 rounded-md border px-4 text-xs font-bold"
          onClick={() => onAssign(suite, table)}
          type="button"
        >
          Assign table and suite
        </button>
      </div>
    </Drawer>
  );
}

function blankHousehold(id: string, name: string, phone: string): Household {
  return {
    id,
    name,
    phone,
    email: "",
    side: "Bride",
    partySize: 1,
    meal: "Unset",
    mealLabel: "Unset",
    stay: false,
    suite: "",
    table: "",
    vip: false,
    stayNote: "",
    notes: "",
    token: id,
    replies: {
      Mehendi: "uninvited",
      Sangeet: "uninvited",
      Wedding: "uninvited",
      Reception: "uninvited",
    },
  };
}

function invitedEvents(household: Household) {
  return events.filter((event) => household.replies[event] !== "uninvited");
}

function declined(household: Household) {
  const invited = invitedEvents(household);
  return (
    invited.length > 0 &&
    invited.every((event) => household.replies[event] === "no")
  );
}

function replyStatus(household: Household) {
  const invited = invitedEvents(household).map(
    (event) => household.replies[event],
  );
  if (invited.length === 0 || invited.some((item) => item === "pending")) {
    return "pending";
  }
  return "replied";
}

function summary(household: Household) {
  const invited = invitedEvents(household);
  if (!invited.length) return "No events";
  const yes = invited.filter((event) => household.replies[event] === "yes");
  const no = invited.filter((event) => household.replies[event] === "no");
  if (yes.length === invited.length) return `${household.partySize} attending`;
  if (no.length === invited.length) return "Replied · not attending";
  if (invited.every((event) => household.replies[event] !== "pending")) {
    return `${yes.length ? household.partySize : 0} attending`;
  }
  return "No reply yet";
}

function rsvpLink(weddingId: string, token: string) {
  return `/w/${weddingId}/r/${token}`;
}

function fillTemplate(
  template: string,
  household: Household,
  weddingId: string,
) {
  return template
    .replaceAll("{guest}", household.name)
    .replaceAll("{couple}", "Parvati & Shivam")
    .replaceAll("{link}", rsvpLink(weddingId, household.token))
    .replaceAll(
      "{events}",
      invitedEvents(household).join(", ") || "the celebrations",
    );
}
