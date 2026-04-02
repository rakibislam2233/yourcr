import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),
  type: z.enum(["ACADEMIC", "TECHNICAL", "ADMINISTRATIVE", "OTHER"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),
});

export type IssueValues = z.infer<typeof issueSchema>;
