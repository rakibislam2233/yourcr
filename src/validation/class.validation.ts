import z from "zod";

export const createClassSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  teacher: z.string().min(1, "Teacher is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  platform: z.string().min(1, "Platform is required"),
  link: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
});

export const updateClassSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  teacher: z.string().min(1, "Teacher is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  platform: z.string().min(1, "Platform is required"),
  link: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
});

export type CreateClassValues = z.infer<typeof createClassSchema>;
