export type AssessmentType =
  | "EXAM"
  | "ASSIGNMENT"
  | "QUIZ"
  | "LAB"
  | "PRESENTATION"
  | "PROJECT"
  | "OTHER";

export type AssessmentStatus =
  | "SCHEDULED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

export interface AssessmentSubject {
  id: string;
  name: string;
  code?: string;
  credit?: number;
}

export interface Assessment {
  id: string;
  subjectId?: string;
  title: string;
  type: AssessmentType | string;
  description?: string;
  totalMarks: number | string;
  date?: string;
  deadline?: string;
  fileUrls?: string[];
  files?: string[];
  status?: AssessmentStatus | string;
  batchId?: string;
  createdById?: string;
  institutionId?: string;
  createdAt: string;
  updatedAt: string;
  subject?: AssessmentSubject | string;

  // Legacy optional fields kept for compatibility with older UI blocks.
  time?: string;
  venue?: string;
}
