"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/utils";

type ForgotState = "default" | "success" | "rate-limit" | "offline" | "error";
type ResetState =
  "default" | "success" | "expired" | "invalid" | "offline" | "error";
type InviteState =
  | "new"
  | "existing"
  | "family"
  | "success"
  | "expired"
  | "revoked"
  | "accepted"
  | "wrong-account"
  | "invalid"
  | "offline"
  | "error";

const inputClass =
  "h-12 w-full rounded-md border bg-card px-3.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground/65 focus:border-ring focus:ring-4 focus:ring-ring/15";

export function ForgotPasswordFlow({
  initialState = "default",
}: {
  initialState?: ForgotState;
}) {
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidation("Enter a valid email address.");
      return;
    }
    setValidation("");
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setState("success");
    }, 650);
  }

  return (
    <AuthAccessShell
      description="We’ll send a private reset link if this email belongs to a Make My Marriage account."
      eyebrow="Account recovery"
      heading="Reset your password"
      icon={<Mail size={21} />}
      topAction="Sign in"
      topHref="/login"
      topPrompt="Remembered your password?"
    >
      {state === "success" ? (
        <StatusPanel
          actionHref="/login"
          actionLabel="Return to sign in"
          description={`If an account exists for ${email || "that address"}, a reset link is on its way. Check spam or promotions too.`}
          icon="success"
          title="Check your inbox"
        />
      ) : (
        <form className="mt-9 space-y-5" onSubmit={submit}>
          <FieldLabel htmlFor="recovery-email">Work email</FieldLabel>
          <input
            aria-describedby={validation ? "email-error" : undefined}
            aria-invalid={Boolean(validation)}
            autoComplete="email"
            className={cn(inputClass, validation && "border-destructive")}
            id="recovery-email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="priya@studio.com"
            type="email"
            value={email}
          />
          {validation && (
            <p className="text-destructive text-xs" id="email-error">
              {validation}
            </p>
          )}
          <StateNotice state={state} />
          <PrimaryButton busy={submitting}>
            Send reset link <ArrowRight size={15} />
          </PrimaryButton>
          <p className="text-muted-foreground text-center text-xs leading-5">
            For your security, we never confirm whether an email is registered.
          </p>
        </form>
      )}
    </AuthAccessShell>
  );
}

export function ResetPasswordFlow({
  initialState = "default",
}: {
  initialState?: ResetState;
}) {
  const [state, setState] = useState(initialState);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const checks = useMemo(
    () =>
      [
        ["At least 8 characters", password.length >= 8],
        ["One uppercase letter", /[A-Z]/.test(password)],
        ["One number", /\d/.test(password)],
        ["Passwords match", Boolean(password) && password === confirm],
      ] as const,
    [confirm, password],
  );
  const formValid = checks.every(([, valid]) => valid);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formValid) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setState("success");
    }, 650);
  }

  const blocked = ["expired", "invalid"].includes(state);

  return (
    <AuthAccessShell
      description="Choose a new secure password for your planning workspace."
      eyebrow="Secure your account"
      heading="Create a new password"
      icon={<KeyRound size={21} />}
      topAction="Sign in"
      topHref="/login"
      topPrompt="Back to your workspace?"
    >
      {state === "success" ? (
        <StatusPanel
          actionHref="/login"
          actionLabel="Continue to sign in"
          description="Your password has been updated. You can now sign in with your new password."
          icon="success"
          title="Password updated"
        />
      ) : blocked ? (
        <StatusPanel
          actionHref="/forgot-password"
          actionLabel="Request a new link"
          description={
            state === "expired"
              ? "This reset link has expired. Request a fresh link to protect your account."
              : "This reset link is incomplete or invalid. Request a new one to continue."
          }
          icon="warning"
          title={state === "expired" ? "Link expired" : "Link isn’t valid"}
        />
      ) : (
        <form className="mt-9 space-y-5" onSubmit={submit}>
          <PasswordField
            autoComplete="new-password"
            id="new-password"
            label="New password"
            onChange={setPassword}
            show={showPassword}
            toggle={() => setShowPassword((value) => !value)}
            value={password}
          />
          <PasswordField
            autoComplete="new-password"
            id="confirm-password"
            label="Confirm new password"
            onChange={setConfirm}
            show={showPassword}
            toggle={() => setShowPassword((value) => !value)}
            value={confirm}
          />
          <ul className="bg-muted/45 grid gap-2 rounded-lg border p-4 sm:grid-cols-2">
            {checks.map(([label, valid]) => (
              <li
                className={cn(
                  "flex items-center gap-2 text-[11px]",
                  valid ? "text-[#366647]" : "text-muted-foreground",
                )}
                key={label}
              >
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full border",
                    valid && "border-[#6f8f75] bg-[#d7e3d2]",
                  )}
                >
                  {valid && <Check size={10} />}
                </span>
                {label}
              </li>
            ))}
          </ul>
          <StateNotice state={state} />
          <PrimaryButton busy={submitting} disabled={!formValid}>
            Update password <ArrowRight size={15} />
          </PrimaryButton>
        </form>
      )}
    </AuthAccessShell>
  );
}

