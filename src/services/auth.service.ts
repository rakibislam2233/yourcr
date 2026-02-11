/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { api } from "@/services/api";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { deleteCookie, getCookie, setCookie } from "@/utils/tokenHandlers";
import {
  forgotPasswordSchema,
  loginSchema,
  registrationSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "@/validation/auth.validation";
import { cookies } from "next/headers";
import { ActionState } from "@/interface/action-state.interface";

export type AuthActionState = ActionState;

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
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
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
    const loginPayload = {
      ...parsed.data,
      webPushToken: formData.get("webPushToken"),
    };
    const res = await api.post("/auth/login", loginPayload);
    if (!res.success) {
      return {
        success: false,
        message: res.message || "Failed to login",
        inputs: values,
        timestamp: Date.now(),
      };
    }

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

    // 2.if isRegistrationComplete is false than set registrationSessionId in cookie
    if (loginData?.isRegistrationComplete === false) {
      await deleteCookie("sessionId");
      // set registrationSessionId in cookie
      await setCookie("registrationSessionId", loginData.sessionId, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });
      return {
        success: true,
        message: res.message,
        data: { redirect: "/auth/cr-register/complete-profile" },
        timestamp: Date.now(),
      };
    }

    // 3. Save tokens if they exist
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
      // set userRole in cookie
      await setCookie("userRole", loginData.user.role, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });
    }
    // 5. Final Success Case (Successful Login)
    await deleteCookie("sessionId");
    const userRole = loginData?.user?.role;
    return {
      success: true,
      message: res.message || "Logged in successfully",
      data: {
        ...loginData,
        redirect: userRole ? getDefaultDashboardRoute(userRole) : "/dashboard",
      },
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
  prevState: AuthActionState,
  payload: any,
): Promise<AuthActionState> {
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

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Registration failed",
        inputs: values,
        timestamp: Date.now(),
      };
    }

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
      data: res.data,
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
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const values = Object.fromEntries(formData.entries());

  try {
    //get registrationSessionId
    const registrationSessionId = await getCookie("registrationSessionId");
    if (!registrationSessionId) {
      return {
        success: false,
        message: "Registration session expired. Please login again.",
        timestamp: Date.now(),
      };
    }
    // 1. Construct the payload structure backend expects
    const institutionInfo = {
      name: values.institutionName,
      type: values.institutionType,
      contactEmail: values.contactEmail,
      contactPhone: values.contactPhone,
      address: values.address,
    };
    const batchInformation = {
      batchType: values.batchType,
      department: values.department,
      session: values.session,
      academicYear: values.academicYear,
      semester: values.semester || undefined,
      shift: values.shift || undefined,
      group: values.group || undefined,
    };

    // 2. Prepare final FormData for submission
    const finalFormData = new FormData();
    finalFormData.append("institutionInfo", JSON.stringify(institutionInfo));
    finalFormData.append("batchInformation", JSON.stringify(batchInformation));
    finalFormData.append("sessionId", registrationSessionId);

    // Process file
    const file = formData.get("studentIdCard");
    if (file) {
      finalFormData.append("documentProof", file);
    }
    const res = await api.post("/cr-registrations", finalFormData);

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Registration completion failed",
        timestamp: Date.now(),
      };
    }

    //delete registrationSessionId from cookie
    await deleteCookie("registrationSessionId");
    return {
      success: true,
      message: "Registration completed! Waiting for admin approval.",
      data: res.data,
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
  prevState: AuthActionState,
  payload: any,
): Promise<AuthActionState> {
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
      message: res.message || "Reset link sent!",
      data: res.data,
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
  prevState: AuthActionState,
  payload: any,
): Promise<AuthActionState> {
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
    if (!res.success) {
      return {
        success: false,
        message: res.message || "Invalid OTP",
        inputs: values,
        timestamp: Date.now(),
      };
    }

    const verifyData = res?.data;
    // 1.if isRegistrationComplete is false than set registrationSessionId in cookie
    if (verifyData?.isRegistrationComplete === false) {
      await deleteCookie("sessionId");
      // set registrationSessionId in cookie
      await setCookie("registrationSessionId", verifyData.sessionId, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 3600,
        path: "/",
      });
      return {
        success: true,
        message: res.message,
        data: { redirect: "/auth/cr-register/complete-profile" },
        timestamp: Date.now(),
      };
    }
    // 2. Handle Forgot Password Flow (resetToken)
    if (verifyData?.resetToken) {
      const isProduction = process.env.NODE_ENV === "production";
      await setCookie("resetPasswordToken", verifyData.resetToken, {
        secure: isProduction,
        httpOnly: true,
        maxAge: 3600, // 1 hour
        path: "/",
      });

      await deleteCookie("sessionId");

      return {
        success: true,
        message:
          res.message || "OTP verified. You can now reset your password.",
        data: { redirect: "/auth/reset-password" },
        timestamp: Date.now(),
      };
    }
    return {
      success: true,
      message: res.message,
      data: {
        ...verifyData,
        redirect: verifyData?.redirect
          ? mapRoute(verifyData.redirect)
          : undefined,
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
  prevState: AuthActionState,
  payload: any,
): Promise<AuthActionState> {
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
    const resetToken = await getCookie("resetPasswordToken");

    if (!resetToken) {
      return {
        success: false,
        message: "Reset token expired or missing. Please try again.",
        timestamp: Date.now(),
      };
    }

    const res = await api.post("/auth/reset-password", {
      ...parsed.data,
      token: resetToken,
    });

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Password reset failed",
        timestamp: Date.now(),
      };
    }

    // Success - clear the token
    await deleteCookie("resetPasswordToken");

    return {
      success: true,
      message: "Password reset successful!",
      data: res.data,
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
    if (res.success) {
      console.log(
        "Access and Refresh Tokens Set",
        res.data.accessToken,
        res.data.refreshToken,
      );
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
    }
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

// Logout
export async function logoutUser() {
  try {
    const refreshToken = await getCookie("refreshToken");
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.error("Backend logout failed", error);
  } finally {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    await deleteCookie("userRole");
  }
  return { success: true };
}
