import z from "zod";

export const createSubjectSchema = z.object({
  code: z.string().min(1, "Subject code is required"),
  name: z.string().min(2, "Subject name must be at least 2 characters"),
  teacher: z.string().min(1, "Teacher is required"),
  credits: z.coerce.number().min(0, "Credits must be at least 0"),
  type: z.string().min(1, "Type is required"),
  color: z.string().min(1, "Color is required"),
  schedule: z.string().optional(),
});

export const updateSubjectSchema = z.object({
  code: z.string().min(1, "Subject code is required"),
  name: z.string().min(2, "Subject name must be at least 2 characters"),
  teacher: z.string().min(1, "Teacher is required"),
  credits: z.coerce.number().min(0, "Credits must be at least 0"),
  type: z.string().min(1, "Type is required"),
  color: z.string().min(1, "Color is required"),
  schedule: z.string().optional(),
});

export type CreateSubjectValues = z.infer<typeof createSubjectSchema>;
