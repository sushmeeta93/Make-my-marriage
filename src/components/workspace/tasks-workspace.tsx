"use client";

import { useMemo, useState } from "react";
import {
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Columns3,
  Filter,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

type TaskStatus = "To do" | "In progress" | "Done";
type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  due: string;
  overdue?: boolean;
  assignee: string;
  event: string;
  priority: "High" | "Normal";
};

const seedTasks: Task[] = [
  {
    id: 1,
    title: "Finalize Sangeet lighting cues",
    status: "In progress",
    due: "Today",
    overdue: true,
    assignee: "Priya Sharma",
    event: "Sangeet",
    priority: "High",
  },
  {
    id: 2,
    title: "Confirm Jain meal count with caterer",
    status: "To do",
    due: "17 Oct",
    assignee: "Aarav Khanna",
    event: "All events",
    priority: "High",
  },
  {
    id: 3,
    title: "Approve ceremony floral samples",
    status: "To do",
    due: "20 Oct",
    assignee: "Parvati Mehta",
    event: "Wedding ceremony",
    priority: "Normal",
  },
  {
    id: 4,
    title: "Share final airport transfer manifest",
    status: "In progress",
    due: "22 Oct",
    assignee: "Rohan Mehta",
    event: "Welcome Mehendi",
    priority: "Normal",
  },
  {
    id: 5,
    title: "Lock Sangeet performance order",
    status: "Done",
    due: "12 Oct",
    assignee: "Naina Kapoor",
    event: "Sangeet",
    priority: "Normal",
  },
  {
    id: 6,
    title: "Review day-of production contacts",
    status: "Done",
    due: "10 Oct",
    assignee: "Priya Sharma",
    event: "All events",
    priority: "Normal",
  },
];

