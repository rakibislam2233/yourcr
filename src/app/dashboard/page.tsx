import { redirect } from "next/navigation";

export default function DashboardPage() {
  // In production, check auth and redirect based on role
  // For now, redirect to auth page
  redirect("/auth");
}
