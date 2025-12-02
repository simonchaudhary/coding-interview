export const endpoints = {
  sushi: {
    list: "/sushi",
    create: "/sushi",
    detail: (id: string) => `/sushi/${id}`,
    update: (id: string) => `/sushi/${id}`,
    delete: (id: string) => `/sushi/${id}`,
  },
} as const;
