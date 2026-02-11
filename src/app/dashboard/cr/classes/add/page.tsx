import AddClassForm from "@/components/dashboard/cr/Class/AddClassForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video } from "lucide-react";
import Link from "next/link";

export default function AddClassPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule New Class"
        description="Schedule an online class"
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
      <AddClassForm />
    </div>
  );
}
