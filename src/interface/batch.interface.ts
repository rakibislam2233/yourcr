export interface Batch {
  id: string;
  institutionId: string;
  batchType: string;
  department: string;
  session: string;
  academicYear: string;
  semester?: string;
  shift?: string;
  group?: string;
  isActive: boolean;
  isArchived: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
