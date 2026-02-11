import z from "zod";

export const createAssessmentSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  subject: z.string().min(1, "Subject is required"),
  type: z.string().min(1, "Type is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  totalMarks: z.coerce.number().min(0, "Total marks must be at least 0"),
  venue: z.string().optional(),
  description: z.string().optional(),
});

export const updateAssessmentSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  subject: z.string().min(1, "Subject is required"),
  type: z.string().min(1, "Type is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  totalMarks: z.coerce.number().min(0, "Total marks must be at least 0"),
  venue: z.string().optional(),
  description: z.string().optional(),
});

export type CreateAssessmentValues = z.infer<typeof createAssessmentSchema>;
