export interface Notice {
  id: string;
  title: string;
  content: string;
  type: "GENERAL" | "URGENT" | "EVENT" | "EXAM" | "HOLIDAY";
  fileUrl: string | null;
  isActive: boolean;
  viewCount: number;
  batchId?: string;
  postedById?: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}
