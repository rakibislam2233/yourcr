/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "./api";

export async function getMyProfile() {
  try {
    const res = await api.get("/users/profile/me");
    return res.data;
  } catch (error: any) {
    console.error("Failed to fetch profile", error);
    throw error;
  }
}

export async function updateMyProfile(data: any) {
  try {
    const res = await api.patch("/users/profile/me", data);
    return res.data;
  } catch (error: any) {
    console.error("Failed to update profile", error);
    throw error;
  }
}
