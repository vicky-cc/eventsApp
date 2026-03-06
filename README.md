# Event App (uni-app + Vue3 + TypeScript + Pinia)

A multi-platform event browsing app built for the take-home assignment.

## Tech Stack

- uni-app (CLI)
- Vue 3 + TypeScript
- Pinia (state management)
- Ticketmaster Discovery API
- Vitest (unit tests)

## Features

- Home page event list with first-page 20 items
- Keyword search (top search bar)
- Pull-to-refresh on home page
- Load more on reach-bottom pagination
- List/Grid view switching
- Event detail page
- Error and empty-state handling

## Project Structure

- `src/pages/index/index.vue`: home page (search, refresh, load-more, list/grid)
- `src/pages/event-detail/index.vue`: detail page
- `src/stores/event.ts`: Pinia store and business actions
- `src/services/eventService.ts`: Ticketmaster API access
- `src/services/mappers.ts`: API -> UI model mapping
- `src/types/`: app and API types
- `src/tests/`: service/store/unit tests

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Fill `.env` with your Ticketmaster key:

```env
VITE_TICKETMASTER_API_KEY=your_api_key
VITE_TICKETMASTER_BASE_URL=https://app.ticketmaster.com/discovery/v2
```

## Run

```bash
npm run dev
```

## Test

```bash
npm run test -- --run
npm run typecheck
```

## Build (H5)

```bash
npm run build:h5
```

## Android / iOS Packaging

This project can be packaged as native apps through HBuilderX cloud packaging:

1. Open HBuilderX.
2. Import this project folder as a uni-app project.
3. Menu: `发行` -> `原生App-云打包`.
4. Configure Android/iOS signing info and build.

Notes:

- Android: directly generate APK/AAB via cloud build.
- iOS: requires Apple developer certificates/profiles and follows Apple signing requirements.

## API Notes

- Event list endpoint: `GET /events.json`
- Event detail endpoint: `GET /events/{id}.json`
- App maps Ticketmaster raw response into internal typed models before rendering.

## Verification Evidence

The following commands were executed successfully in this workspace:

- `npm run test -- --run` (4 files, 8 tests passed)
- `npm run typecheck` (passed)
- `npm run build:h5` (build complete)
