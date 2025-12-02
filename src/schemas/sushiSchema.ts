import { z } from "zod";

const baseSushiSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().trim().min(1, "Image URL is required"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
  fish: z.string().min(1, "Fish type is required"),
});

const nigiriSchema = baseSushiSchema.extend({
  type: z.literal("Nigiri"),
  fishType: z.string().min(1, "Fish type is required for nigiri"),
  pieces: z.number().int().positive().nullable().optional(),
});

const rollSchema = baseSushiSchema.extend({
  type: z.literal("Roll"),
  pieces: z.number().int().positive("Pieces is required for roll"),
  fishType: z.string().nullable().optional(),
});

export const sushiSchema = z.discriminatedUnion("type", [
  nigiriSchema,
  rollSchema,
]);

export type SushiFormValues = z.infer<typeof sushiSchema>;
