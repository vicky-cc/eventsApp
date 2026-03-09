import { describe, expect, it } from "vitest";

import { resolveHomeContentState } from "@/pages/index/contentState";

describe("home content state", () => {
  it("shows list even when there is an error after items are loaded", () => {
    const state = resolveHomeContentState({
      loading: false,
      error: "Load more failed",
      eventsLength: 3
    });

    expect(state.showList).toBe(true);
    expect(state.showError).toBe(false);
  });

  it("shows error only for first-page failure", () => {
    const state = resolveHomeContentState({
      loading: false,
      error: "Search failed",
      eventsLength: 0
    });

    expect(state.showError).toBe(true);
    expect(state.showList).toBe(false);
  });
});
