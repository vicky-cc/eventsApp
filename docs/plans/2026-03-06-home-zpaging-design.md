# Home Z-Paging Integration Design

**Date:** 2026-03-06

## Goal

Replace current home list scroll container with z-paging to ensure stable pull-to-refresh and load-more behavior on mobile H5 while keeping fixed top search shell and iOS-like visual style.

## Scope

- Home page only (`src/pages/index/index.vue`)
- Keep Pinia store and service layer unchanged
- Keep event detail page unchanged

## Interaction

- Fixed search shell at top
- One icon toggle button on search shell right side for list/grid mode
- z-paging as the only scroll/pagination container
- `@query` drives first-page fetch and next-page fetch

## Data Flow

- `pageNo === 1`: call `store.search(keywordInput)`
- `pageNo > 1`: call `store.loadMore()`
- Query success: `paging.complete(store.events)`
- Query failure: `paging.complete(false)`

## Style

- Keep existing iOS-style tokens and card visuals
- Keep search shell fixed
- Make z-paging fill remaining viewport area

## Verification

- `npm run test -- --run`
- `npm run typecheck`
- `npm run build:h5`
- Manual mobile H5: pull-to-refresh and load-more both work
