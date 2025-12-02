export const ROUTES = {
  home: "/",

  sushi: "sushi",
  sushiDetail: (id: string) => `sushi/${id}`,
} as const;
