import z from "zod";

export const createRoutineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["CLASS", "EXAM"], {
    message: "Please select a routine type",
  }),
  fileUrl: z.any().optional(),
});

export const updateRoutineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["CLASS", "EXAM"], {
    message: "Please select a routine type",
  }),
  fileUrl: z.any().optional(),
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
