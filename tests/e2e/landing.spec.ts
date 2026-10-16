import { expect, test } from "@playwright/test";

test("landing page introduces the planner workspace", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Every wedding. Beautifully orchestrated.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Start planning" }).first(),
  ).toHaveAttribute("href", "/signup");
});
