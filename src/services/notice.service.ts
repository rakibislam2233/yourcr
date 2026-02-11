/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { api } from "./api";

import { Notice } from "@/interface/notice.interface";
export type { Notice };

export type NoticeActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: any;
  data?: any;
  timestamp?: number;
};

// Get all notices with caching
export async function getAllNotices(searchParams?: Record<string, string>) {
  const queryString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : "";

  const response = await api.get<Notice[]>(`/notices${queryString}`, {
    next: { tags: ["notices"], revalidate: 30 }, // Shorter cache for notices
  });

  return response;
}

// Get notice by ID
export async function getNoticeById(id: string) {
  const response = await api.get<Notice>(`/notices/${id}`, {
    next: { tags: [`notice-${id}`], revalidate: 30 },
  });

  return response;
}

// Create notice action
export async function createNotice(
  prevState: NoticeActionState,
  formData: FormData,
): Promise<NoticeActionState> {
  try {
    // FormData will be sent as-is to handle file uploads
    const response = await api.post<Notice>("/notices", formData);

    if (response.success) {
      revalidatePath("/dashboard/cr/notices");
      return {
        success: true,
        message: response.message || "Notice created successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to create notice",
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

// Update notice action
export async function updateNotice(
  id: string,
  prevState: NoticeActionState,
  formData: FormData,
): Promise<NoticeActionState> {
  try {
    const response = await api.patch<Notice>(`/notices/${id}`, formData);

    if (response.success) {
      revalidatePath("/dashboard/cr/notices");
      revalidatePath(`/dashboard/cr/notices/${id}`);
      return {
        success: true,
        message: response.message || "Notice updated successfully",
        data: response.data,
        timestamp: Date.now(),
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update notice",
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

// Delete notice action
export async function deleteNotice(id: string) {
  try {
    const response = await api.delete(`/notices/${id}`);

    if (response.success) {
      revalidatePath("/dashboard/cr/notices");
      return {
        success: true,
        message: response.message || "Notice deleted successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to delete notice",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
