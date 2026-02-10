/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "@/utils/tokenHandlers";
import { api } from "./api";

export async function getMyProfile() {
  const accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");
  if (!accessToken && !refreshToken) {
    return null;
  }
  try {
    const res = await api.get("/users/profile/me");
    return res;
  } catch (error: any) {
    console.error("Failed to fetch profile:", error.message);
    return null;
  }
}

export async function updateMyProfile(data: any) {
  const accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");

  if (!accessToken && !refreshToken) {
    throw new Error("User not authenticated");
  }

  try {
    const res = await api.patch("/users/profile/me", data);
    return res;
  } catch (error: any) {
    console.error("Failed to update profile:", error.message);
    throw error;
  }
}
