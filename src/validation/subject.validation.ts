import z from "zod";

export const createSubjectSchema = z.object({
  code: z.string().min(1, { message: "Subject code is required" }),
  name: z.string().min(2, { message: "Subject name must be at least 2 characters" }),
  teacherId: z.string().min(1, { message: "Teacher is required" }),
  credit: z.coerce.number().min(0, { message: "Credits must be at least 0" }),
  description: z.string().min(1, { message: "Description is required" }),
  roomNumber: z.string().optional(),
  isDepartmental: z.preprocess((val) => {
    if (typeof val === "string") {
      return val === "true" || val === "1";
    }
    return Boolean(val);
  }, z.boolean().default(true)),
});

export const updateSubjectSchema = z.object({
  code: z.string().min(1, { message: "Subject code is required" }),
  name: z.string().min(2, { message: "Subject name must be at least 2 characters" }),
  teacherId: z.string().min(1, { message: "Teacher is required" }),
  credit: z.coerce.number().min(0, { message: "Credits must be at least 0" }),
  description: z.string().min(1, { message: "Description is required" }),
  roomNumber: z.string().optional(),
  isDepartmental: z.preprocess((val) => {
    if (typeof val === "string") {
      return val === "true" || val === "1";
    }
    return Boolean(val);
  }, z.boolean().default(true)),
});

export type CreateSubjectValues = z.infer<typeof createSubjectSchema>;
