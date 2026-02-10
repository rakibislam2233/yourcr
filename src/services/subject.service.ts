"use server";

import { revalidatePath } from "next/cache";
import { api } from "./api";

export interface Subject {
  id: string;
  code: string;
  name: string;
  teacher: string;
  credits: number;
  type: string;
  color: string;
  schedule: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

// Get all subjects with caching
export async function getAllSubjects(searchParams?: Record<string, string>) {
  const queryString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";

  const response = await api.get<Subject[]>(`/subjects${queryString}`, {
    next: { tags: ["subjects"], revalidate: 60 },
  });

  return response;
}

// Get subject by ID
export async function getSubjectById(id: string) {
  const response = await api.get<Subject>(`/subjects/${id}`, {
    next: { tags: [`subject-${id}`], revalidate: 60 },
  });

  return response;
}

// Create subject action
export async function createSubject(prevState: any, formData: FormData) {
  try {
    const data = {
      code: formData.get("code"),
      name: formData.get("name"),
      teacher: formData.get("teacher"),
      credits: Number(formData.get("credits")),
      type: formData.get("type"),
      color: formData.get("color"),
      schedule: formData.get("schedule"),
    };

    const response = await api.post<Subject>("/subjects", data);

    if (response.success) {
      revalidatePath("/dashboard/cr/subjects");
      return {
        success: true,
        message: response.message || "Subject created successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to create subject",
      errors: response.data?.errors,
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

// Update subject action
export async function updateSubject(
  id: string,
  prevState: any,
  formData: FormData,
) {
  try {
    const data = {
      code: formData.get("code"),
      name: formData.get("name"),
      teacher: formData.get("teacher"),
      credits: Number(formData.get("credits")),
      type: formData.get("type"),
      color: formData.get("color"),
      schedule: formData.get("schedule"),
    };

    const response = await api.patch<Subject>(`/subjects/${id}`, data);

    if (response.success) {
      revalidatePath("/dashboard/cr/subjects");
      revalidatePath(`/dashboard/cr/subjects/${id}`);
      return {
        success: true,
        message: response.message || "Subject updated successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update subject",
      errors: response.data?.errors,
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

// Delete subject action
export async function deleteSubject(id: string) {
  try {
    const response = await api.delete(`/subjects/${id}`);

    if (response.success) {
      revalidatePath("/dashboard/cr/subjects");
      return {
        success: true,
        message: response.message || "Subject deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete subject",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
