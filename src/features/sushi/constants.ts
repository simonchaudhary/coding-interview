/**
 * Sort options for sushi list
 */
export const SORT_OPTIONS = {
  price: "Price",
  name: "Name",
} as const;

/**
 * Type filter options for sushi
 */
export const TYPE_OPTIONS = {
  all: "All Types",
  Roll: "Roll",
  Nigiri: "Nigiri",
} as const;

/**
 * Sushi type constants
 */
export const SUSHI_TYPES = {
  NIGIRI: "Nigiri",
  ROLL: "Roll",
} as const;

/**
 * Default values for sushi filters
 */
export const FILTER_DEFAULTS = {
  SORT_BY: "name",
  TYPE: "all",
  SEARCH: "",
} as const;

/**
 * Default values for sushi form
 */
export const FORM_DEFAULTS = {
  PRICE: undefined,
  TYPE: SUSHI_TYPES.NIGIRI,
  NAME: "",
  IMAGE: "",
  FISH_TYPE: "",
  PIECES: undefined,
  FISH: "",
} as const;

/**
 * Placeholder text for form inputs
 */
export const FORM_PLACEHOLDERS = {
  NAME: "Salmon Nigiri",
  IMAGE_URL: "https://example.com/image.jpg",
  FISH: "Salmon, Tuna, etc.",
  FISH_TYPE: "e.g., Fresh, Smoked",
  PRICE: "0.00",
  PIECES_ROLL: "8",
  PIECES_NIGIRI: "2",
} as const;

/**
 * Labels for sushi item display based on type
 */
export const SUSHI_ITEM_LABELS = {
  NIGIRI: "Fish",
  ROLL: "Pieces",
} as const;
