import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";

import { queryKeys } from "../queryKeys";
import { fetchSushi, type SushiQueryParams } from "../api/sushi";
import { filterParsers } from "../lib/filterParsers";
import { FILTER_DEFAULTS } from "../constants";
import type { SushiType } from "../types";

/**
 * Hook for fetching the sushi list with filters from URL query parameters
 * Automatically syncs with URL state for search, sortBy, and type filters
 * @returns {UseQueryResult<Sushi[], Error>} Query result containing sushi data and loading states
 */
function useSushiQuery() {
  const [filters] = useQueryStates(filterParsers);

  const params: SushiQueryParams = {};

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.sortBy) {
    params.sortBy = filters.sortBy;
  }

  if (filters.type && filters.type !== FILTER_DEFAULTS.TYPE) {
    params.type = filters.type as SushiType;
  }

  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: ({ signal }) => fetchSushi(params, signal),
  });
}

export default useSushiQuery;
