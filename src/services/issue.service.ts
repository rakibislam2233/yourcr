/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidatePath } from "next/cache";
import { api } from "./api";
import { Issue } from "@/interface/issue.interface";
import { ActionState } from "@/interface/action-state.interface";
import { issueSchema } from "@/validation/issue.validation";

export type IssueActionState = ActionState;

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
export async function createIssue(
  prevState: IssueActionState,
  formData: FormData,
): Promise<IssueActionState> {
  try {
    const cleanFormData = new FormData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const priority = formData.get("priority") as string;
    const file = formData.get("file") as File;

    // Validation
    const validatedFields = issueSchema.safeParse({
      title,
      description,
      type,
      priority,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid form data",
        errors: validatedFields.error.flatten().fieldErrors as any,
        inputs: { title, description, type, priority },
        timestamp: Date.now(),
      };
    }

    if (title) cleanFormData.append("title", title);
    if (description) cleanFormData.append("description", description);
    if (type) cleanFormData.append("type", type);
    if (priority) cleanFormData.append("priority", priority);
    
    if (file && file.size > 0) {
      cleanFormData.append("file", file);
    }

    const response = await api.post<Issue>("/issues", cleanFormData);

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
  prevState: IssueActionState,
  formData: FormData,
): Promise<IssueActionState> {
  try {
    const cleanFormData = new FormData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const priority = formData.get("priority") as string;
    const status = formData.get("status") as string;
    const resolution = formData.get("resolution") as string;
    const file = formData.get("file") as File;

    // Validation
    const validatedFields = issueSchema.safeParse({
      title,
      description,
      type,
      priority,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid form data",
        errors: validatedFields.error.flatten().fieldErrors as any,
        inputs: { title, description, type, priority, status, resolution },
        timestamp: Date.now(),
      };
    }

    if (title) cleanFormData.append("title", title);
    if (description) cleanFormData.append("description", description);
    if (type) cleanFormData.append("type", type);
    if (priority) cleanFormData.append("priority", priority);
    if (status) cleanFormData.append("status", status);
    if (resolution) cleanFormData.append("resolution", resolution);
    
    if (file && file.size > 0) {
      cleanFormData.append("file", file);
    }

    const response = await api.patch<Issue>(`/issues/${id}`, cleanFormData);

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
