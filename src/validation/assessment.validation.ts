import z from "zod";

const assessmentTypeEnum = z.enum(
  ["EXAM", "ASSIGNMENT", "QUIZ", "LAB", "PRESENTATION", "PROJECT", "OTHER"],
  {
    error: "Assessment type is invalid",
  },
);

export const createAssessmentSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  subjectId: z.string().min(1, "Subject is required"),
  type: assessmentTypeEnum,
  date: z.string().min(1, "Date is required"),
  deadline: z.string().min(1, "Deadline is required"),
  totalMarks: z.coerce.number().min(0, "Total marks must be at least 0"),
  files: z.any().optional(),
  description: z.string().optional(),
});

export const updateAssessmentSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  subjectId: z.string().min(1, "Subject is required"),
  type: assessmentTypeEnum,
  date: z.string().min(1, "Date is required"),
  deadline: z.string().min(1, "Deadline is required"),
  totalMarks: z.coerce.number().min(0, "Total marks must be at least 0"),
  files: z.any().optional(),
  description: z.string().optional(),
});

export type CreateAssessmentValues = z.infer<typeof createAssessmentSchema>;
