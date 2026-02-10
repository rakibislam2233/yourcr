/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { api } from "./api";

export interface Routine {
  id: string;
  title: string;
  description?: string;
  type: "weekly" | "exam" | "special";
  file?: string;
  effectiveFrom: string;
  effectiveTo?: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

// Get all routines with caching
export async function getAllRoutines(searchParams?: Record<string, string>) {
  const queryString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";

  const response = await api.get<Routine[]>(`/routines${queryString}`, {
    next: { tags: ["routines"], revalidate: 120 }, // Longer cache for routines
  });

  return response;
}

// Get routine by ID
export async function getRoutineById(id: string) {
  const response = await api.get<Routine>(`/routines/${id}`, {
    next: { tags: [`routine-${id}`], revalidate: 120 },
  });

  return response;
}

// Create routine action
export async function createRoutine(prevState: any, formData: FormData) {
  try {
    const response = await api.post<Routine>("/routines", formData);

    if (response.success) {
      revalidatePath("/dashboard/cr/routine");
      revalidatePath("/dashboard/student/routine");
      return {
        success: true,
        message: response.message || "Routine created successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to create routine",
      errors: (response.data as any)?.errors,
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

// Update routine action
export async function updateRoutine(
  id: string,
  prevState: any,
  formData: FormData,
) {
  try {
    const response = await api.patch<Routine>(`/routines/${id}`, formData);

    if (response.success) {
      revalidatePath("/dashboard/cr/routine");
      revalidatePath("/dashboard/student/routine");
      revalidatePath(`/dashboard/cr/routine/${id}`);
      return {
        success: true,
        message: response.message || "Routine updated successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update routine",
      errors: (response.data as any)?.errors,
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

// Delete routine action
export async function deleteRoutine(id: string) {
  try {
    const response = await api.delete(`/routines/${id}`);

    if (response.success) {
      revalidatePath("/dashboard/cr/routine");
      revalidatePath("/dashboard/student/routine");
      return {
        success: true,
        message: response.message || "Routine deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete routine",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
