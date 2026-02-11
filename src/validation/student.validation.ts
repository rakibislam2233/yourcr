import z from "zod";

export const createStudentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
  studentId: z.string().min(1, "Student ID is required"),
});

export const updateStudentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
  studentId: z.string().min(1, "Student ID is required"),
});

export type CreateStudentValues = z.infer<typeof createStudentSchema>;
