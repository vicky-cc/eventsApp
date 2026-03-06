import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { createEventStore } from "@/stores/event";
import type { EventService, EventSummary } from "@/types/event";

function mockItem(id: string): EventSummary {
  return {
    id,
    name: `Event ${id}`,
    image: `https://img.example.com/${id}.jpg`,
    dateTimeText: "2026-04-01 18:00",
    venue: "Venue",
    city: "Shanghai"
  };
}

describe("event store", () => {
  let service: EventService;

  beforeEach(() => {
    setActivePinia(createPinia());
    service = {
      getEvents: vi.fn().mockResolvedValue({
        items: [mockItem("1")],
        page: 0,
        totalPages: 2,
        hasMore: true
      }),
      getEventDetail: vi.fn().mockResolvedValue({
        ...mockItem("1"),
        url: "https://ticketmaster.example.com",
        priceRange: "50 - 100 USD",
        category: "Music / Pop",
        info: "detail info",
        seatmap: ""
      })
    };
  });

  it("search resets data and fetches page 0", async () => {
    const useStore = createEventStore(service);
    const store = useStore();
    store.events = [mockItem("old")];
    store.page = 5;

    await store.search("rock");

    expect(store.keyword).toBe("rock");
    expect(store.page).toBe(0);
    expect(store.events[0].id).toBe("1");
    expect(service.getEvents).toHaveBeenCalledWith({ keyword: "rock", page: 0, size: 20 });
  });

  it("loadMore appends next page data", async () => {
    const getEvents = vi
      .fn()
      .mockResolvedValueOnce({ items: [mockItem("1")], page: 0, totalPages: 2, hasMore: true })
      .mockResolvedValueOnce({ items: [mockItem("2")], page: 1, totalPages: 2, hasMore: false });

    const useStore = createEventStore({ ...service, getEvents });
    const store = useStore();

    await store.search("jazz");
    await store.loadMore();

    expect(store.events.map((item) => item.id)).toEqual(["1", "2"]);
    expect(store.hasMore).toBe(false);
  });

  it("refresh reloads first page", async () => {
    const useStore = createEventStore(service);
    const store = useStore();

    await store.search("indie");
    await store.refresh();

    expect(service.getEvents).toHaveBeenCalledWith({ keyword: "indie", page: 0, size: 20 });
    expect(store.refreshing).toBe(false);
  });
});
