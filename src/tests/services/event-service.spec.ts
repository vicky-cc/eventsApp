import { describe, expect, it, vi } from "vitest";

import { createEventService } from "@/services/eventService";
import type { TicketmasterEventsResponse, TicketmasterEvent } from "@/types/ticketmaster";

function createListResponse(eventId: string): TicketmasterEventsResponse {
  const event: TicketmasterEvent = {
    id: eventId,
    name: `Event ${eventId}`,
    images: [{ url: `https://img.example.com/${eventId}.jpg` }],
    dates: {
      start: {
        dateTime: "2026-05-01T01:00:00Z",
        localDate: "2026-05-01",
        localTime: "09:00:00"
      }
    },
    _embedded: {
      venues: [{ name: "Main Hall", city: { name: "Hangzhou" }, country: { name: "China" } }]
    }
  };

  return {
    page: { number: 0, size: 20, totalPages: 2, totalElements: 40 },
    _embedded: {
      events: [event]
    }
  };
}

describe("event service", () => {
  it("requests list with keyword and page params", async () => {
    const request = vi.fn().mockResolvedValue(createListResponse("101"));
    const service = createEventService(
      {
        apiKey: "test-key",
        baseUrl: "https://app.ticketmaster.com/discovery/v2"
      },
      request
    );

    await service.getEvents({ keyword: "rock", page: 1, size: 20 });

    expect(request).toHaveBeenCalledTimes(1);
    const options = request.mock.calls[0][0];
    expect(options.url).toContain("events.json");
    expect(options.data.keyword).toBe("rock");
    expect("keyWord" in options.data).toBe(false);
    expect(options.data.page).toBe(1);
    expect(options.data.apikey).toBe("test-key");
  });

  it("maps response for list and detail", async () => {
    const detail = createListResponse("102")._embedded?.events?.[0];
    const request = vi
      .fn()
      .mockResolvedValueOnce(createListResponse("102"))
      .mockResolvedValueOnce(detail);

    const service = createEventService(
      {
        apiKey: "test-key",
        baseUrl: "https://app.ticketmaster.com/discovery/v2"
      },
      request
    );

    const listResult = await service.getEvents({ keyword: "jazz", page: 0, size: 20 });
    const detailResult = await service.getEventDetail("102");

    expect(listResult.items).toHaveLength(1);
    expect(listResult.hasMore).toBe(true);
    expect(detailResult.id).toBe("102");
  });

  it("encodes event id when requesting detail", async () => {
    const detail = createListResponse("102")._embedded?.events?.[0];
    const request = vi.fn().mockResolvedValue(detail);
    const service = createEventService(
      {
        apiKey: "test-key",
        baseUrl: "https://app.ticketmaster.com/discovery/v2"
      },
      request
    );

    await service.getEventDetail("abc/1?x=2&y=3");

    const options = request.mock.calls[0][0];
    expect(options.url).toContain("events/abc%2F1%3Fx%3D2%26y%3D3.json");
  });
});
