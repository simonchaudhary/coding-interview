import { QueryClient } from "@tanstack/react-query";

/**
 * React Query configuration
 * - retry: Number of retry attempts for failed queries
 * - staleTime: How long data is considered fresh (no refetch)
 * - gcTime: How long unused data stays in cache before garbage collection
 * - refetchOnWindowFocus: Disable refetch when window regains focus
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 3 * 60 * 1000, // 3 minutes
      gcTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
