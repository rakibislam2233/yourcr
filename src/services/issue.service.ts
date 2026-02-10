/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { api } from "./api";

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  file?: string;
  studentId: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

// Get all issues with caching
export async function getAllIssues(searchParams?: Record<string, string>) {
  const queryString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";

  const response = await api.get<Issue[]>(`/issues${queryString}`, {
    next: { tags: ["issues"], revalidate: 30 },
  });

  return response;
}

// Get issue by ID
export async function getIssueById(id: string) {
  const response = await api.get<Issue>(`/issues/${id}`, {
    next: { tags: [`issue-${id}`], revalidate: 30 },
  });

  return response;
}

// Create issue action
export async function createIssue(prevState: any, formData: FormData) {
  try {
    const response = await api.post<Issue>("/issues", formData);

    if (response.success) {
      revalidatePath("/dashboard/cr/issues");
      revalidatePath("/dashboard/student/issues");
      return {
        success: true,
        message: response.message || "Issue created successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to create issue",
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

// Update issue action
export async function updateIssue(
  id: string,
  prevState: any,
  formData: FormData,
) {
  try {
    const response = await api.patch<Issue>(`/issues/${id}`, formData);

    if (response.success) {
      revalidatePath("/dashboard/cr/issues");
      revalidatePath("/dashboard/student/issues");
      revalidatePath(`/dashboard/cr/issues/${id}`);
      return {
        success: true,
        message: response.message || "Issue updated successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update issue",
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

// Delete issue action
export async function deleteIssue(id: string) {
  try {
    const response = await api.delete(`/issues/${id}`);

    if (response.success) {
      revalidatePath("/dashboard/cr/issues");
      revalidatePath("/dashboard/student/issues");
      return {
        success: true,
        message: response.message || "Issue deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete issue",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
