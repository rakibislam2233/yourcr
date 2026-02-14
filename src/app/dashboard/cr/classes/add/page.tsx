import AddClassForm from "@/components/dashboard/cr/Class/AddClassForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getAllSubjects } from "@/services/subject.service";
import { getAllTeachers } from "@/services/teacher.service";
import { ArrowLeft, Video } from "lucide-react";
import Link from "next/link";

export default async function AddClassPage() {
  const [subjectsResponse, teachersResponse] = await Promise.all([
    getAllSubjects(),
    getAllTeachers(),
  ]);

  const subjects = subjectsResponse.success
    ? (subjectsResponse.data || []).map((s) => ({ id: s.id, name: s.name }))
    : [];

  const teachers = teachersResponse.success
    ? (teachersResponse.data || []).map((t) => ({ id: t.id, name: t.name }))
    : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule New Class"
        description="Schedule a new class (online or offline)"
        icon={<Video />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Classes", href: "/dashboard/cr/classes" },
          { label: "Schedule Class" },
        ]}
        action={
          <Link href="/dashboard/cr/classes">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />
      <AddClassForm subjects={subjects} teachers={teachers} />
    </div>
  );
}
