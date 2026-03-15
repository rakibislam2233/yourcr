import ManageAssessments from "@/components/dashboard/cr/ManageAssessments";
import { getAllAssessments } from "@/services/assessment.service";

export default async function CrAssessmentsPage({
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

  const result = await getAllAssessments(queryParams);
  const assessments = result.success ? result.data || [] : [];
  const meta = result.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return <ManageAssessments initialAssessments={assessments} meta={meta} />;
}
