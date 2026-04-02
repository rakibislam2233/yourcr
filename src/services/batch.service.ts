"use server";

import { revalidateTag } from "next/cache";
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

// Switch the user's active batch
export async function switchBatch(batchId: string) {
  try {
    const res = await api.patch("/users/switch-batch", { batchId });
    if (!res.success) {
      throw new Error(res.message || "Failed to switch batch");
    }
    // Revalidate relevant cache tags after switching batch
    revalidateTag("profile");
    revalidateTag("dashboard");
    return res.data;
  } catch (error: any) {
    console.error("Failed to switch batch:", error.message);
    throw error;
  }
}
