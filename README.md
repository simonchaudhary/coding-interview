# Sushi Catalog

Modern React + TypeScript single-page app for managing a sushi menu. Browse, search, and filter items, add new dishes with validation, view details, and manage records with responsive feedback.

## Features
- Sushi list with search, type filter (All/Nigiri/Roll), and sort options (name/price) synced to the URL via nuqs.
- Create new sushi items in a slide-over form powered by React Hook Form and Zod with type-specific validation (fish type for nigiri, pieces for rolls).
- Delete flow with confirmation dialog, toast feedback, and TanStack Query cache invalidation.
- Detail page for each sushi item with image, pricing, fish info, created date, and loading/error fallbacks.
- Skeletons, empty/error states, and global sheet/dialog controllers to keep interactions smooth.

## Tech Stack
- React 19, TypeScript, Vite 7, Tailwind CSS v4, shadcn-inspired UI primitives.
- React Router with route outlets, nuqs for URL state, Zustand for global UI state (sheet/dialog).
- TanStack Query plus an Axios client (env-driven base URL) for data fetching and caching.
- React Hook Form and Zod for schema-driven validation, Sonner for toasts, Lucide for icons.

## Getting Started
1. Install dependencies (pnpm preferred): `pnpm install`
2. Create `.env` (or adjust the existing one) with your API base and version:
   ```
   VITE_API_BASE_URL=https://692761b226e7e41498fe0975.mockapi.io/api
   VITE_API_VERSION=v1
   ```
   These values are combined to form the Axios base URL.
3. Run the dev server: `pnpm dev` (opens on http://localhost:5173)

## Scripts
- `pnpm dev` - start Vite in development mode.
- `pnpm build` - type-check then build the production bundle.
- `pnpm preview` - preview the production build locally.
- `pnpm lint` - run ESLint.
- Vitest config and sample specs exist (e.g., `src/utils/string.test.ts`, `src/hooks/useDebounce.test.ts`); install Vitest and run `pnpm vitest` if you want to execute them.

## API Notes
- Endpoints live in `src/config/endpoints.ts` under the `/sushi` namespace (list/create/detail/delete).
- Axios base URL is built from `VITE_API_BASE_URL` and `VITE_API_VERSION` via `src/utils/string.ts` and `buildUrl`.
- Sushi list supports `search`, `sortBy` (`name` or `price`), and `type` (`Nigiri` or `Roll`) query parameters.

## Project Structure
- `src/pages` - page shells (Home, Sushi list, detail).
- `src/features/sushi` - domain code: API calls, hooks, components, schema, and constants.
- `src/components/commons` - layout and global UI (sidebar, navbar, dialogs, sheets, empty/error states).
- `src/components/ui` - reusable UI primitives (cards, selects, sheets, sidebar, etc.).
- `src/stores` - Zustand stores for shared UI state.
- `src/lib` - Axios client and TanStack Query client configuration.
- `src/hooks` - shared hooks (debounce, mobile detection) plus tests.
- `src/utils` - helpers like `buildUrl` with accompanying tests.
