import { describe, expect, it } from "vitest";

import { shouldRunSearch } from "@/pages/index/upAction";

describe("home up action", () => {
  it("runs search when refresh forces the next up callback", () => {
    const result = shouldRunSearch({
      isFirstPage: false,
      forceSearch: true,
      inputKeyword: "ibm",
      storeKeyword: "ibm"
    });

    expect(result).toBe(true);
  });

  it("runs search when keyword has changed", () => {
    const result = shouldRunSearch({
      isFirstPage: false,
      forceSearch: false,
      inputKeyword: "ibm",
      storeKeyword: ""
    });

    expect(result).toBe(true);
  });

  it("runs search on the first page", () => {
    const result = shouldRunSearch({
      isFirstPage: true,
      forceSearch: false,
      inputKeyword: "ibm",
      storeKeyword: "ibm"
    });

    expect(result).toBe(true);
  });

  it("runs load more when not first page and keyword unchanged", () => {
    const result = shouldRunSearch({
      isFirstPage: false,
      forceSearch: false,
      inputKeyword: "ibm",
      storeKeyword: "ibm"
    });

    expect(result).toBe(false);
  });
});