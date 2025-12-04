export const ROUTES = {
  home: "/",
  sushi: "sushi",
  sushiDetail: {
    path: "sushi/:id",
    build: (id: string) => `/sushi/${id}`,
  },
} as const;
