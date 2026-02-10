"use server";

import { revalidatePath } from "next/cache";
import { api } from "./api";

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  photo?: string;
  subjects?: string[];
  color: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

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
export async function createTeacher(prevState: any, formData: FormData) {
  try {
    const response = await api.post<Teacher>("/teachers", formData);

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

// Update teacher action
export async function updateTeacher(
  id: string,
  prevState: any,
  formData: FormData,
) {
  try {
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
