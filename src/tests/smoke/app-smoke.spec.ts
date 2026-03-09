import { describe, expect, it } from "vitest";

import { formatDateTime } from "@/utils/date";

describe("date utils", () => {
  it("prefers local date and local time when available", () => {
    const output = formatDateTime("2026-03-06T10:30:00Z", "2026-03-07", "18:45:00");

    expect(output).toBe("2026-03-07 18:45");
  });

  it("formats dateTime when local values are absent", () => {
    const output = formatDateTime("2026-03-06T10:30:00Z");

    expect(output).toContain("2026");
    expect(output).toContain(":");
  });
});
