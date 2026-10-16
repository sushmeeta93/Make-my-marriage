import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link
      aria-label="Make My Marriage home"
      className={cn("block shrink-0", className)}
      href="/"
    >
      <Image
        alt="Make My Marriage"
        className="h-10 w-auto"
        height={64}
        priority
        src="/make-my-marriage-logo.svg"
        width={320}
      />
    </Link>
  );
}
