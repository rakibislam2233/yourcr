import EditTeacherForm from "@/components/dashboard/cr/Teacher/EditTeacherForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getTeacherById } from "@/services/teacher.service";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTeacherPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getTeacherById(id);

  if (!res.success || !res.data) {
    return notFound();
  }

  const teacher = res.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Teacher"
        description="Update teacher information"
        icon={<Users />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Teachers", href: "/dashboard/cr/teachers" },
          { label: "Edit Teacher" },
        ]}
        action={
          <Link href="/dashboard/cr/teachers">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <EditTeacherForm teacher={teacher} />
    </div>
  );
}
