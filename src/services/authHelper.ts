"use server";
import { cookies } from "next/headers";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

export async function getNewAccessToken() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const res = await fetch(`${BACKEND_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: refreshToken ? `refreshToken=${refreshToken}` : "",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
}
