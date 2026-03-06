import { describe, expect, it } from "vitest";

import {
  extractPageItems,
  queueMescrollFinish,
  resolvePagingAction
} from "@/pages/index/paging";

describe("home paging action", () => {
  it("uses search action for first page", () => {
    expect(resolvePagingAction(1)).toBe("search");
    expect(resolvePagingAction(0)).toBe("search");
  });

  it("uses loadMore action for subsequent pages", () => {
    expect(resolvePagingAction(2)).toBe("loadMore");
    expect(resolvePagingAction(9)).toBe("loadMore");
  });

  it("returns all items for first-page search", () => {
    expect(extractPageItems([1, 2, 3], 0, "search")).toEqual([1, 2, 3]);
  });

  it("returns appended items for load-more", () => {
    expect(extractPageItems([1, 2, 3, 4], 2, "loadMore")).toEqual([3, 4]);
  });

  it("guards against invalid previous length", () => {
    expect(extractPageItems([1, 2], 9, "loadMore")).toEqual([]);
  });

  it("queues mescroll completion to next microtask", async () => {
    let called = false;

    const finishPromise = queueMescrollFinish(() => {
      called = true;
    });

    expect(called).toBe(false);
    await finishPromise;
    expect(called).toBe(true);
  });
});
