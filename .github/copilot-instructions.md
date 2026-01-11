# Stock Analysis Copilot Instructions

## Architecture Overview

Next.js application (pages router, v15) for stock analysis. Built with React 18, TypeScript 5 (strict mode), and Tailwind CSS 3.

**Core Data Flow:**

1. Stock data fetched from `https://api.stockanalysis.com/wp-json/sa` via `functions/apis/API.ts`
2. Cached through TanStack Query (React Query v5) hooks - import from `@tanstack/react-query`
3. During market hours (4am-8pm ET), quotes refetch every 5s for regular stocks, 65s for OTC
4. Trading hours logic in `functions/datetime/isTradingHours.ts` drives refetch intervals

**State Management:**

- Zustand v5 stores in `state/` for global state (auth, menu, financials, table, actions)
- Pattern: `import { create } from 'zustand'` → define interface → `create<Interface>(set => ({ ... }))`
- Pro subscription status checked via Supabase v2 `userdata` table, stored in `authState`
- TableContext pattern for complex table state with localStorage persistence

**Authentication Flow:**

- Supabase v2 auth (`auth/useAuth.ts`) manages login/logout via `onAuthStateChange` listener
- Use `supabase.auth.getUser()` instead of deprecated `user()` method
- Use `supabase.auth.signInWithOtp()` instead of deprecated `signIn()`
- Auth listener returns `subscription` object; cleanup: `subscription.unsubscribe()`
- User object enriched with subscription data from `public.userdata` table
- Pro status determined by `['trialing', 'active', 'past_due']` or active cancellation periods
- `authState` checked before rendering Pro features or hiding ads

## Developer Workflows

**Commands:**

- `npm run dev` → dev server on port 3001
- `npm run test-all` → complete check (lint + types + build) before commits
- `npm run format` → Prettier with Tailwind plugin sorts classes

**Environment Setup:**

1. Rename `env.local` to `.env.local`
2. Set `NEXT_PUBLIC_API_URL` or `API_URL` (falls back to production API)
3. Add Supabase keys for auth features

**Debugging:**

- API calls return `{}` in dev if request fails (see `getData` in `API.ts`)
- TanStack Query DevTools not included; check Network tab for API debugging
- ErrorBoundary wraps entire app in `_app.tsx`; fallback shows error details

## Code Conventions

**Component Structure:**

- Feature folders in `components/` (e.g., `PriceChart/`, `StockTable/`)
- Underscore prefix (e.g., `_PriceChart.tsx`) indicates main component in folder
- Shared components at `components/` root (e.g., `Logo.tsx`, `SEO.tsx`)

**Import Paths:**

- Use absolute imports via `baseUrl: "."` in `tsconfig.json`
- Example: `import { useAuth } from 'auth/useAuth'` NOT `import { useAuth } from '../../../auth/useAuth'`

**Styling:**

- Tailwind classes directly in JSX; NO CSS modules or styled-components
- Custom screens in `tailwind.config.js` (e.g., `xs: '350px'`, `diabp: '513px'`)
- Custom colors: `blue-brand_sharp`, `blue-link`, `blue-row_hover`

**Data Fetching:**

- Always use TanStack Query (v5) for API calls: `import { useQuery } from '@tanstack/react-query'`
- See `useQuote` pattern for refetch logic
- Static pages use `getStaticProps` with periodic revalidation (e.g., `revalidate: 4 * 60 * 60`)
- API routes in `pages/api/` for server-side operations (webhooks, newsletters, revalidation)

**Table Patterns:**

- Legacy tables use `react-table` v7 with `useTable` hook (e.g., `components/Actions/ActionsTable.tsx`)
- New tables should use TanStack Table v8 (`@tanstack/react-table`) or TableContext pattern
- TableContext stores `fixed` (immutable) and `dynamic` (stateful) configs separately with localStorage

**Type Safety:**

- Interfaces in `types/` mirror API responses (e.g., `Info`, `Quote`, `Financials`)
- TypeScript 5 with strict mode: `strict: true`, `noImplicitReturns: true`, `noFallthroughCasesInSwitch: true`

**MDX Content:**

- Articles in `content/*.mdx` with frontmatter (`title`, `description`, `image`, `date`)
- Dynamic route `pages/[slug].tsx` renders via `next-mdx-remote` v4 with custom components
- Components available in MDX: `CustomLink`, `External`, ad components

**Notifications:**

- Use `react-hot-toast` for user feedback
- Positioned `top-right` with 5s duration, 67px top offset (below header)

## Integration Notes

**Supabase v2:**

- Auth state persisted in localStorage and cookies
- Use `supabase.auth.getUser()` instead of deprecated `user()` method
- Use `signInWithOtp()` instead of deprecated `signIn()` method
- Auth listener returns `subscription` object; unsubscribe via `subscription.unsubscribe()`
- Query `userdata` table for subscription details; fields: `status`, `cancelled_date`, `paused_date`

**Analytics:**

- Plausible proxy via `next-plausible` in `next.config.js`
- Google Tag Manager in `_app.tsx`
- Custom events via `useEvent` hook

**Chart Libraries:**

- Chart.js v4 with date-fns adapter for time-series
- D3 modules for custom visualizations (scale, shape, selection)
- Lightweight Charts v4 for advanced price charts

**External Dependencies:**

- `immer` v10 for immutable state updates
- `zustand` v5 with named exports: `import { create } from 'zustand'`
- TanStack Query v5: `import { useQuery } from '@tanstack/react-query'`
- TanStack Table v8: `import { useTable } from '@tanstack/react-table'`
- `react-virtualized-auto-sizer` for table virtualization
- `excellentexport` for CSV/Excel exports

## Tech Stack Versions

- **Next.js**: 15.x (pages router)
- **React**: 18.x
- **TypeScript**: 5.x
- **Tailwind CSS**: 3.x
- **Supabase**: 2.x
- **TanStack Query**: 5.x
- **Zustand**: 5.x
- **Chart.js**: 4.x

Refer to [README.md](README.md) for initial setup steps.
