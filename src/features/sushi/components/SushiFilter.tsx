import { Search } from "lucide-react";
import { useQueryStates, debounce } from "nuqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { SortOption, TypeOption } from "../types";

import { SORT_OPTIONS, TYPE_OPTIONS, FILTER_DEFAULTS } from "../constants";

import { filterParsers } from "../lib/filterParsers";
import { MESSAGES } from "@/constants/messages";
import { DEBOUNCE_DELAYS } from "@/constants/common";

type SushiFilterProps = {
  trailing?: React.ReactNode;
};

export function SushiFilter(props: SushiFilterProps) {
  const { trailing } = props;

  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: true,
    history: "push",
  });

  const handleSearchChange = (value: string) => {
    setFilters(
      { search: value || null },
      { limitUrlUpdates: debounce(DEBOUNCE_DELAYS.SEARCH) }
    );
  };

  const handleSortChange = (value: SortOption) => {
    setFilters({ sortBy: value });
  };

  const handleTypeChange = (value: TypeOption) => {
    setFilters({ type: value });
  };

  const handleReset = () => {
    setFilters({
      search: null,
      sortBy: FILTER_DEFAULTS.SORT_BY,
      type: FILTER_DEFAULTS.TYPE,
    });
  };

  const hasActiveFilters =
    filters.search !== FILTER_DEFAULTS.SEARCH ||
    filters.sortBy !== FILTER_DEFAULTS.SORT_BY ||
    filters.type !== FILTER_DEFAULTS.TYPE;

  return (
    <div className="flex flex-wrap gap-3 p-4">
      <div className="relative flex-1 min-w-[200px] order-1 md:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="search"
          placeholder="Search"
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      <Select value={filters.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-full sm:w-32 order-2">
          <SelectValue placeholder="Type: All" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(TYPE_OPTIONS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-full sm:w-32 order-3">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SORT_OPTIONS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {trailing && (
        <div className="w-full sm:w-auto order-4 md:order-5 md:ml-auto">
          {trailing}
        </div>
      )}

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full sm:w-auto order-5 md:order-4"
        >
          {MESSAGES.buttons.Reset}
        </Button>
      )}
    </div>
  );
}
