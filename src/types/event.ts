export type ViewMode = "list" | "grid";

export interface EventSummary {
  id: string;
  name: string;
  image: string;
  dateTimeText: string;
  venue: string;
  city: string;
}

export interface EventDetail extends EventSummary {
  url: string;
  priceRange: string;
  category: string;
  info: string;
  seatmap: string;
}

export interface EventListQuery {
  keyword: string;
  page: number;
  size: number;
}

export interface EventListResult {
  items: EventSummary[];
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface EventService {
  getEvents(query: EventListQuery): Promise<EventListResult>;
  getEventDetail(id: string): Promise<EventDetail>;
}
