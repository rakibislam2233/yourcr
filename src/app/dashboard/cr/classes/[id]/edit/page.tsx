import EditClassForm from "@/components/dashboard/cr/Class/EditClassForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getClassById } from "@/services/class.service";
import { ArrowLeft, Video } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditClassPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getClassById(id);

  if (!res.success || !res.data) {
    return notFound();
  }

  const classData = res.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Class"
        description="Update class information"
        icon={<Video />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Classes", href: "/dashboard/cr/classes" },
          { label: "Edit Class" },
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

      <EditClassForm classData={classData} />
    </div>
  );
}
