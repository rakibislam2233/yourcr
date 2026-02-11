/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Teacher } from "@/interface/teacher.interface";
import {
  createTeacherSchema,
  updateTeacherSchema,
} from "@/validation/teacher.validation";
import { revalidatePath } from "next/cache";
import { api } from "./api";
import { ActionState } from "@/interface/action-state.interface";

export type TeacherActionState = ActionState;

// Get all teachers with caching
export async function getAllTeachers(searchParams?: Record<string, string>) {
  const queryString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";

  const response = await api.get<Teacher[]>(`/teachers${queryString}`, {
    next: { tags: ["teachers"], revalidate: 60 },
  });

  return response;
}

// Get teacher by ID
export async function getTeacherById(id: string) {
  const response = await api.get<Teacher>(`/teachers/${id}`, {
    next: { tags: [`teacher-${id}`], revalidate: 60 },
  });

  return response;
}

// Create teacher action
export async function createTeacher(
  prevState: TeacherActionState,
  formData: FormData,
): Promise<TeacherActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = createTeacherSchema.safeParse(values);
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
    // Prepare FormData with proper structure for API which might expect ACTUAL FormData for file upload
    const finalFormData = new FormData();
    // Add text fields
    Object.keys(parsed.data).forEach((key) => {
      finalFormData.append(key, (parsed.data as any)[key]);
    });
    // Add subjects specifically if not in parsed.data but in formData (usually it's a JSON string)
    const subjects = formData.get("subjects");
    if (subjects) finalFormData.append("subjects", subjects.toString());
    // Add photo file if exists
    const photo = formData.get("photo");
    if (photo && photo instanceof File && photo.size > 0) {
      finalFormData.append("photo", photo);
    }
    const response = await api.post<Teacher>("/teachers", finalFormData);
    if (response.success) {
      revalidatePath("/dashboard/cr/teachers");
      return {
        success: true,
        message: response.message || "Teacher created successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }
    return {
      success: false,
      message: response.message || "Failed to create teacher",
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

// Update teacher action
export async function updateTeacher(
  id: string,
  prevState: TeacherActionState,
  formData: FormData,
): Promise<TeacherActionState> {
  const values = Object.fromEntries(formData.entries());
  const parsed = updateTeacherSchema.safeParse(values);

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
    // We send formData as-is because it handles multipart/form-data for files automatically
    const response = await api.patch<Teacher>(`/teachers/${id}`, formData);

    if (response.success) {
      revalidatePath("/dashboard/cr/teachers");
      revalidatePath(`/dashboard/cr/teachers/${id}`);
      return {
        success: true,
        message: response.message || "Teacher updated successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update teacher",
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

// Delete teacher action
export async function deleteTeacher(id: string) {
  try {
    const response = await api.delete(`/teachers/${id}`);

    if (response.success) {
      revalidatePath("/dashboard/cr/teachers");
      return {
        success: true,
        message: response.message || "Teacher deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete teacher",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
