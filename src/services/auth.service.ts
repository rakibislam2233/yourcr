/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { api } from "@/services/api";
import { deleteCookie, getCookie, setCookie } from "@/utils/tokenHandlers";
import {
  forgotPasswordSchema,
  loginSchema,
  registrationSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "@/validation/auth.validation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: any;
  data?: any;
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
    
    if (!res?.data?.isEmailVerified) {
      //set sessionId in cookies
      await setCookie("sessionId", res.data.sessionId, {
        secure: true,
        httpOnly: true,
        maxAge: 3600, //1 hour
        path: "/",
        sameSite: "none",
      });
      //redirect to verify otp page
      redirect("/auth/verify-otp");
    }
    // Save tokens if present
    if (res?.data?.tokens) {
      await setCookie("accessToken", res.data.tokens.accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: parseInt(res.data.tokens["Max-Age"]) || 1000 * 60 * 60,
        path: res.data.tokens.Path || "/",
        sameSite: res.data.tokens["SameSite"] || "none",
      });

      await setCookie("refreshToken", res.data.tokens.refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge:
          parseInt(res.data.tokens["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
        path: res.data.tokens.Path || "/",
        sameSite: res.data.tokens["SameSite"] || "none",
      });
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Logged in successfully!",
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to login",
      inputs: values,
    };
  }
}

// Register CR
export async function registerCr(
  prevState: ActionState,
  payload: any,
): Promise<ActionState> {
  const values = Object.fromEntries(payload.entries());

  const registrationData = {
    fullName: values.fullName,
    email: values.email,
    phoneNumber: values.phoneNumber,
    password: values.password,
  };

  const parsed = registrationSchema
    .pick({
      fullName: true,
      email: true,
      phoneNumber: true,
      password: true,
    })
    .safeParse(registrationData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: parsed.error.flatten().fieldErrors,
      inputs: values,
    };
  }

  try {
    const res = await api.post("/auth/register", parsed.data);
    // Set sessionId in cookies
    const sessionId = res?.data?.sessionId;
    if (sessionId) {
      const cookieStore = await cookies();
      cookieStore.set("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        maxAge: 3600, // 1 hour
      });
    }
    return {
      success: true,
      message: res?.message,
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Registration failed",
      inputs: values,
    };
  }
}

// Complete CR Registration
export async function completeCrRegistration(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const values = Object.fromEntries(formData.entries());

  try {
    // Construct the payload structure backend expects
    const finalFormData = new FormData();

    const institutionInfo = {
      name: values.institutionName,
      type: values.institutionType,
      contactEmail: values.institutionEmail || values.email,
      contactPhone: values.institutionPhone || values.phoneNumber,
      address: values.address,
    };

    const batchInformation = {
      name: values.batchSession,
      batchType: values.batchType || "SEMESTER",
      department: values.department,
      academicYear: values.academicYear || values.batchSession,
    };

    finalFormData.append("institutionInfo", JSON.stringify(institutionInfo));
    finalFormData.append("batchInformation", JSON.stringify(batchInformation));

    // Process file
    const file = formData.get("studentIdCard");
    if (file) {
      finalFormData.append("documentProof", file);
    }

    const res = await api.post("/cr-registrations", finalFormData);
    return {
      success: true,
      message: "Registration completed! Waiting for admin approval.",
      data: res,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to complete registration",
      inputs: values,
    };
  }
}

export async function forgotPassword(
  prevState: ActionState,
  payload: any,
): Promise<ActionState> {
  const values = Object.fromEntries(payload.entries());
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

    // Set sessionId in cookies for reset password flow
    const sessionId = res?.data?.sessionId;
    if (sessionId) {
      const cookieStore = await cookies();
      cookieStore.set("sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        maxAge: 3600,
      });
    }

    return { success: true, message: "Reset link sent!", data: res };
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
  payload: any,
): Promise<ActionState> {
  const values = Object.fromEntries(payload.entries());
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return { success: false, message: "Session expired", inputs: values };
  }

  const data = {
    sessionId: sessionId,
    code: values.otp || values.code,
  };

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
    const res = await api.post("/auth/verify-otp", data);
    return { success: true, message: "OTP Verified!", data: res };
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
  payload: any,
): Promise<ActionState> {
  const values = Object.fromEntries(payload.entries());

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
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to reset password",
      inputs: values,
    };
  }
}

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    //Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        success: false,
        message: "User is logged out",
      };
    }
    const res = await api.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });

    //delete old tokens
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    //set new tokens
    await setCookie("accessToken", res.data.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 3600,
    });
    await setCookie("refreshToken", res.data.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 3600,
    });

    return {
      success: true,
      message: "Token refreshed successfully!",
      data: res,
    };
  } catch (error: any) {
    console.error("Failed to refresh token", error);
    throw error;
  }
}
