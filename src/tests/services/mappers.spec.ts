import { describe, expect, it } from "vitest";

import { mapEventDetail, mapEventSummary } from "@/services/mappers";
import type { TicketmasterEvent } from "@/types/ticketmaster";

const baseEvent: TicketmasterEvent = {
  id: "1",
  name: "Sample Event",
  dates: {
    start: {
      dateTime: "2026-04-01T10:30:00Z",
      localDate: "2026-04-01",
      localTime: "18:30:00"
    }
  },
  images: [{ url: "https://img.example.com/1.jpg" }],
  _embedded: {
    venues: [{ name: "Arena", city: { name: "Shanghai" }, country: { name: "China" } }]
  },
  url: "https://ticketmaster.example.com/e/1",
  priceRanges: [{ min: 50, max: 200, currency: "USD" }],
  seatmap: { staticUrl: "https://img.example.com/map.jpg" },
  classifications: [{ segment: { name: "Music" }, genre: { name: "Pop" } }],
  info: "Bring your ID"
};

describe("mappers", () => {
  it("maps event summary", () => {
    const summary = mapEventSummary(baseEvent);

    expect(summary.id).toBe("1");
    expect(summary.name).toBe("Sample Event");
    expect(summary.image).toContain("img.example.com");
    expect(summary.venue).toBe("Arena");
  });

  it("maps event detail", () => {
    const detail = mapEventDetail(baseEvent);

    expect(detail.url).toContain("ticketmaster");
    expect(detail.priceRange).toContain("50");
    expect(detail.category).toBe("Music / Pop");
  });
});
