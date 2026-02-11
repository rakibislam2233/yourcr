import ManageStudents from "@/components/dashboard/cr/Student/ManageStudents";
import { getAllStudents } from "@/services/student.service";

export default async function CrStudentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const result = await getAllStudents(params);
  const students = result.data || [];
  const meta = result.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return <ManageStudents students={students} meta={meta} />;
}
