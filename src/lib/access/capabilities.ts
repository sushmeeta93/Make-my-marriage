export const roles = ["planner", "couple", "family"] as const;

export type WeddingRole = (typeof roles)[number];

export const capabilities = [
  "wedding.read",
  "wedding.update",
  "wedding.delete",
  "task.write",
  "guest.write",
  "vendor.write",
  "budget.read",
  "website.write",
  "photo.approve",
] as const;

export type Capability = (typeof capabilities)[number];

// Permission resolution is implemented with authentication in the next milestone.
export async function requireWeddingAccess(
  userId: string,
  weddingId: string,
  capability: Capability,
): Promise<never> {
  void [userId, weddingId, capability];
  throw new Error("Wedding access checks are not implemented yet.");
}
