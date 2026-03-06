# Home Z-Paging Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate z-paging into the home page to provide reliable pull-to-refresh and load-more.

**Architecture:** Keep existing store/service behavior and switch only the UI pagination driver from `scroll-view` events to `z-paging` query callbacks. Use a small helper to map page numbers to actions and validate with tests.

**Tech Stack:** uni-app, Vue 3, TypeScript, Pinia, Vitest, z-paging

---

### Task 1: Add paging action helper with tests

**Files:**
- Create: `src/pages/index/paging.ts`
- Create: `src/tests/pages/home-paging.spec.ts`

### Task 2: Install z-paging and integrate in home page

**Files:**
- Modify: `package.json`
- Modify: `src/pages/index/index.vue`
- Modify: `src/styles/theme.scss`

### Task 3: Verify end-to-end

**Commands:**
- `npm run test -- --run`
- `npm run typecheck`
- `npm run build:h5`
