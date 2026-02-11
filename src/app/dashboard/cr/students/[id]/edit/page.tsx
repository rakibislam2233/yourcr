import EditStudentForm from "@/components/dashboard/cr/Student/EditStudentForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getStudentById } from "@/services/student.service";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getStudentById(id);

  if (!response.success || !response.data) {
    notFound();
  }

  const student = response?.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Student"
        description="Update student information"
        icon={<UserPlus />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Students", href: "/dashboard/cr/students" },
          { label: "Edit Student" },
        ]}
        action={
          <Link href="/dashboard/cr/students">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />
      <EditStudentForm student={student} />
    </div>
  );
}
