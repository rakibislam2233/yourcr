import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const institutionInfoSchema = z.object({
  name: z.string().min(1, "Institution name is required"),
  type: z.enum(["UNIVERSITY", "COLLEGE", "POLYTECHNIC"], {
    error: "Invalid institution type",
  }),
  contactEmail: z
    .string()
    .email("Invalid contact email format")
    .transform((v) => v.toLowerCase()),
  contactPhone: z.string().optional(),
  address: z.string().min(1, "Address is required"),
});

const batchInformationSchema = z.object({
  batchType: z.enum(["SEMESTER", "YEAR"], {
    error: "Batch type must be SEMESTER or YEAR",
  }),
  department: z.string().min(1, "Department is required"),
  session: z.string().min(1, "Session is required"),
  academicYear: z.string().min(1, "Academic year is required"),
  semester: z.string().optional(),
  shift: z.string().optional(),
  group: z.string().optional(),
});

export const institutionStepSchema = z.object({
  institutionName: z.string().min(1, "Institution name is required"),
  institutionType: z.enum(["UNIVERSITY", "COLLEGE", "POLYTECHNIC"]),
  contactEmail: z.string().email("Contact email is required"),
  contactPhone: z.string().optional(),
  address: z.string().min(1, "Address is required"),
});

export const academicStepSchema = z.object({
  batchType: z.enum(["SEMESTER", "YEAR"]),
  department: z.string().min(1, "Department is required"),
  session: z.string().min(1, "Session is required"),
  academicYear: z.string().min(1, "Academic year is required"),
  semester: z.string().optional(),
  shift: z.string().optional(),
  group: z.string().optional(),
});

const jsonString = <T extends z.ZodTypeAny>(schema: T, fieldName: string) =>
  z
    .string()
    .min(1)
    .superRefine((val, ctx) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(val);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} must be valid JSON`,
        });
        return;
      }

      const result = schema.safeParse(parsed);
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issue.message,
            path: issue.path,
          });
        }
      }
    });

// ── FormData Registration (for multipart/form-data) ─────────────────────────────────
export const completeProfileSchema = z.object({
  institutionInfo: jsonString(institutionInfoSchema, "institutionInfo"),
  batchInformation: jsonString(batchInformationSchema, "batchInformation"),
  documentProof: z.instanceof(File, {
    message: "Document proof is required",
  }),
});

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

export type RegistrationValues = z.infer<typeof registrationSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type CompleteProfileValues = z.infer<typeof completeProfileSchema>;