export function AcceptInvitationFlow({
  initialState = "new",
}: {
  initialState?: InviteState;
}) {
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isExisting = state === "existing" || state === "wrong-account";
  const isFamily = state === "family";
  const terminalStates: InviteState[] = [
    "expired",
    "revoked",
    "accepted",
    "invalid",
  ];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setState("success");
    }, 650);
  }

  const terminalCopy: Partial<
    Record<InviteState, { title: string; description: string }>
  > = {
    expired: {
      title: "Invitation expired",
      description:
        "This invitation is no longer active. Ask the wedding planner to send a fresh invitation.",
    },
    revoked: {
      title: "Access was removed",
      description:
        "This invitation has been withdrawn by the planner. Contact them if you believe this is a mistake.",
    },
    accepted: {
      title: "Invitation already accepted",
      description:
        "This invitation has already been connected to an account. Sign in to continue.",
    },
    invalid: {
      title: "Invitation isn’t valid",
      description:
        "The invitation link is incomplete or cannot be verified. Request a new link from the planner.",
    },
  };

  return (
    <AuthAccessShell
      description="You’ve been invited to help bring every detail of Parvati and Shivam’s wedding together."
      eyebrow={
        isFamily ? "Family collaborator invitation" : "Couple invitation"
      }
      heading="Join the wedding workspace"
      icon={<Users size={21} />}
      invitation
      topAction="Sign in"
      topHref="/login"
      topPrompt="Already use Make My Marriage?"
    >
      {state === "success" ? (
        <StatusPanel
          actionHref="/weddings"
          actionLabel="Open wedding workspace"
          description="Your access is ready. Welcome to Parvati and Shivam’s planning team."
          icon="success"
          title="Invitation accepted"
        />
      ) : terminalStates.includes(state) ? (
        <StatusPanel
          actionHref={
            state === "accepted" ? "/login" : "mailto:planner@example.com"
          }
          actionLabel={state === "accepted" ? "Sign in" : "Contact planner"}
          description={terminalCopy[state]?.description ?? ""}
          icon="warning"
          title={terminalCopy[state]?.title ?? ""}
        />
      ) : (
        <form className="mt-8 space-y-5" onSubmit={submit}>
          <div className="bg-muted/45 rounded-lg border p-4">
            <p className="text-[9px] font-bold tracking-wider text-[#815123] uppercase">
              Your access
            </p>
            <p className="mt-2 text-sm font-bold">
              {isFamily ? "Family collaborator" : "Couple · Bride"}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {isFamily
                ? "Guest list, events and RSVP overview"
                : "Full planning access, excluding billing and ownership"}
            </p>
          </div>

          {!isExisting && (
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                autoComplete="given-name"
                id="first-name"
                label="First name"
                placeholder={isFamily ? "Anjali" : "Parvati"}
              />
              <TextField
                autoComplete="family-name"
                id="last-name"
                label="Last name"
                placeholder="Mehta"
              />
            </div>
          )}

          <TextField
            autoComplete="email"
            disabled
            id="invite-email"
            label="Invited email"
            placeholder="parvati@example.com"
            type="email"
          />
          <PasswordField
            autoComplete={isExisting ? "current-password" : "new-password"}
            id="invite-password"
            label={isExisting ? "Password" : "Create a password"}
            onChange={setPassword}
            show={showPassword}
            toggle={() => setShowPassword((value) => !value)}
            value={password}
          />
          {!isExisting && (
            <label className="text-muted-foreground flex cursor-pointer items-start gap-3 text-xs leading-5">
              <input
                className="mt-0.5 size-4 rounded"
                required
                type="checkbox"
              />
              <span>
                I agree to the Terms of Service and Privacy Policy for this
                private workspace.
              </span>
            </label>
          )}
          <StateNotice state={state} />
          <PrimaryButton busy={submitting}>
            {isExisting ? "Sign in & accept" : "Accept invitation"}{" "}
            <ArrowRight size={15} />
          </PrimaryButton>
          {isExisting && (
            <p className="text-muted-foreground text-center text-xs">
              Signed in as a different person?{" "}
              <button className="font-semibold text-[#815123]" type="button">
                Use another account
              </button>
            </p>
          )}
        </form>
      )}
    </AuthAccessShell>
  );
}

