export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  credits: number;
  type: string;
  color: string;
  schedule?: string;
  institutionId: string;
}
