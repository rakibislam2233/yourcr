import EditNoticeForm from "@/components/dashboard/cr/Notice/EditNoticeForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getNoticeById } from "@/services/notice.service";
import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNoticePage({ params }: PageProps) {
  const { id } = await params;
  const res = await getNoticeById(id);

  if (!res.success || !res.data) {
    return notFound();
  }

  const notice = res.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Notice"
        description="Update notice information"
        icon={<Bell />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Notices", href: "/dashboard/cr/notices" },
          { label: "Edit Notice" },
        ]}
        action={
          <Link href="/dashboard/cr/notices">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <EditNoticeForm notice={notice} />
    </div>
  );
}
