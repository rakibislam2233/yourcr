import ManageStudents from "@/components/dashboard/cr/Student/ManageStudents";
import { getAllStudents } from "@/services/student.service";

export default async function CrStudentsPage({
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
  const result = await getAllStudents(queryParams);
  const students = result?.data || [];
  const meta = result?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return <ManageStudents students={students} meta={meta} />;
}
