export interface Assessment {
  id: string;
  title: string;
  subject: string;
  subjectId?: string;
  type: string;
  date: string;
  deadline?: string;
  time?: string;
  venue?: string;
  totalMarks: number;
  description?: string;
  files?: string[];
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}
