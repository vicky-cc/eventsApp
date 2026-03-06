export type PagingAction = "search" | "loadMore";

export function resolvePagingAction(pageNo: number): PagingAction {
  if (pageNo <= 1) {
    return "search";
  }

  return "loadMore";
}

export function extractPageItems<T>(
  allItems: T[],
  previousLength: number,
  action: PagingAction
): T[] {
  if (action === "search") {
    return allItems;
  }

  const safeStart =
    Number.isFinite(previousLength) && previousLength > 0
      ? Math.min(Math.floor(previousLength), allItems.length)
      : 0;

  return allItems.slice(safeStart);
}

export function queueMescrollFinish(callback: () => void): Promise<void> {
  return Promise.resolve().then(() => {
    callback();
  });
}
