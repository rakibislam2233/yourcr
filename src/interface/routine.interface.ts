
export enum RoutineType {
  CLASS = "CLASS",
  EXAM = "EXAM",
}
export interface Routine {
  id: string;
  name: string;
  fileUrl: string;
  type: RoutineType;
  updatedAt: string;
}
