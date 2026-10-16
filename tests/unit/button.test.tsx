import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders and handles a click", async () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Start planning</Button>);
    await userEvent.click(
      screen.getByRole("button", { name: "Start planning" }),
    );

    expect(onClick).toHaveBeenCalledOnce();
  });
});
