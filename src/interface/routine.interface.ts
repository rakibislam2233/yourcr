export interface Routine {
  id: string;
  title: string;
  description?: string;
  type: "weekly" | "exam" | "special";
  file?: string;
  effectiveFrom: string;
  effectiveTo?: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoutineItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  type: string;
  color: string;
  institutionId: string;
}
