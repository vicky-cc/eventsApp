export interface TicketmasterImage {
  url?: string;
  ratio?: string;
  width?: number;
  height?: number;
}

export interface TicketmasterVenue {
  name?: string;
  city?: { name?: string };
  country?: { name?: string };
}

export interface TicketmasterStartDate {
  dateTime?: string;
  localDate?: string;
  localTime?: string;
}

export interface TicketmasterClassification {
  segment?: { name?: string };
  genre?: { name?: string };
}

export interface TicketmasterPriceRange {
  min?: number;
  max?: number;
  currency?: string;
}

export interface TicketmasterEvent {
  id: string;
  name?: string;
  url?: string;
  info?: string;
  dates?: {
    start?: TicketmasterStartDate;
  };
  images?: TicketmasterImage[];
  _embedded?: {
    venues?: TicketmasterVenue[];
  };
  classifications?: TicketmasterClassification[];
  priceRanges?: TicketmasterPriceRange[];
  seatmap?: {
    staticUrl?: string;
  };
}

export interface TicketmasterPage {
  number?: number;
  size?: number;
  totalPages?: number;
  totalElements?: number;
}

export interface TicketmasterEventsResponse {
  _embedded?: {
    events?: TicketmasterEvent[];
  };
  page?: TicketmasterPage;
}
