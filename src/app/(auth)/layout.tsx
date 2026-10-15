import type { ReactNode } from "react";
import Link from "next/link";

import { SiteLogo } from "@/components/site-logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[0.8fr_1.2fr]">
      <section className="bg-primary text-primary-foreground flex flex-col p-8 lg:p-12">
        <SiteLogo className="text-primary-foreground" />
        <div className="my-auto max-w-lg py-16">
          <p className="text-primary-foreground/65 text-xs font-semibold tracking-[0.22em] uppercase">
            Built for professional planners
          </p>
          <h1 className="font-display mt-5 text-5xl leading-tight">
            Run every wedding from one calm workspace.
          </h1>
        </div>
      </section>
      <section className="bg-card flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          {children}
          <p className="text-muted-foreground mt-8 text-center text-sm">
            <Link className="underline underline-offset-4" href="/">
              Return to homepage
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
