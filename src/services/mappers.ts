import type { EventDetail, EventSummary } from "@/types/event";
import type { TicketmasterEvent } from "@/types/ticketmaster";
import { formatDateTime } from "@/utils/date";

const FALLBACK_IMAGE = "https://placehold.co/800x450?text=No+Image";

function eventImage(event: TicketmasterEvent): string {
  return event.images?.[0]?.url ?? FALLBACK_IMAGE;
}

function venue(event: TicketmasterEvent): string {
  return event._embedded?.venues?.[0]?.name ?? "Unknown venue";
}

function city(event: TicketmasterEvent): string {
  return event._embedded?.venues?.[0]?.city?.name ?? "Unknown city";
}

function category(event: TicketmasterEvent): string {
  const segment = event.classifications?.[0]?.segment?.name;
  const genre = event.classifications?.[0]?.genre?.name;

  if (segment && genre) {
    return `${segment} / ${genre}`;
  }

  return segment ?? genre ?? "Unknown";
}

function priceRange(event: TicketmasterEvent): string {
  const price = event.priceRanges?.[0];
  if (!price || price.min === undefined || price.max === undefined) {
    return "N/A";
  }
  return `${price.min} - ${price.max} ${price.currency ?? ""}`.trim();
}

export function mapEventSummary(event: TicketmasterEvent): EventSummary {
  return {
    id: event.id,
    name: event.name ?? "Untitled event",
    image: eventImage(event),
    dateTimeText: formatDateTime(event.dates?.start?.dateTime, event.dates?.start?.localDate, event.dates?.start?.localTime),
    venue: venue(event),
    city: city(event)
  };
}

export function mapEventDetail(event: TicketmasterEvent): EventDetail {
  const summary = mapEventSummary(event);

  return {
    ...summary,
    url: event.url ?? "",
    priceRange: priceRange(event),
    category: category(event),
    info: event.info ?? "No additional information.",
    seatmap: event.seatmap?.staticUrl ?? ""
  };
}
