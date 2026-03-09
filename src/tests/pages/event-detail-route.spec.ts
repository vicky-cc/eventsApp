import { describe, expect, it } from "vitest";

import { buildEventDetailUrl, parseEventIdFromLoadOptions } from "@/pages/event-detail/route";

describe("event detail route", () => {
  it("builds encoded detail url", () => {
    const url = buildEventDetailUrl("abc/1?x=2&y=3");

    expect(url).toBe("/pages/event-detail/index?id=abc%2F1%3Fx%3D2%26y%3D3");
  });

  it("parses and validates id from page load options", () => {
    const id = parseEventIdFromLoadOptions({
      id: "abc%2F1%3Fx%3D2%26y%3D3"
    });

    expect(id).toBeNull();
  });

  it("returns null when id is missing", () => {
    const id = parseEventIdFromLoadOptions({});

    expect(id).toBeNull();
  });

  it("accepts valid encoded id", () => {
    const id = parseEventIdFromLoadOptions({
      id: "G5vVZ9fSk9f9Q"
    });

    expect(id).toBe("G5vVZ9fSk9f9Q");
  });
});
