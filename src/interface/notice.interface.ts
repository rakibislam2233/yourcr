export interface Notice {
  id: string;
  title: string;
  content: string;
  type: "important" | "info" | "general" | "alert";
  pinned: boolean;
  file?: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}
