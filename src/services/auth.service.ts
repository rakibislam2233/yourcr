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
import { cookies } from "next/headers";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: any;
  data?: any;
  timestamp?: number;
};

// Helper to map backend paths to frontend routes
const mapRoute = (backendPath: string) => {
  if (backendPath === "/verify-email") return "/auth/cr-register/verify-email";
  if (backendPath === "/cr-registration/complete-profile")
    return "/auth/cr-register/complete-profile";
  if (backendPath === "/cr-registration/pending")
    return "/auth/cr-register/pending";
  return backendPath;
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
      timestamp: Date.now(),
    };
  }

  try {
    const res = await api.post("/auth/login", parsed.data);
    const loginData = res.data;

    // 1. Handle Email Verification - Set sessionId and return redirect
    if (loginData?.isEmailVerified === false) {
      if (loginData.sessionId) {
        await setCookie("sessionId", loginData.sessionId, {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 3600,
          path: "/",
        });
      }
      return {
        success: true,
        message: res.message || "Please verify your email.",
        data: { redirect: "/auth/cr-register/verify-email" },
        timestamp: Date.now(),
      };
    }

    // 2. Save tokens if they exist (important for incomplete profiles that need to redirect)
    if (loginData?.tokens) {
      const isProduction = process.env.NODE_ENV === "production";
      await setCookie("accessToken", loginData.tokens.accessToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });

      await setCookie("refreshToken", loginData.tokens.refreshToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600 * 24 * 90,
        path: "/",
      });
    }

    // 3. Handle Profile Completion
    if (loginData?.isRegistrationComplete === false) {
      return {
        success: true,
        message: res.message,
        data: { redirect: "/auth/cr-register/complete-profile" },
        timestamp: Date.now(),
      };
    }

    // 4. Final Success Case
    return {
      success: true,
      message: res.message,
      data: loginData,
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to login",
      inputs: values,
      timestamp: Date.now(),
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
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Registration failed",
      inputs: values,
      timestamp: Date.now(),
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
    // 1. Construct the payload structure backend expects
    const institutionInfo = {
      name: values.institutionName,
      type: values.institutionType,
      contactEmail: values.institutionEmail,
      contactPhone: values.institutionPhone,
      address: values.address,
    };

    const batchInformation = {
      name: values.name, // Matches AcademicStep 'name' field
      batchType: values.batchType,
      department: values.department,
      academicYear: values.academicYear,
    };

    // 2. Prepare final FormData for submission
    const finalFormData = new FormData();
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
      timestamp: Date.now(),
    };
  } catch (error: any) {
    console.error("Complete Profile Error:", error);
    return {
      success: false,
      message: error.message || "Failed to complete registration",
      inputs: values,
      timestamp: Date.now(),
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

    return {
      success: true,
      message: "Reset link sent!",
      data: res,
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to send link",
      inputs: values,
      timestamp: Date.now(),
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

    // If verification is successful, save tokens if they exist in the response
    if (res?.data?.tokens) {
      const isProduction = process.env.NODE_ENV === "production";
      await setCookie("accessToken", res.data.tokens.accessToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });

      await setCookie("refreshToken", res.data.tokens.refreshToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600 * 24 * 90,
        path: "/",
      });

      // Verification successful, we can remove the sessionId
      await deleteCookie("sessionId");
    }

    return {
      success: true,
      message: res?.message,
      data: {
        ...res?.data,
        redirect: res?.data?.redirect ? mapRoute(res.data.redirect) : undefined,
      },
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Invalid OTP",
      inputs: values,
      timestamp: Date.now(),
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
      timestamp: Date.now(),
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
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to reset password",
      inputs: values,
      timestamp: Date.now(),
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

    const isProduction = process.env.NODE_ENV === "production";
    //set new tokens
    await setCookie("accessToken", res.data.accessToken, {
      secure: isProduction,
      httpOnly: true,
      maxAge: 3600,
      path: "/",
    });
    await setCookie("refreshToken", res.data.refreshToken, {
      secure: isProduction,
      httpOnly: true,
      maxAge: 3600 * 24 * 90,
      path: "/",
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
