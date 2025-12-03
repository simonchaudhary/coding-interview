import { z } from "zod";

export const sushiSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  image: z.url("Image URL must be a valid"),
  price: z.number().positive("Price is required"),
  fish: z.string().min(1, "Fish is required"),
  type: z.enum(["Nigiri", "Roll"]),
  fishType: z.string().min(1, "Fish type is required"),
  pieces: z.number().int().positive("Pieces is required"),
});

export type SushiFormValues = z.infer<typeof sushiSchema>;
