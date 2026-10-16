"use client";

import { useMemo, useState } from "react";
import { Copy, UserRoundCog } from "lucide-react";

import { cn } from "@/lib/utils";
import { Kpi, WorkspaceHeader } from "@/components/workspace/vendors-workspace";

type Role = "Lead planner" | "Couple collaborator" | "Family coordinator";

type Invite = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Pending" | "Accepted";
  token: string;
};

const roles: Role[] = [
  "Lead planner",
  "Couple collaborator",
  "Family coordinator",
];

const initialInvites: Invite[] = [
  {
    id: "priya",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "Lead planner",
    status: "Accepted",
    token: "invite-priya",
  },
  {
    id: "parvati",
    name: "Parvati Singhania",
    email: "parvati@example.com",
    role: "Couple collaborator",
    status: "Accepted",
    token: "invite-parvati",
  },
  {
    id: "ananya",
    name: "Ananya Kapoor",
    email: "ananya.kapoor@example.com",
    role: "Couple collaborator",
    status: "Pending",
    token: "invite-ananya",
  },
  {
    id: "vikram",
    name: "Vikram Sharma",
    email: "vikram.sharma@example.com",
    role: "Family coordinator",
    status: "Accepted",
    token: "invite-vikram",
  },
];

export function PeopleWorkspace({ weddingId }: { weddingId: string }) {
  const [invites, setInvites] = useState(initialInvites);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Couple collaborator");
  const [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const [managing, setManaging] = useState<Invite | null>(null);
  const pending = invites.filter((invite) => invite.status === "Pending");
  const visible = useMemo(
    () =>
      invites.filter((invite) => {
        if (filter === "Planners") return invite.role === "Lead planner";
        if (filter === "Couple") return invite.role === "Couple collaborator";
        if (filter === "Family") return invite.role === "Family coordinator";
        if (filter === "Pending") return invite.status === "Pending";
        return true;
      }),
    [filter, invites],
  );

  async function copyLink(invite: Invite) {
    await navigator.clipboard.writeText(
      `/invite/${invite.token}?wedding=${weddingId}`,
    );
    setNotice(`Invite link copied for ${invite.name}.`);
  }

  return (
    <>
      <WorkspaceHeader
        description="Invite the couple or family with a single-use link. Email delivery stays mocked in this workspace."
        eyebrow="Guests & collaboration"
        title="People"
      >
        <span />
      </WorkspaceHeader>

      <section className="mt-7 grid grid-cols-2 gap-3">
        <Kpi
          icon={UserRoundCog}
          label="Pending"
          note="Expires after 7 days"
          value={String(pending.length)}
        />
        <Kpi
          icon={UserRoundCog}
          label="Accepted"
          note="Couple and family"
          value={String(invites.length - pending.length)}
        />
      </section>

      {notice && (
        <p className="mt-4 rounded-md border border-[#815123]/30 bg-[#f1e8df] px-4 py-3 text-xs">
          {notice}
        </p>
      )}

      <section className="mt-5 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <form
          className="bg-card space-y-4 rounded-lg border p-5"
          onSubmit={(event) => {
            event.preventDefault();
            const invite: Invite = {
              id: `invite-${Date.now()}`,
              name,
              email,
              role,
              status: "Pending",
              token: `invite-${Date.now()}`,
            };
            setInvites((current) => [invite, ...current]);
            setName("");
            setEmail("");
            setNotice(
              `Invite prepared for ${invite.name}. Copy the link to share it.`,
            );
          }}
        >
          <h2 className="font-display text-2xl">Invite someone</h2>
          <label>
            <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
              Name
            </span>
            <input
              className="bg-background h-11 w-full rounded-md border px-3 text-sm"
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
          </label>
          <label>
            <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
              Email
            </span>
            <input
              className="bg-background h-11 w-full rounded-md border px-3 text-sm"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
              Role
            </span>
            <select
              className="bg-background h-11 w-full rounded-md border px-3 text-sm"
              onChange={(event) =>
                setRole(event.target.value as Invite["role"])
              }
              value={role}
            >
              {roles.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button
            className="h-10 rounded-md bg-[#815123] px-5 text-xs font-bold text-white"
            type="submit"
          >
            Create invite
          </button>
        </form>

        <div className="bg-card overflow-hidden rounded-lg border">
          <div className="flex gap-2 overflow-x-auto border-b p-4">
            {["All", "Planners", "Couple", "Family", "Pending"].map((item) => (
              <button
                className={cn(
                  "h-9 shrink-0 rounded-md border px-3 text-[10px] font-bold",
                  filter === item && "border-[#815123] text-[#815123]",
                )}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          {visible.map((invite) => (
            <article
              className="flex flex-col gap-3 border-b p-5 last:border-0 sm:flex-row sm:items-center"
              key={invite.id}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{invite.name}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {invite.email} · {invite.role}
                </p>
              </div>
              <span className="w-fit rounded border px-2 py-1 text-[10px] font-bold">
                {invite.status}
              </span>
              {invite.status === "Pending" ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    className="flex h-9 items-center gap-2 rounded-md border px-3 text-[10px] font-bold"
                    onClick={() => copyLink(invite)}
                    type="button"
                  >
                    <Copy size={12} /> Copy link
                  </button>
                  <button
                    className="h-9 rounded-md border px-3 text-[10px] font-bold"
                    onClick={() =>
                      setNotice(
                        `Invite resent for ${invite.name}. Email stays mocked.`,
                      )
                    }
                    type="button"
                  >
                    Resend invite
                  </button>
                  <button
                    className="h-9 rounded-md border px-3 text-[10px] font-bold text-[#8c3b34]"
                    onClick={() => {
                      setInvites((current) =>
                        current.filter((item) => item.id !== invite.id),
                      );
                      setNotice(`${invite.name}'s invite was revoked.`);
                    }}
                    type="button"
                  >
                    Revoke
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    className="h-9 rounded-md border px-3 text-[10px] font-bold"
                    onClick={() => setManaging(invite)}
                    type="button"
                  >
                    Manage access
                  </button>
                  <button
                    className="h-9 rounded-md border px-3 text-[10px] font-bold text-[#8c3b34]"
                    onClick={() => {
                      setInvites((current) =>
                        current.filter((item) => item.id !== invite.id),
                      );
                      setNotice(`${invite.name} was removed.`);
                    }}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      {managing && (
        <form
          className="bg-card fixed right-0 bottom-0 left-0 z-50 border-t p-5 sm:left-auto sm:w-96"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const nextRole = String(form.get("role")) as Role;
            setInvites((current) =>
              current.map((item) =>
                item.id === managing.id ? { ...item, role: nextRole } : item,
              ),
            );
            setNotice(`${managing.name} is now ${nextRole}.`);
            setManaging(null);
          }}
        >
          <h2 className="font-display text-2xl">Manage access</h2>
          <p className="mt-1 text-sm">{managing.name}</p>
          <select
            className="bg-background mt-4 h-11 w-full rounded-md border px-3 text-sm"
            defaultValue={managing.role}
            name="role"
          >
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <div className="mt-4 flex gap-2">
            <button
              className="h-10 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
              type="submit"
            >
              Save role
            </button>
            <button
              className="h-10 rounded-md border px-4 text-xs font-bold"
              onClick={() => setManaging(null)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}
