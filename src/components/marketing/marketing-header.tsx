import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/#product", label: "Product" },
  { href: "/#features", label: "Features" },
  { href: "/#planners", label: "For planners" },
] as const;

export function MarketingHeader() {
  return (
    <header className="border-border/70 bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <SiteLogo />
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navigation.map((item) => (
            <Link
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden sm:flex",
            )}
            href="/login"
          >
            Sign in
          </Link>
          <Link className={buttonVariants()} href="/signup">
            Start planning
          </Link>
        </div>
      </div>
    </header>
  );
}
