import { parseAsStringEnum, parseAsString } from "nuqs";

import type { SortOption, TypeOption } from "../types";
import { SORT_OPTIONS, TYPE_OPTIONS, FILTER_DEFAULTS } from "../constants";

export const filterParsers = {
  search: parseAsString.withDefault(FILTER_DEFAULTS.SEARCH),
  sortBy: parseAsStringEnum<SortOption>(
    Object.keys(SORT_OPTIONS) as SortOption[]
  ).withDefault(FILTER_DEFAULTS.SORT_BY),
  type: parseAsStringEnum<TypeOption>(
    Object.keys(TYPE_OPTIONS) as TypeOption[]
  ).withDefault(FILTER_DEFAULTS.TYPE),
};
