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

export const routineItemSchema = z.object({
  day: z.string().min(1, "Day is required"),
  time: z.string().min(1, "Time is required"),
  subject: z.string().min(1, "Subject is required"),
  teacher: z.string().min(1, "Teacher is required"),
  room: z.string().min(1, "Room is required"),
  type: z.string().min(1, "Type is required"),
  color: z.string().min(1, "Color is required"),
});

export type CreateRoutineValues = z.infer<typeof createRoutineSchema>;
export type RoutineItemValues = z.infer<typeof routineItemSchema>;
