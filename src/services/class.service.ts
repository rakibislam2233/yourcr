/* eslint-disable @typescript-eslint/no-explicit-any */
import { Class } from "@/interface/class.interface";
import {
  createClassSchema,
  updateClassSchema,
} from "@/validation/class.validation";
import { revalidatePath } from "next/cache";
import { api } from "./api";

import { ActionState } from "@/interface/action-state.interface";

export type ClassActionState = ActionState;

// Get all classes with caching
export async function getAllClasses(searchParams?: Record<string, string>) {
  const queryString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";

  const response = await api.get<Class[]>(`/classes${queryString}`, {
    next: { tags: ["classes"], revalidate: 30 }, // Shorter cache for real-time classes
  });

  return response;
}

// Get class by ID
export async function getClassById(id: string) {
  const response = await api.get<Class>(`/classes/${id}`, {
    next: { tags: [`class-${id}`], revalidate: 30 },
  });

  return response;
}

// Create class action
export async function createClass(
  prevState: ClassActionState,
  formData: FormData,
): Promise<ClassActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = createClassSchema.safeParse(values);

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
    const response = await api.post<Class>("/classes", parsed.data);

    if (response.success) {
      revalidatePath("/dashboard/cr/classes");
      return {
        success: true,
        message: response.message || "Class scheduled successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to schedule class",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
      timestamp: Date.now(),
    };
  }
}

// Update class action
export async function updateClass(
  id: string,
  prevState: ClassActionState,
  formData: FormData,
): Promise<ClassActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = updateClassSchema.safeParse(values);

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
    const response = await api.patch<Class>(`/classes/${id}`, parsed.data);

    if (response.success) {
      revalidatePath("/dashboard/cr/classes");
      revalidatePath(`/dashboard/cr/classes/${id}`);
      return {
        success: true,
        message: response.message || "Class updated successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update class",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
      timestamp: Date.now(),
    };
  }
}

// Delete class action
export async function deleteClass(id: string) {
  try {
    const response = await api.delete(`/classes/${id}`);

    if (response.success) {
      revalidatePath("/dashboard/cr/classes");
      return {
        success: true,
        message: response.message || "Class deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete class",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
