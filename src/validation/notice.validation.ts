import { z } from "zod";

export const noticeSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),
  type: z.enum(["GENERAL", "URGENT", "EVENT", "EXAM", "HOLIDAY"]),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(2000, "Content cannot exceed 2000 characters"),
  file: z.any().optional(),
});

export type NoticeValues = z.infer<typeof noticeSchema>;
