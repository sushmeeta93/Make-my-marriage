import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link
      aria-label="Make My Marriage home"
      className={cn(
        "font-display text-foreground text-xl font-semibold tracking-tight",
        className,
      )}
      href="/"
    >
      Make My Marriage
    </Link>
  );
}
