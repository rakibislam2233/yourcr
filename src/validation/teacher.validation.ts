import z from "zod";

export const createTeacherSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  department: z.string().min(2, { message: "Department must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 digits" }),
});

export const updateTeacherSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  department: z.string().min(2, { message: "Department must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 digits" }),
});

export type CreateTeacherValues = z.infer<typeof createTeacherSchema>;
