export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  file?: string;
  studentId: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}
