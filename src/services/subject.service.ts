/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "@/validation/subject.validation";
import { revalidatePath } from "next/cache";
import { api } from "./api";

import { Subject } from "@/interface/subject.interface";
export type { Subject };

import { ActionState } from "@/interface/action-state.interface";

export type SubjectActionState = ActionState;

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
export async function createSubject(
  prevState: SubjectActionState,
  formData: FormData,
): Promise<SubjectActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = createSubjectSchema.safeParse(values);

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
    const response = await api.post<Subject>("/subjects", parsed.data);

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
  prevState: SubjectActionState,
  formData: FormData,
): Promise<SubjectActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = updateSubjectSchema.safeParse(values);

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
    const response = await api.patch<Subject>(`/subjects/${id}`, parsed.data);

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
