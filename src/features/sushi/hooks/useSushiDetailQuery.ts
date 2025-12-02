import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../queryKeys";
import { fetchSushiById } from "../api/sushi";

/**
 * Hook for fetching a single sushi item by ID
 * @param {string} id - The ID of the sushi item
 * @returns {UseQueryResult<Sushi, Error>} Query result containing sushi data and loading states
 */
function useSushiDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: ({ signal }) => fetchSushiById(id, signal),
  });
}

export default useSushiDetailQuery;
