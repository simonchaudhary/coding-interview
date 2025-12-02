import type { SushiQueryParams } from "./api/sushi";

export const queryKeys = {
  all: () => ["sushi"],
  list: (params?: SushiQueryParams) => [...queryKeys.all(), "list", params],
  detail: (id: string | number) => [...queryKeys.all(), "detail", id],
} as const;
