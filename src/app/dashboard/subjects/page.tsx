import ManageSubjects from "@/components/dashboard/cr/Subject/ManageSubjects";
import { getAllSubjects } from "@/services/subject.service";

export default async function CrSubjectsPage({
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
  const subjects = await getAllSubjects(queryParams);
  const meta = subjects.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return <ManageSubjects subjects={subjects.data} meta={meta} />;
}
