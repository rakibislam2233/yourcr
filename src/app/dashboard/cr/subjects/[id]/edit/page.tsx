import EditSubjectForm from "@/components/dashboard/cr/Subject/EditSubjectForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getSubjectById } from "@/services/subject.service";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSubjectPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getSubjectById(id);

  if (!res.success || !res.data) {
    return notFound();
  }

  const subject = res.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Subject"
        description="Update subject information"
        icon={<BookOpen />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Subjects", href: "/dashboard/cr/subjects" },
          { label: "Edit Subject" },
        ]}
        action={
          <Link href="/dashboard/cr/subjects">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <EditSubjectForm subject={subject} />
    </div>
  );
}
