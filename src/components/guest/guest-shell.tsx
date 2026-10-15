import type { ReactNode } from "react";

import { SiteLogo } from "@/components/site-logo";

export function GuestShell({ children }: { children: ReactNode }) {
  return (
    <main className="bg-card min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
          <SiteLogo />
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
            Guest experience
          </p>
        </div>
      </header>
      {children}
    </main>
  );
}
