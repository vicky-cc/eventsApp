import { describe, expect, it } from "vitest";

import { buildListContainerHeight } from "@/pages/index/layout";

describe("home layout", () => {
  it("builds fixed-height expression with safe-area support", () => {
    const value = buildListContainerHeight(128);

    expect(value).toBe("calc(100vh - 128px - env(safe-area-inset-bottom))");
  });

  it("falls back to default height when input is invalid", () => {
    const value = buildListContainerHeight(0);

    expect(value).toBe("calc(100vh - 120px - env(safe-area-inset-bottom))");
  });
});
