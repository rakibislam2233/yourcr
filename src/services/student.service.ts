/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { api } from "./api";

export interface Student {
  id: string;
  roll: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  color: string;
  institutionId: string;
  batchId: string;
  createdAt: string;
  updatedAt: string;
}

// Get all students with caching
export async function getAllStudents(searchParams?: Record<string, string>) {
  const queryString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";

  const response = await api.get<Student[]>(
    `/users/all-students${queryString}`,
    {
      next: { tags: ["students"], revalidate: 60 },
    },
  );

  return response;
}

// Get student by ID
export async function getStudentById(id: string) {
  const response = await api.get<Student>(`/users/${id}`, {
    next: { tags: [`student-${id}`], revalidate: 60 },
  });

  return response;
}

// Create student action
export async function createStudent(prevState: any, formData: FormData) {
  try {
    const data = {
      roll: formData.get("roll"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      status: formData.get("status") || "active",
      color: formData.get("color") || "bg-blue-500",
    };

    const response = await api.post<Student>("/users/create-student", data);

    if (response.success) {
      revalidatePath("/dashboard/cr/students");
      return {
        success: true,
        message: response.message || "Student created successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to create student",
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

// Update student action
export async function updateStudent(
  id: string,
  prevState: any,
  formData: FormData,
) {
  try {
    const data = {
      roll: formData.get("roll"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      status: formData.get("status"),
      color: formData.get("color"),
    };

    const response = await api.patch<Student>(`/users/${id}`, data);

    if (response.success) {
      revalidatePath("/dashboard/cr/students");
      revalidatePath(`/dashboard/cr/students/${id}`);
      return {
        success: true,
        message: response.message || "Student updated successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update student",
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

// Delete student action
export async function deleteStudent(id: string) {
  try {
    const response = await api.delete(`/users/${id}`);

    if (response.success) {
      revalidatePath("/dashboard/cr/students");
      return {
        success: true,
        message: response.message || "Student deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete student",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
