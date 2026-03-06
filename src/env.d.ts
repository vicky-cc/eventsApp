/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_TICKETMASTER_API_KEY?: string;
    readonly VITE_TICKETMASTER_BASE_URL?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
