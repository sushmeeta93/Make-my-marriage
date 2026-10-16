import Link from "next/link";
import { Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { SiteLogo } from "@/components/site-logo";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/#product", label: "Product" },
  { href: "/#features", label: "Features" },
  { href: "/#planners", label: "For Planners" },
] as const;

export function MarketingHeader() {
  return (
    <header className="border-border/40 bg-background/90 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-12">
        <div className="flex items-center gap-12">
          <SiteLogo className="w-52 sm:w-60" />
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                className="text-muted-foreground hover:text-foreground text-[13px] font-semibold transition-colors"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden sm:inline-flex",
            )}
            href="/login"
          >
            Sign in
          </Link>
          <Link
            className={cn(buttonVariants(), "hidden px-5 sm:inline-flex")}
            href="/signup"
          >
            Start planning
          </Link>
          <button
            aria-label="Open navigation"
            className="text-muted-foreground hover:text-foreground inline-flex size-10 items-center justify-center lg:hidden"
            type="button"
          >
            <Menu aria-hidden="true" size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}
