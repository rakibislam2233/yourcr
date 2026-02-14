import ManageTeachers from "@/components/dashboard/cr/Teacher/ManageTeachers";
import { getAllTeachers } from "@/services/teacher.service";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CrTeachersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const queryParams: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryParams[key] = value;
    } else if (Array.isArray(value)) {
      queryParams[key] = value[0];
    }
  });
  const response = await getAllTeachers(queryParams);

  const teachers =
    (response.data as any)?.data ||
    (Array.isArray(response.data) ? response.data : []);
  const meta = (response.data as any)?.meta || {
    page: 1,
    limit: 10,
    total: teachers.length,
    totalPages: 1,
  };

  return <ManageTeachers teachers={teachers} meta={meta} />;
}
