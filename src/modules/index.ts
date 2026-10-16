/**
 * Feature code is added here by domain, not by transport layer.
 *
 * Each domain will own its actions, queries, validation, and presentation
 * helpers while shared infrastructure stays in src/lib.
 */
export const domainModules = [
  "weddings",
  "members",
  "events",
  "tasks",
  "vendors",
  "budget",
  "guests",
  "website",
  "photos",
] as const;

export type DomainModule = (typeof domainModules)[number];
