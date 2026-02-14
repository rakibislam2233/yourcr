import ManageTeachers from "@/components/dashboard/cr/Teacher/ManageTeachers";
import { getAllTeachers } from "@/services/teacher.service";

export default async function CrTeachersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const queryParams: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryParams[key] = value;
    } else if (Array.isArray(value)) {
      queryParams[key] = value[0];
    }
  });
  const result = await getAllTeachers(queryParams);
  const teachers = result?.data || [];
  const meta = result?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return <ManageTeachers teachers={teachers} meta={meta} />;
}
