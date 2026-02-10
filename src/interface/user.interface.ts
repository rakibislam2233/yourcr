import { Batch } from "./batch.interface";
import { Institution } from "./instituion.interface";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  status: string;
  role: string;
  isCr: boolean;
  studentRoll?: string;
  institutionId: string;
  currentBatchId: string;
  createdAt: string;
  profileImage?: string;
  institution?: Institution;
  currentBatch?: Batch;
}
