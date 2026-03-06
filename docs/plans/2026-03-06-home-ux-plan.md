# Home UX Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the home page to use a fixed top search shell and a fixed-height scroll container with in-container pull-to-refresh and load-more, plus iOS-like modern styling.

**Architecture:** Keep the existing data flow in Pinia store. Change only home-page view composition and layout calculations. Introduce small layout utility for deterministic height-expression logic and test it via TDD.

**Tech Stack:** uni-app, Vue 3, TypeScript, Pinia, Vitest

---

### Task 1: Add tested layout utility for list container height

**Files:**
- Create: `src/pages/index/layout.ts`
- Create: `src/tests/pages/home-layout.spec.ts`

### Task 2: Refactor home page interaction structure

**Files:**
- Modify: `src/pages/index/index.vue`
- Modify: `src/pages.json`

### Task 3: Apply iOS-like style updates

**Files:**
- Modify: `src/styles/theme.scss`
- Modify: `src/components/event/EventListItem.vue`
- Modify: `src/components/event/EventGridItem.vue`

### Task 4: Verify

**Commands:**
- `npm run test -- --run`
- `npm run typecheck`
