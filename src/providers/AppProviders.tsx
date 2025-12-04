import { type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

import { queryClient } from "@/lib/queryClient";
import ErrorBoundaryProvider from "./ErrorBoundaryProvider";

type AppProvidersProps = {
  children: ReactNode;
};

/**
 * AppProviders - Centralized provider composition
 *
 * Combines all global providers in the correct order:
 * 1. ErrorBoundaryProvider - Catches errors at the top level
 * 2. QueryClientProvider - React Query for data fetching
 * 3. NuqsAdapter - URL state management adapter
 */
function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundaryProvider onReset={() => window.location.reload()}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryClientProvider>
    </ErrorBoundaryProvider>
  );
}

export default AppProviders;
