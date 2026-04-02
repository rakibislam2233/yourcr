export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  type: "ACADEMIC" | "TECHNICAL" | "ADMINISTRATIVE" | "OTHER";
  fileUrl?: string | null;
  studentId: string;
  batchId?: string;
  resolution?: string | null;
  createdAt: string;
  updatedAt: string;
}
