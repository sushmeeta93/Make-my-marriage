import Link from "next/link";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";

  return (
    <>
      <p className="text-sm font-semibold tracking-[0.16em] text-[#8a5a32] uppercase">
        {isSignup ? "Planner account" : "Welcome back"}
      </p>
      <h2 className="font-display mt-3 text-4xl">
        {isSignup ? "Start planning" : "Sign in"}
      </h2>
      <p className="text-muted-foreground mt-3">
        {isSignup
          ? "Create the workspace for your client weddings."
          : "Continue to your wedding workspaces."}
      </p>
      <form className="mt-8 space-y-5">
        {isSignup ? (
          <>
            <Field
              label="Your name"
              name="name"
              placeholder="Sushmeeta Patil"
            />
            <Field
              label="Business name"
              name="businessName"
              placeholder="Studio name"
            />
          </>
        ) : null}
        <Field
          autoComplete="email"
          label="Email"
          name="email"
          placeholder="planner@example.com"
          type="email"
        />
        <Field
          autoComplete={isSignup ? "new-password" : "current-password"}
          label="Password"
          name="password"
          placeholder="At least 8 characters"
          type="password"
        />
        <button
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full rounded-md px-5 font-semibold transition-colors"
          type="submit"
        >
          {isSignup ? "Create planner account" : "Sign in"}
        </button>
      </form>
      <p className="text-muted-foreground mt-6 text-center text-sm">
        {isSignup ? "Already have an account?" : "New to Make My Marriage?"}{" "}
        <Link
          className="text-foreground font-semibold underline underline-offset-4"
          href={isSignup ? "/login" : "/signup"}
        >
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: "email" | "password" | "text";
  autoComplete?: string;
};

function Field({
  autoComplete,
  label,
  name,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <label className="block text-sm font-medium" htmlFor={name}>
      {label}
      <input
        autoComplete={autoComplete}
        className="bg-background placeholder:text-muted-foreground/70 focus:border-ring mt-2 h-12 w-full rounded-md border px-3 text-base outline-none"
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}
