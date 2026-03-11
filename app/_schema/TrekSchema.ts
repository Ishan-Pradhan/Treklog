import z from "zod";

export const LatSchema = z
  .number({ message: "Please click on map to put the latitude" })
  .min(-90, "Latitude must be ≥ -90")
  .max(90, "Latitude must be ≤ 90");

export const LngSchema = z
  .number({ message: "Please click on map to put the longitude" })
  .min(-180, "Longitude must be ≥ -180")
  .max(180, "Longitude must be ≤ 180");

const NEPAL_BOUNDS = {
  minLat: 26.347,
  maxLat: 30.447,
  minLng: 80.058,
  maxLng: 88.201,
};

export const NepalLatSchema = LatSchema.refine(
  (lat) => lat >= NEPAL_BOUNDS.minLat && lat <= NEPAL_BOUNDS.maxLat,
  {
    message: "Location must be inside Nepal",
  }
);

export const NepalLngSchema = LngSchema.refine(
  (lng) => lng >= NEPAL_BOUNDS.minLng && lng <= NEPAL_BOUNDS.maxLng,
  {
    message: "Location must be inside Nepal",
  }
);

export const trekSchema = z.object({
  id: z.number().optional(),
  trek_destination: z
    .string()
    .nonempty({ message: "Trek Destination is required." }),

  region: z
    .string({ message: "Please select one" })
    .nonempty({ message: "Region of your Trek is required" }),
  date: z.date({ message: "Date is required" }),
  distance: z
    .number({ message: "The distance should be in number" })
    .positive({ message: "The distance should be greater than 0" })
    .min(1, { message: "The distance should be greater than 0" }),
  time_taken: z
    .number({
      message: "The distance should be in number",
    })
    .positive({ message: "The time taken should be greater than 0" })
    .min(1, { message: "The time taken should be positive" }),
  time_unit: z.enum(["Days", "Hours"], {
    message: "Please select Days or Hours only",
  }),
  difficulty: z.enum(["Easy", "Moderate", "Hard"], {
    message: "Please select easy, moderate or hard",
  }),
  latitude: NepalLatSchema,
  longitude: NepalLngSchema,
  description: z
    .string()
    .nonempty({ message: "Memories or description of trek is required" })
    .min(10, { message: "Minimum 10 letters are required." }),
});

export type trekSchemaType = z.infer<typeof trekSchema>;
