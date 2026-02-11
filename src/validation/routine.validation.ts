import z from "zod";

export const createRoutineSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  type: z.enum(["weekly", "exam", "special"], {
    message: "Please select a routine type",
  }),
  effectiveFrom: z.string().min(1, "Effective from date is required"),
  effectiveTo: z.string().optional(),
});

export const updateRoutineSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  type: z.enum(["weekly", "exam", "special"], {
    message: "Please select a routine type",
  }),
  effectiveFrom: z.string().min(1, "Effective from date is required"),
  effectiveTo: z.string().optional(),
});

export type CreateRoutineValues = z.infer<typeof createRoutineSchema>;
