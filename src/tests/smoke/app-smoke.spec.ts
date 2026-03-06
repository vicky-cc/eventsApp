import { describe, expect, it } from "vitest";

import { formatDateTime } from "@/utils/date";

describe("date utils", () => {
  it("formats dateTime to local text", () => {
    const output = formatDateTime("2026-03-06T10:30:00Z");

    expect(output).toContain("2026");
    expect(output).toContain(":");
  });
});
