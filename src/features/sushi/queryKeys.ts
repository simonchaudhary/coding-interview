import type { SushiQueryParams } from "./types";

export const queryKeys = {
  all: () => ["sushi"],
  list: (params?: SushiQueryParams) => [...queryKeys.all(), "list", params],
  detail: (id: string | number) => [...queryKeys.all(), "detail", id],
} as const;
