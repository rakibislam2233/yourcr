import EditAssessmentForm from "@/components/dashboard/cr/Assessment/EditAssessmentForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getAssessmentById } from "@/services/assessment.service";
import { getAllSubjects } from "@/services/subject.service";
import { ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAssessmentPage({ params }: PageProps) {
  const { id } = await params;
  // Fetch assessment and subjects in parallel
  const [assessmentRes, subjectsRes] = await Promise.all([
    getAssessmentById(id),
    getAllSubjects(),
  ]);
  if (!assessmentRes.success || !assessmentRes.data) {
    return notFound();
  }
  const assessment = assessmentRes.data;
  const subjects = subjectsRes.data || [];

  return (
    <section className="w-full space-y-6">
      <PageHeader
        title="Edit Assessment"
        description="Update assessment information"
        icon={<ClipboardList />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Assessments", href: "/dashboard/cr/assessments" },
          { label: "Edit Assessment" },
        ]}
        action={
          <Link href="/dashboard/cr/assessments">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />
      <EditAssessmentForm assessment={assessment} subjects={subjects} />
    </section>
  );
}
