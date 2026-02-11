import AddAssessmentForm from "@/components/dashboard/cr/Assessment/AddAssessmentForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getAllSubjects } from "@/services/subject.service";
import { ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";

export default async function AddAssessmentPage() {
  const subjectsRes = await getAllSubjects();
  const subjects = subjectsRes.data || [];

  return (
    <section className="w-full space-y-6">
      <PageHeader
        title="Create Assessment"
        description="Create a new exam, assignment, or quiz"
        icon={<ClipboardList />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Assessments", href: "/dashboard/cr/assessments" },
          { label: "Create Assessment" },
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
      <AddAssessmentForm subjects={subjects} />
    </section>
  );
}
