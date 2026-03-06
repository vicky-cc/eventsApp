# Event App Design

**Date:** 2026-03-06  
**Stack:** uni-app + Vue 3 + TypeScript + Pinia  
**Data Source:** Ticketmaster real API

## 1. Architecture

The app uses a layered structure: pages -> store -> services -> API client.  
`pages/index/index` handles event listing with search, pull-to-refresh, and load-more.  
`pages/event-detail/index` renders detailed event data fetched by id.

`stores/event.ts` owns state and business actions. It exposes `search`, `refresh`, `loadMore`, and `fetchDetail`.  
`services/eventService.ts` encapsulates Ticketmaster requests and response mapping into internal models.  
`types/` contains stable app-facing interfaces to isolate UI from raw Ticketmaster payload structure.

## 2. Home Page Behavior

The home page supports:

- Top search input for keyword search.
- Pull-to-refresh to reload page 1 using current keyword.
- Load-more pagination to append next pages.
- List/Grid view mode switching without extra network calls.

Each event card shows first image, event name, and date/time. Clicking an item navigates to details.

## 3. API Strategy

List endpoint:

- `GET /discovery/v2/events.json`
- Query: `apikey`, `keyword`, `page`, `size=20`, `sort=date,asc`

Detail endpoint:

- `GET /discovery/v2/events/{id}.json`
- Query: `apikey`

The app uses `.env` for runtime settings:

- `VITE_TICKETMASTER_API_KEY`
- `VITE_TICKETMASTER_BASE_URL`

## 4. State Model (Pinia)

Core state:

- `events`
- `detailMap`
- `keyword`
- `page`
- `size`
- `totalPages`
- `hasMore`
- `loading`
- `refreshing`
- `loadingMore`
- `error`
- `viewMode`

Action semantics:

- `search(keyword)`: reset pagination and fetch page 0.
- `refresh()`: reload current keyword from page 0.
- `loadMore()`: fetch next page and append when available.
- `fetchDetail(id)`: return cached detail or request from API.

## 5. Error and Empty Handling

- Empty results: show explicit empty state.
- Request/API error: show retry capability.
- Detail fetch error: show fallback message and back navigation option.
- Concurrent request guard prevents refresh/load-more collisions.

## 6. Testing

Minimum targeted automated tests:

- Mapper tests for stable transformation from raw API to app models.
- Store action tests for search/refresh/load-more transitions and pagination behavior.
- API client tests for parameter composition and error handling with mocked request function.

## 7. Packaging and Delivery

- Development with uni-app + Vite.
- Android and iOS packaging through HBuilderX cloud/native build pipeline.
- iOS final signing and distribution requires macOS/Xcode in release pipeline.
- README includes setup steps, env configuration, run/test/build/package commands, and architecture summary.
