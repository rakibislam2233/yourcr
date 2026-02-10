export interface Institution {
  id: string;
  name: string;
  shortName?: string;
  establishedYear?: string | number;
  type: string;
  logo: string | null;
  contactEmail: string;
  contactPhone: string;
  website: string | null;
  address: string;
  createdAt: string;
  updatedAt: string;
}
