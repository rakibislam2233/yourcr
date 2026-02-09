import z from "zod";

export const contactValidationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  description: z.string().min(10, "Please describe your query"),
});

export type ContactValidationSchema = z.infer<typeof contactValidationSchema>;
