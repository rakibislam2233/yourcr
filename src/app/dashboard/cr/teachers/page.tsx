import ManageTeachers from "@/components/dashboard/cr/ManageTeachers";
import { getAllTeachers } from "@/services/teacher.service";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CrTeachersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Convert searchParams to Record<string, string>
  const queryParams: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryParams[key] = value;
    } else if (Array.isArray(value)) {
      queryParams[key] = value[0];
    }
  });

  // Fetch teachers with SSR
  const response = await getAllTeachers(queryParams);
  const teachers = response.success ? response.data : [];

  return <ManageTeachers initialTeachers={teachers} />;
}
