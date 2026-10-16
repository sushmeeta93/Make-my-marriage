"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/utils";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => setIsSubmitting(false), 700);
  }

  return (
    <div className="bg-background grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(30rem,0.92fr)]">
      <section className="flex min-w-0 flex-col px-5 py-6 sm:px-10 sm:py-8 lg:px-14 xl:px-20">
        <header className="flex items-center justify-between gap-4">
          <SiteLogo className="w-52 sm:w-60" />
          <p className="text-muted-foreground hidden text-sm sm:block">
            {isSignup ? "Already have an account?" : "New to the platform?"}{" "}
            <Link
              className="text-foreground font-semibold underline decoration-[#815123]/35 underline-offset-4 hover:text-[#815123]"
              href={isSignup ? "/login" : "/signup"}
            >
              {isSignup ? "Sign in" : "Create account"}
            </Link>
          </p>
        </header>

        <div className="mx-auto flex w-full max-w-[31rem] flex-1 flex-col justify-center py-14 sm:py-20">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#815123] uppercase">
              {isSignup ? "Planner workspace" : "Welcome back"}
            </p>
            <h1 className="font-display mt-4 text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">
              {isSignup
                ? "Create your planning studio"
                : "Return to your studio"}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md text-sm leading-7 sm:text-base">
              {isSignup
                ? "Bring every client wedding, collaborator, budget, guest list, and milestone into one calm workspace."
                : "Sign in to continue orchestrating your weddings, collaborators, budgets, and guest experiences."}
            </p>
          </div>

          <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  autoComplete="name"
                  label="Full name"
                  name="name"
                  placeholder="Priya Sharma"
                  required
                />
                <Field
                  autoComplete="organization"
                  label="Studio name"
                  name="businessName"
                  optional
                  placeholder="The Wedding Atelier"
                />
              </div>
            )}

            <Field
              autoComplete="email"
              label="Work email"
              name="email"
              placeholder="priya@studio.com"
              required
              type="email"
            />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold" htmlFor="password">
                  Password
                </label>
                {!isSignup && (
                  <Link
                    className="text-xs font-semibold text-[#815123] hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  className="bg-card placeholder:text-muted-foreground/65 focus:border-ring focus:ring-ring/15 h-12 w-full rounded-md border px-3.5 pr-12 text-sm transition-shadow outline-none focus:ring-4"
                  id="password"
                  minLength={8}
                  name="password"
                  placeholder={
                    isSignup
                      ? "Create a secure password"
                      : "Enter your password"
                  }
                  required
                  type={showPassword ? "text" : "password"}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 flex size-10 -translate-y-1/2 items-center justify-center"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {isSignup && (
                <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-xs">
                  <LockKeyhole size={12} /> Use at least 8 characters
                </p>
              )}
            </div>

            {isSignup ? (
              <label className="text-muted-foreground flex cursor-pointer items-start gap-3 text-xs leading-5">
                <input
                  className="border-border text-primary focus:ring-ring mt-0.5 size-4 rounded"
                  name="terms"
                  required
                  type="checkbox"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    className="text-foreground font-semibold underline underline-offset-4"
                    href="#"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="text-foreground font-semibold underline underline-offset-4"
                    href="#"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            ) : (
              <label className="text-muted-foreground flex cursor-pointer items-center gap-2.5 text-xs">
                <input
                  className="border-border text-primary focus:ring-ring size-4 rounded"
                  name="remember"
                  type="checkbox"
                />
                Keep me signed in on this device
              </label>
            )}

            <button
              className="bg-primary text-primary-foreground disabled:bg-primary/70 flex h-12 w-full items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors hover:bg-[#815123] disabled:cursor-wait"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting
                ? isSignup
                  ? "Creating workspace…"
                  : "Signing in…"
                : isSignup
                  ? "Create my workspace"
                  : "Sign in to studio"}
              {!isSubmitting && <ArrowRight aria-hidden="true" size={16} />}
            </button>
          </form>

          <p className="text-muted-foreground mt-7 text-center text-sm sm:hidden">
            {isSignup ? "Already have an account?" : "New to the platform?"}{" "}
            <Link
              className="text-foreground font-semibold underline underline-offset-4"
              href={isSignup ? "/login" : "/signup"}
            >
              {isSignup ? "Sign in" : "Create account"}
            </Link>
          </p>

          <div className="border-border/60 mt-8 border-t pt-6">
            <p className="text-muted-foreground flex items-start gap-2.5 text-xs leading-5">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#566254]"
                size={16}
              />
              {isSignup
                ? "Couples and family members join through a private invitation."
                : "Planners, couples, and invited family members use the same secure sign-in."}
            </p>
          </div>

          <MobileReassurance />
        </div>

        <footer className="text-muted-foreground flex items-center justify-between gap-4 text-[11px]">
          <Link className="hover:text-foreground" href="/">
            ← Return home
          </Link>
          <span>© 2026 Make My Marriage</span>
        </footer>
      </section>

      <AuthValuePanel isSignup={isSignup} />
    </div>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  placeholder: string;
  optional?: boolean;
};

