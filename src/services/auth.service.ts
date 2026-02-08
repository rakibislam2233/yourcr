/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "@/lib/auth-schemas";
import { api } from "@/services/api";
import { revalidatePath } from "next/cache";

type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: any;
};

export async function loginUser(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid fields",
      errors: parsed.error.flatten().fieldErrors,
      inputs: values,
    };
  }

  try {
    const res = await api.post("/auth/login", parsed.data);
    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Logged in successfully!",
      data: res,
    } as any;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to login",
      inputs: values,
    };
  }
}

export async function registerCr(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = Object.fromEntries(formData.entries());
  try {
    const res = await api.post("/auth/register-cr", values);
    return {
      success: true,
      message: "Registration successful!",
      data: res,
    } as any;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Registration failed",
      inputs: values,
    };
  }
}

export async function forgotPassword(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = forgotPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid email",
      errors: parsed.error.flatten().fieldErrors,
      inputs: values,
    };
  }

  try {
    const res = await api.post("/auth/forgot-password", parsed.data);
    return { success: true, message: "Reset link sent!", data: res } as any;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to send link",
      inputs: values,
    };
  }
}

export async function verifyOtp(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = verifyOtpSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid OTP",
      errors: parsed.error.flatten().fieldErrors,
      inputs: values,
    };
  }

  try {
    const res = await api.post("/auth/verify-otp", parsed.data);
    return { success: true, message: "OTP Verified!", data: res } as any;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Invalid OTP",
      inputs: values,
    };
  }
}

export async function resetPassword(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = Object.fromEntries(formData.entries());

  const parsed = resetPasswordSchema.safeParse({
    password: values.password,
    confirmPassword: values.confirmPassword,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid password",
      errors: parsed.error.flatten().fieldErrors,
      inputs: values,
    };
  }

  try {
    const res = await api.post("/auth/reset-password", {
      ...parsed.data,
      token: values.token,
    });
    return {
      success: true,
      message: "Password reset successful!",
      data: res,
    } as any;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to reset password",
      inputs: values,
    };
  }
}
