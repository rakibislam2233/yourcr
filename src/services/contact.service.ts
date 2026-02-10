/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { api } from "@/services/api";
import { contactValidationSchema } from "@/validation/contact.validation";
export type ContactActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: {
    fullName?: string;
    email?: string;
    phone?: string;
    description?: string;
  };
  data?: unknown;
};

export async function submitContactForm(
  prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const values = Object.fromEntries(formData.entries()) as Record<
    string,
    unknown
  >;

  const parsed = contactValidationSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: parsed.error.flatten().fieldErrors,
      inputs: values as ContactActionState["inputs"],
    };
  }

  try {
    const res = await api.post("/contact/submit", parsed.data);
    if (!res.success) {
      return {
        success: false,
        message: res.message || "Failed to send message",
        inputs: values as ContactActionState["inputs"],
      };
    }
    return {
      success: true,
      message: "Your message has been sent successfully!",
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      inputs: values as ContactActionState["inputs"],
    };
  }
}