function Field({
  className,
  label,
  name,
  optional,
  placeholder,
  type = "text",
  ...props
}: FieldProps) {
  return (
    <label className="block text-sm font-semibold" htmlFor={name}>
      <span className="flex items-center justify-between gap-2">
        {label}
        {optional && (
          <span className="text-muted-foreground text-[10px] font-medium">
            Optional
          </span>
        )}
      </span>
      <input
        className={cn(
          "bg-card placeholder:text-muted-foreground/65 focus:border-ring focus:ring-ring/15 mt-2 h-12 w-full rounded-md border px-3.5 text-sm font-normal transition-shadow outline-none focus:ring-4",
          className,
        )}
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </label>
  );
}

function AuthValuePanel({ isSignup }: { isSignup: boolean }) {
  return (
    <aside className="bg-muted/80 relative hidden overflow-hidden border-l p-8 lg:flex xl:p-12">
      <div className="absolute -top-24 -right-24 size-80 rounded-full bg-[#815123]/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-[#d7e3d2]/70 blur-3xl" />
      <div className="relative m-auto w-full max-w-xl">
        <p className="text-[11px] font-bold tracking-[0.18em] text-[#815123] uppercase">
          {isSignup
            ? "Your operational command centre"
            : "Your studio is ready"}
        </p>
        <h2 className="font-display mt-4 max-w-lg text-4xl leading-tight xl:text-5xl">
          {isSignup
            ? "Composure for every moving part."
            : "Continue exactly where the celebration left off."}
        </h2>
        <p className="text-muted-foreground mt-5 max-w-lg text-sm leading-7">
          One private workspace for schedules, collaborators, guests, vendors,
          and financial clarity across every client wedding.
        </p>

        <div className="bg-card border-border/60 mt-10 overflow-hidden rounded-xl border shadow-[0_28px_70px_-42px_rgba(27,28,25,0.45)]">
          <div className="bg-muted/70 flex items-center justify-between gap-4 border-b px-5 py-4">
            <div>
              <p className="font-display text-lg font-semibold">
                Parvati &amp; Shivam
              </p>
              <p className="text-muted-foreground mt-0.5 text-[10px]">
                Udaipur · 18 December 2026
              </p>
            </div>
            <span className="bg-[#d7e3d2] px-2 py-1 text-[9px] font-bold tracking-wide text-[#3e4a3d] uppercase">
              Live workspace
            </span>
          </div>

          <div className="space-y-4 p-5">
            <div className="grid grid-cols-3 gap-3">
              <PanelMetric
                icon={CalendarDays}
                label="Next event"
                value="Sangeet"
              />
              <PanelMetric icon={Users} label="RSVPs" value="184 / 240" />
              <PanelMetric
                icon={WalletCards}
                label="Committed"
                value="₹49.85L"
              />
            </div>
            <div className="bg-background rounded-lg border p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold">Production readiness</p>
                <span className="text-[10px] font-bold text-[#366647]">
                  88% aligned
                </span>
              </div>
              <div className="bg-muted mt-3 h-1.5 overflow-hidden rounded-full">
                <div className="h-full w-[88%] bg-[#566254]" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  "14 vendors synced",
                  "88 tasks completed",
                  "5 events scheduled",
                  "Guest portal ready",
                ].map((item) => (
                  <p
                    className="text-muted-foreground flex items-center gap-1.5 text-[10px]"
                    key={item}
                  >
                    <CheckCircle2 className="text-[#366647]" size={12} />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-[10px] font-semibold">
          {["Role-protected", "Client-isolated", "Guest-friendly"].map(
            (item) => (
              <span
                className="text-muted-foreground flex items-center gap-1.5"
                key={item}
              >
                <Check className="text-[#815123]" size={13} /> {item}
              </span>
            ),
          )}
        </div>
      </div>
    </aside>
  );
}

function PanelMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-background min-w-0 rounded-lg border p-3">
      <Icon className="text-[#815123]" size={15} />
      <p className="text-muted-foreground mt-4 text-[9px] uppercase">{label}</p>
      <p className="mt-1 truncate text-xs font-bold">{value}</p>
    </div>
  );
}

function MobileReassurance() {
  return (
    <div className="bg-muted/65 mt-8 rounded-lg border p-4 lg:hidden">
      <p className="text-[10px] font-bold tracking-wider text-[#815123] uppercase">
        One calm workspace
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["5", "Events"],
          ["184", "RSVPs"],
          ["14", "Vendors"],
        ].map(([value, label]) => (
          <div className="bg-card rounded border p-3 text-center" key={label}>
            <p className="font-display text-xl">{value}</p>
            <p className="text-muted-foreground mt-1 text-[9px] uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