function AuthAccessShell({
  children,
  description,
  eyebrow,
  heading,
  icon,
  invitation = false,
  topAction,
  topHref,
  topPrompt,
}: {
  children: ReactNode;
  description: string;
  eyebrow: string;
  heading: string;
  icon: ReactNode;
  invitation?: boolean;
  topAction: string;
  topHref: string;
  topPrompt: string;
}) {
  return (
    <div className="bg-background grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(30rem,0.92fr)]">
      <section className="flex min-w-0 flex-col px-5 py-6 sm:px-10 sm:py-8 lg:px-14 xl:px-20">
        <header className="flex items-center justify-between gap-4">
          <SiteLogo className="w-52 sm:w-60" />
          <p className="text-muted-foreground hidden text-sm sm:block">
            {topPrompt}{" "}
            <Link
              className="text-foreground font-semibold underline decoration-[#815123]/35 underline-offset-4 hover:text-[#815123]"
              href={topHref as Route}
            >
              {topAction}
            </Link>
          </p>
        </header>

        <main className="mx-auto flex w-full max-w-[31rem] flex-1 flex-col justify-center py-14 sm:py-20">
          <span className="bg-card flex size-11 items-center justify-center rounded-full border text-[#815123] shadow-sm">
            {icon}
          </span>
          <p className="mt-7 text-[11px] font-bold tracking-[0.2em] text-[#815123] uppercase">
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">
            {heading}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-md text-sm leading-7 sm:text-base">
            {description}
          </p>
          {children}
          <Link
            className="text-muted-foreground hover:text-foreground mx-auto mt-8 flex items-center gap-2 text-xs font-semibold"
            href="/login"
          >
            <ArrowLeft size={13} /> Back to sign in
          </Link>
        </main>

        <p className="text-muted-foreground text-center text-[10px] sm:text-left">
          © 2026 Make My Marriage · Private by design
        </p>
      </section>

      <aside className="relative hidden overflow-hidden border-l bg-[#20241f] text-white lg:flex">
        <div className="absolute -top-24 -right-20 size-80 rounded-full bg-[#a87948]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-[#6f8f75]/20 blur-3xl" />
        <div className="relative m-auto max-w-lg px-14 py-20 xl:px-20">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#d9b58e] uppercase">
            {invitation ? "A private place to collaborate" : "Secure by design"}
          </p>
          <blockquote className="font-display mt-6 text-4xl leading-[1.25]">
            {invitation
              ? "One celebration. One shared source of truth."
              : "Your planning work deserves a calm, protected return."}
          </blockquote>
          <div className="mt-10 space-y-4 border-t border-white/15 pt-8">
            {[
              invitation
                ? "Access shaped around your wedding role"
                : "Reset links are private and time-limited",
              invitation
                ? "A shared view of events, guests and decisions"
                : "Account details are never exposed",
              "Protected planner and family workspaces",
            ].map((item) => (
              <p
                className="flex items-center gap-3 text-sm text-white/75"
                key={item}
              >
                <CheckCircle2 className="text-[#a9c2a8]" size={17} />
                {item}
              </p>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
            <ShieldCheck className="text-[#d9b58e]" size={19} />
            <p className="text-xs leading-5 text-white/65">
              Need help? Your wedding information stays private while our
              support team assists.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function TextField({
  id,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        className={cn(inputClass, "disabled:bg-muted")}
        id={id}
        {...props}
      />
    </div>
  );
}

function PasswordField({
  autoComplete,
  id,
  label,
  onChange,
  show,
  toggle,
  value,
}: {
  autoComplete: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  show: boolean;
  toggle: () => void;
  value: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <input
          autoComplete={autoComplete}
          className={cn(inputClass, "pr-12")}
          id={id}
          minLength={8}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter a secure password"
          required
          type={show ? "text" : "password"}
          value={value}
        />
        <button
          aria-label={show ? "Hide password" : "Show password"}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 flex size-10 -translate-y-1/2 items-center justify-center"
          onClick={toggle}
          type="button"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <label className="mb-2 block text-sm font-semibold" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

function PrimaryButton({
  busy,
  children,
  disabled = false,
}: {
  busy: boolean;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#252b25] px-5 text-sm font-bold text-white transition hover:bg-[#815123] disabled:cursor-not-allowed disabled:opacity-50"
      disabled={busy || disabled}
      type="submit"
    >
      {busy ? "Please wait…" : children}
    </button>
  );
}

function StateNotice({ state }: { state: string }) {
  const copy =
    state === "rate-limit"
      ? "Too many requests. Please wait a few minutes before trying again."
      : state === "offline"
        ? "You appear to be offline. Check your connection and try again."
        : state === "wrong-account"
          ? "This invitation belongs to another email. Sign out and use the invited account."
          : state === "error"
            ? "We couldn’t complete that request. Please try again."
            : "";

  if (!copy) return null;
  return (
    <p
      className="rounded-md border border-[#b96948]/25 bg-[#fff4ee] p-3 text-xs leading-5 text-[#88492f]"
      role="alert"
    >
      {copy}
    </p>
  );
}

function StatusPanel({
  actionHref,
  actionLabel,
  description,
  icon,
  title,
}: {
  actionHref: string;
  actionLabel: string;
  description: string;
  icon: "success" | "warning";
  title: string;
}) {
  return (
    <div className="bg-card mt-9 rounded-xl border p-6 sm:p-8">
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full",
          icon === "success"
            ? "bg-[#d7e3d2] text-[#366647]"
            : "bg-[#f3e2d2] text-[#815123]",
        )}
      >
        {icon === "success" ? (
          <CheckCircle2 size={21} />
        ) : (
          <LockKeyhole size={21} />
        )}
      </span>
      <h2 className="font-display mt-5 text-2xl">{title}</h2>
      <p className="text-muted-foreground mt-3 text-xs leading-6">
        {description}
      </p>
      <Link
        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#252b25] px-5 text-xs font-bold text-white hover:bg-[#815123]"
        href={actionHref as Route}
      >
        {actionLabel} <ArrowRight size={14} />
      </Link>
    </div>
  );
}
