import { appConfig, type AppConfig } from "@/config/env";
import type { EventDetail, EventListQuery, EventListResult, EventService } from "@/types/event";
import type { TicketmasterEvent, TicketmasterEventsResponse } from "@/types/ticketmaster";

import { uniRequester, type Requester } from "./http";
import { mapEventDetail, mapEventSummary } from "./mappers";

function buildUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export function createEventService(config: AppConfig, requester: Requester = uniRequester): EventService {
  return {
    async getEvents(query: EventListQuery): Promise<EventListResult> {
      const response = (await requester({
        url: buildUrl(config.baseUrl, "events.json"),
        data: {
          apikey: config.apiKey,
          keyword: query.keyword,
          page: query.page,
          size: query.size,
          sort: "date,asc"
        },
        method: "GET"
      })) as TicketmasterEventsResponse;

      const items = (response._embedded?.events ?? []).map(mapEventSummary);
      const page = response.page?.number ?? query.page;
      const totalPages = response.page?.totalPages ?? 1;

      return {
        items,
        page,
        totalPages,
        hasMore: page + 1 < totalPages
      };
    },

    async getEventDetail(id: string): Promise<EventDetail> {
      const response = (await requester({
        url: buildUrl(config.baseUrl, `events/${encodeURIComponent(id)}.json`),
        data: {
          apikey: config.apiKey
        },
        method: "GET"
      })) as TicketmasterEvent;

      return mapEventDetail(response);
    }
  };
}

export const eventService = createEventService(appConfig);
