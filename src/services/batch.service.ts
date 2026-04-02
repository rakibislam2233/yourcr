"use server";

import { api } from "./api";

// Fetch batches for a user
export async function getUserBatches(userId: string) {
  try {
    const res = await api.get(`/batches/user/${userId}`);
    if (res.success) return res.data;
    return [];
  } catch (error: any) {
    console.error("Failed to fetch user batches:", error.message);
    return [];
  }
}
