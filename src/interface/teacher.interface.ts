export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  photoUrl?: string;
  subjects?: string[];
  color: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}
