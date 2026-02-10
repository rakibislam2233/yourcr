"use server";

import { revalidatePath } from "next/cache";
import { api } from "./api";

export interface Assessment {
  id: string;
  title: string;
  subject: string;
  type: string;
  date: string;
  time: string;
  totalMarks: number;
  venue?: string;
  description?: string;
  files?: string[];
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

// Get all assessments with caching
export async function getAllAssessments(searchParams?: Record<string, string>) {
  const queryString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";

  const response = await api.get<Assessment[]>(`/assessments${queryString}`, {
    next: { tags: ["assessments"], revalidate: 60 },
  });

  return response;
}

// Get assessment by ID
export async function getAssessmentById(id: string) {
  const response = await api.get<Assessment>(`/assessments/${id}`, {
    next: { tags: [`assessment-${id}`], revalidate: 60 },
  });

  return response;
}

// Create assessment action
export async function createAssessment(prevState: any, formData: FormData) {
  try {
    // FormData will be sent as-is to handle file uploads
    const response = await api.post<Assessment>("/assessments", formData);

    if (response.success) {
      revalidatePath("/dashboard/cr/assessments");
      return {
        success: true,
        message: response.message || "Assessment created successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to create assessment",
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

// Update assessment action
export async function updateAssessment(
  id: string,
  prevState: any,
  formData: FormData,
) {
  try {
    const response = await api.patch<Assessment>(
      `/assessments/${id}`,
      formData,
    );

    if (response.success) {
      revalidatePath("/dashboard/cr/assessments");
      revalidatePath(`/dashboard/cr/assessments/${id}`);
      return {
        success: true,
        message: response.message || "Assessment updated successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update assessment",
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

// Delete assessment action
export async function deleteAssessment(id: string) {
  try {
    const response = await api.delete(`/assessments/${id}`);

    if (response.success) {
      revalidatePath("/dashboard/cr/assessments");
      return {
        success: true,
        message: response.message || "Assessment deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete assessment",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
