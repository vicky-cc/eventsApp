# Home Page Interaction and Style Optimization Design

**Date:** 2026-03-06
**Scope:** Home page (search bar, list container interaction, modern iOS-like UI)

## Goals

- Keep search area fixed at top of the home page.
- Move refresh/load-more behavior into a fixed-height list container.
- Use one icon button at the right side of search bar to toggle list/grid.
- Apply a modern iOS-like visual style.

## Interaction Design

1. Page structure:
- Top fixed search shell.
- Bottom list container with height calculated as `100vh - search shell height - safe-area bottom`.

2. Search bar:
- Input field on the left.
- One icon button on the right, toggling `list` <-> `grid`.

3. List container behavior:
- Implement pull-to-refresh using `scroll-view` refresher APIs.
- Implement load-more using `scroll-view` `@scrolltolower`.
- Keep existing store actions (`search`, `refresh`, `loadMore`) and concurrency guards.

## Layout and Sizing

- Measure search shell height after render and when needed.
- Bind list container inline style with computed height string.
- Keep compatibility with notched devices by including `env(safe-area-inset-bottom)` in height expression.

## Visual Direction (iOS-like)

- Soft neutral background (`#F2F2F7`).
- White/glass-like cards and search shell.
- Thin separators (`#E5E5EA`).
- iOS accent blue (`#007AFF`).
- Rounded corners and subtle shadows.
- Compact typography with strong hierarchy.

## Error/Empty/Loading Handling

- Keep current state blocks inside list container.
- Refresh failure does not clear existing list.
- Load-more failure keeps current page state and allows retry by scrolling again.

## Verification

- `npm run test -- --run`
- `npm run typecheck`
- Manual home-page checks:
  - fixed top search shell
  - container pull-to-refresh
  - container scroll-to-load-more
  - list/grid toggle button works
  - iOS-like visual update