export function TasksWorkspace() {
  const [tasks, setTasks] = useState(seedTasks);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | TaskStatus>("All");
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [view, setView] = useState<"list" | "board">("list");
  const [editing, setEditing] = useState<Task | "new" | null>(null);

  const filtered = useMemo(
    () =>
      tasks.filter(
        (task) =>
          (status === "All" || task.status === status) &&
          (!overdueOnly || task.overdue) &&
          task.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [overdueOnly, query, status, tasks],
  );

  function toggleTask(task: Task) {
    setTasks((current) =>
      current.map((item) =>
        item.id === task.id
          ? { ...item, status: item.status === "Done" ? "To do" : "Done" }
          : item,
      ),
    );
  }

  return (
    <>
      <header className="flex flex-col justify-between gap-5 border-b pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#815123] uppercase">
            Planning checklist
          </p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl">Tasks</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Keep decisions, deadlines and ownership visible to the whole team.
          </p>
        </div>
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-md bg-[#815123] px-4 text-xs font-bold text-white"
          onClick={() => setEditing("new")}
          type="button"
        >
          <Plus size={14} /> Add task
        </button>
      </header>

      <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Open" note="Across all events" value="12" />
        <Metric label="In progress" note="4 assigned today" value="5" />
        <Metric
          label="Overdue"
          note="Needs attention"
          tone="warning"
          value="3"
        />
        <Metric
          label="Completed"
          note="This production"
          tone="success"
          value="28"
        />
      </section>

      <section className="bg-card mt-5 rounded-lg border">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <Search
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              size={15}
            />
            <input
              className="bg-background h-10 w-full rounded-md border pr-3 pl-9 text-xs"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tasks"
              value={query}
            />
          </label>
          <div className="flex gap-2 overflow-x-auto">
            <label className="relative shrink-0">
              <select
                className="bg-card h-10 appearance-none rounded-md border pr-9 pl-3 text-xs font-semibold"
                onChange={(event) =>
                  setStatus(event.target.value as "All" | TaskStatus)
                }
                value={status}
              >
                <option>All</option>
                <option>To do</option>
                <option>In progress</option>
                <option>Done</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                size={13}
              />
            </label>
            <button
              aria-pressed={overdueOnly}
              className={cn(
                "flex h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-xs font-semibold",
                overdueOnly && "border-[#815123] bg-[#f1e8df] text-[#815123]",
              )}
              onClick={() => setOverdueOnly((current) => !current)}
              type="button"
            >
              <Filter size={13} /> Overdue
            </button>
            <div className="bg-background flex shrink-0 rounded-md border p-1">
              <button
                aria-label="List view"
                aria-pressed={view === "list"}
                className={cn(
                  "flex size-8 items-center justify-center rounded",
                  view === "list" && "bg-card text-[#815123] shadow-sm",
                )}
                onClick={() => setView("list")}
                type="button"
              >
                <List size={14} />
              </button>
              <button
                aria-label="Board view"
                aria-pressed={view === "board"}
                className={cn(
                  "flex size-8 items-center justify-center rounded",
                  view === "board" && "bg-card text-[#815123] shadow-sm",
                )}
                onClick={() => setView("board")}
                type="button"
              >
                <Columns3 size={14} />
              </button>
            </div>
          </div>
        </div>

        {filtered.length ? (
          view === "list" ? (
            <TaskList
              onEdit={setEditing}
              onToggle={toggleTask}
              tasks={filtered}
            />
          ) : (
            <TaskBoard
              onEdit={setEditing}
              onToggle={toggleTask}
              tasks={filtered}
            />
          )
        ) : (
          <div className="p-12 text-center">
            <CheckCircle2 className="mx-auto text-[#815123]" size={25} />
            <h2 className="mt-4 text-sm font-bold">No tasks match</h2>
            <p className="text-muted-foreground mt-2 text-xs">
              Clear a filter or search for another task.
            </p>
            <button
              className="mt-5 text-xs font-bold text-[#815123]"
              onClick={() => {
                setQuery("");
                setStatus("All");
                setOverdueOnly(false);
              }}
              type="button"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {editing && (
        <TaskDrawer
          onClose={() => setEditing(null)}
          onDelete={
            editing === "new"
              ? undefined
              : () => {
                  setTasks((current) =>
                    current.filter((task) => task.id !== editing.id),
                  );
                  setEditing(null);
                }
          }
          task={editing === "new" ? undefined : editing}
        />
      )}
    </>
  );
}

function TaskList({
  onEdit,
  onToggle,
  tasks,
}: {
  onEdit: (task: Task) => void;
  onToggle: (task: Task) => void;
  tasks: Task[];
}) {
  return (
    <div>
      {tasks.map((task) => (
        <article
          className="grid gap-3 border-b p-4 last:border-0 md:grid-cols-[2rem_minmax(14rem,1fr)_8rem_9rem_8rem_2rem] md:items-center"
          key={task.id}
        >
          <button
            aria-label={
              task.status === "Done"
                ? `Mark ${task.title} incomplete`
                : `Complete ${task.title}`
            }
            className={cn(
              "flex size-5 items-center justify-center rounded border",
              task.status === "Done" &&
                "border-[#366647] bg-[#366647] text-white",
            )}
            onClick={() => onToggle(task)}
            type="button"
          >
            {task.status === "Done" && <Check size={12} />}
          </button>
          <button
            className="text-left"
            onClick={() => onEdit(task)}
            type="button"
          >
            <span
              className={cn(
                "block text-xs font-bold",
                task.status === "Done" && "text-muted-foreground line-through",
              )}
            >
              {task.title}
            </span>
            <span className="text-muted-foreground mt-1 block text-[10px]">
              {task.event}
            </span>
          </button>
          <StatusBadge status={task.status} />
          <span className="text-muted-foreground flex items-center gap-1.5 text-[10px]">
            <UserRound size={11} /> {task.assignee}
          </span>
          <span
            className={cn(
              "flex items-center gap-1.5 text-[10px]",
              task.overdue
                ? "font-bold text-[#9a512f]"
                : "text-muted-foreground",
            )}
          >
            <CalendarClock size={11} /> {task.due}
          </span>
          <button
            aria-label={`More actions for ${task.title}`}
            className="text-muted-foreground"
            type="button"
          >
            <MoreHorizontal size={15} />
          </button>
        </article>
      ))}
    </div>
  );
}

function TaskBoard({
  onEdit,
  onToggle,
  tasks,
}: {
  onEdit: (task: Task) => void;
  onToggle: (task: Task) => void;
  tasks: Task[];
}) {
  return (
    <div className="bg-border grid gap-px lg:grid-cols-3">
      {(["To do", "In progress", "Done"] as const).map((column) => (
        <div className="bg-background min-h-72 p-4" key={column}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">{column}</p>
            <span className="text-muted-foreground text-[10px]">
              {tasks.filter((task) => task.status === column).length}
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {tasks
              .filter((task) => task.status === column)
              .map((task) => (
                <article
                  className="bg-card rounded-md border p-4"
                  key={task.id}
                >
                  <button
                    className="w-full text-left text-xs leading-5 font-bold"
                    onClick={() => onEdit(task)}
                    type="button"
                  >
                    {task.title}
                  </button>
                  <p className="text-muted-foreground mt-3 text-[10px]">
                    {task.event} · {task.due}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[9px] font-semibold">
                      {task.assignee}
                    </span>
                    <button
                      aria-label={`Toggle ${task.title}`}
                      className="text-muted-foreground"
                      onClick={() => onToggle(task)}
                      type="button"
                    >
                      {column === "Done" ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <Circle size={15} />
                      )}
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded border px-2 py-1 text-[9px] font-bold",
        status === "Done" &&
          "border-[#366647]/20 bg-[#d7e3d2]/55 text-[#366647]",
        status === "In progress" &&
          "border-[#b4782a]/20 bg-[#f3e6d2] text-[#8a5a20]",
        status === "To do" && "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

function Metric({
  label,
  note,
  tone,
  value,
}: {
  label: string;
  note: string;
  tone?: "success" | "warning";
  value: string;
}) {
  return (
    <article className="bg-card rounded-lg border p-4 sm:p-5">
      <p className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
        {label}
      </p>
      <p
        className={cn(
          "font-display mt-4 text-3xl",
          tone === "success" && "text-[#366647]",
          tone === "warning" && "text-[#9a512f]",
        )}
      >
        {value}
      </p>
      <p className="text-muted-foreground mt-1 text-[10px]">{note}</p>
    </article>
  );
}

function TaskDrawer({
  onClose,
  onDelete,
  task,
}: {
  onClose: () => void;
  onDelete?: () => void;
  task?: Task;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25">
      <button
        aria-label="Close task editor"
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
              Planning task
            </p>
            <h2 className="font-display mt-1 text-2xl">
              {task ? "Edit task" : "Add task"}
            </h2>
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
        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
          <Field label="Task title" value={task?.title ?? ""} />
          <label>
            <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
              Notes
            </span>
            <textarea
              className="bg-background min-h-28 w-full rounded-md border p-3 text-sm"
              defaultValue={
                task
                  ? "Confirm final details with the responsible collaborator."
                  : ""
              }
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Status"
              options={["To do", "In progress", "Done"]}
              value={task?.status ?? "To do"}
            />
            <Field label="Due date" type="date" value="2026-10-20" />
          </div>
          <SelectField
            label="Assignee"
            options={[
              "Priya Sharma",
              "Aarav Khanna",
              "Parvati Mehta",
              "Unassigned",
            ]}
            value={task?.assignee ?? "Unassigned"}
          />
          <SelectField
            label="Linked event"
            options={[
              "All events",
              "Welcome Mehendi",
              "Sangeet",
              "Wedding ceremony",
            ]}
            value={task?.event ?? "All events"}
          />
          {onDelete && (
            <button
              className="text-destructive flex items-center gap-2 text-xs font-bold"
              onClick={onDelete}
              type="button"
            >
              <Trash2 size={14} /> Delete task
            </button>
          )}
        </div>
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
            Save task
          </button>
        </footer>
      </aside>
    </div>
  );
}

function Field({
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

function SelectField({
  label,
  options,
  value,
}: {
  label: string;
  options: string[];
  value: string;
}) {
  return (
    <label>
      <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-wider uppercase">
        {label}
      </span>
      <select
        className="bg-background h-11 w-full rounded-md border px-3 text-sm"
        defaultValue={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
