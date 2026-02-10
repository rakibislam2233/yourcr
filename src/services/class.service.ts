/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { api } from "./api";

export interface Class {
  id: string;
  subject: string;
  teacher: string;
  date: string;
  startTime: string;
  endTime: string;
  platform: string;
  link: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

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
export async function createClass(prevState: any, formData: FormData) {
  try {
    const data = {
      subject: formData.get("subject"),
      teacher: formData.get("teacher"),
      date: formData.get("date"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      platform: formData.get("platform"),
      link: formData.get("link"),
    };

    const response = await api.post<Class>("/classes", data);

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

// Update class action
export async function updateClass(
  id: string,
  prevState: any,
  formData: FormData,
) {
  try {
    const data = {
      subject: formData.get("subject"),
      teacher: formData.get("teacher"),
      date: formData.get("date"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      platform: formData.get("platform"),
      link: formData.get("link"),
    };

    const response = await api.patch<Class>(`/classes/${id}`, data);

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
