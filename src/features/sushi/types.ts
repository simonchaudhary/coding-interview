import { SORT_OPTIONS, TYPE_OPTIONS } from "./constants";

export type SushiType = "Nigiri" | "Roll";

export type BaseSushi = {
  id: string;
  name: string;
  price: number;
  type: SushiType;
  fishType: string;
  pieces: number;
  createdAt: string;
  fish: string;
  image: string;
};

export type Nigiri = Omit<BaseSushi, "type"> & {
  type: "Nigiri";
  fishType: string; // required for nigiri
  pieces: number | null;
};

export type Roll = Omit<BaseSushi, "type"> & {
  type: "Roll";
  pieces: number | null; // required for roll
  fishType: string | null;
};

export type Sushi = Nigiri | Roll;

// Filter types
export type SortOption = keyof typeof SORT_OPTIONS;
export type TypeOption = keyof typeof TYPE_OPTIONS;
