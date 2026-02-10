/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // Prepare FormData with proper structure
    const finalFormData = new FormData();

    // Add text fields
    const name = formData.get("name");
    const designation = formData.get("designation");
    const department = formData.get("department");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const subjects = formData.get("subjects");

    if (name) finalFormData.append("name", name.toString());
    if (designation)
      finalFormData.append("designation", designation.toString());
    if (department) finalFormData.append("department", department.toString());
    if (email) finalFormData.append("email", email.toString());
    if (phone) finalFormData.append("phone", phone.toString());
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
