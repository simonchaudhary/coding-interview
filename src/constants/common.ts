import { ROUTES } from "./routes";

/**
 * Sort order options for queries
 */
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

/**
 * Debounce delays in milliseconds
 */
export const DEBOUNCE_DELAYS = {
  SEARCH: 2000,
  INPUT: 500,
} as const;

export const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.home]: "Home",
  [ROUTES.sushi]: "Sushi Manager",
};
