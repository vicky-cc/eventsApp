export interface AppConfig {
  apiKey: string;
  baseUrl: string;
}

const DEFAULT_BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export const appConfig: AppConfig = {
  apiKey: import.meta.env.VITE_TICKETMASTER_API_KEY ?? "",
  baseUrl: import.meta.env.VITE_TICKETMASTER_BASE_URL ?? DEFAULT_BASE_URL
};
