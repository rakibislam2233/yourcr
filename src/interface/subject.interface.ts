export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photoUrl: string;
  };
  credit: number;
  description: string;
  roomNumber: string;
  isDepartmental: boolean;
  institutionId: string;
}
