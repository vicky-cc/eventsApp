import { describe, expect, it } from "vitest";

import { queueMescrollFinish } from "@/pages/index/paging";

describe("home paging", () => {
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
