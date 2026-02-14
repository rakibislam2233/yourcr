export type ClassType = "ONLINE" | "OFFLINE";
export type ClassStatus = "SCHEDULED" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type ClassPlatform =
  | "ZOOM"
  | "GOOGLE_MEET"
  | "MICROSOFT_TEAMS"
  | "OTHER";

export interface Class {
  id: string;
  subjectId: string;
  teacherId: string;
  classDate: string;
  startTime: string;
  endTime: string;
  classType: ClassType;
  status: ClassStatus;
  platform?: ClassPlatform;
  roomNumber?: string;
  joinLink?: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
  // Populated fields (if backend sends them)
  subject?: {
    id: string;
    name: string;
  };
  teacher?: {
    id: string;
    name: string;
  };
}
