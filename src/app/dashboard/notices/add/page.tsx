import AddNoticeForm from "@/components/dashboard/cr/Notice/AddNoticeForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";

export default function AddNoticePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Notice"
        description="Create a new notice or announcement"
        icon={<Bell />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Notices", href: "/dashboard/cr/notices" },
          { label: "Create Notice" },
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
      <AddNoticeForm />
    </div>
  );
}
