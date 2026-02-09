import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must use 6 characters"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  institutionName: z.string().min(2, "Institution name is required"),
  institutionType: z.enum(["UNIVERSITY", "COLLEGE", "POLYTECHNIC"]),
  institutionEmail: z.string().email("Invalid institution email").optional(),
  institutionPhone: z.string().optional(),
  department: z.string().min(2, "Department is required"),
  address: z.string().min(5, "Institution address is required"),
  batchSession: z.string().min(4, "Batch/Session is required"),
  batchType: z.enum(["SEMESTER", "YEAR"]).default("SEMESTER"),
  academicYear: z.string().optional(),
  section: z.string().min(1, "Section is required"),
  classRoll: z.string().min(1, "Class roll is required"),
  crPosition: z.string().min(1, "CR position is required"),
  studentIdCard: z.any().optional(), // Maps to documentProof
});

export type RegistrationValues = z.infer<typeof registrationSchema>;
