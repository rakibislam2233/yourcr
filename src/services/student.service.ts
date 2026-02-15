/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  createStudentSchema,
  updateStudentSchema,
} from "@/validation/student.validation";
import { revalidateTag } from "next/cache";
import { api } from "./api";
import { ActionState } from "@/interface/action-state.interface";
export type StudentActionState = ActionState;

// Get all students with caching
export async function getAllStudents(searchParams?: Record<string, string>) {
  try {
    const queryString = searchParams
      ? `?${new URLSearchParams(searchParams).toString()}`
      : "";

    const response = await api.get(`/users/all-students${queryString}`, {
      next: { tags: ["students"], revalidate: 60 },
    });

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Failed to fetch students",
        meta: response.meta,
        timestamp: Date.now(),
        data: [],
      };
    }
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch students",
      timestamp: Date.now(),
      data: [],
    };
  }
}

// Get student by ID
export async function getStudentById(id: string) {
  const response = await api.get(`/users/${id}`, {
    next: { tags: [`student-${id}`], revalidate: 60 },
  });

  if (!response.success) {
    return {
      success: false,
      message: response.message || "Failed to fetch student",
      timestamp: Date.now(),
      data: null,
    };
  }

  return response;
}

// Create student action
export async function createStudent(
  prevState: StudentActionState,
  formData: FormData,
): Promise<StudentActionState> {
  try {
    const values = Object.fromEntries(formData.entries());

    const parsed = createStudentSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid fields",
        errors: parsed.error.flatten().fieldErrors,
        inputs: values,
        timestamp: Date.now(),
      };
    }

    const response = await api.post("/users/create-student", parsed.data);

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Failed to create student",
        timestamp: Date.now(),
      };
    }
    // Revalidate tags
    revalidateTag("students", { expire: 0 });
    return {
      success: true,
      message: response.message || "Student created successfully",
      data: response.data,
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
  prevState: StudentActionState,
  formData: FormData,
): Promise<StudentActionState> {
  try {
    const values = Object.fromEntries(formData.entries());

    const parsed = updateStudentSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid fields",
        errors: parsed.error.flatten().fieldErrors,
        inputs: values,
        timestamp: Date.now(),
      };
    }
    const response = await api.patch(`/users/${id}`, parsed.data);

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Failed to update student",
        timestamp: Date.now(),
      };
    }
    // Revalidate tags
    revalidateTag("students", { expire: 0 });
    revalidateTag(`student-${id}`, { expire: 0 });
    return {
      success: true,
      message: response.message || "Student updated successfully",
      data: response.data,
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

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Failed to delete student",
        timestamp: Date.now(),
      };
    }
    // Revalidate tags
    revalidateTag("students", { expire: 0 });
    revalidateTag(`student-${id}`, { expire: 0 });
    return {
      success: true,
      message: response.message || "Student deleted successfully",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
