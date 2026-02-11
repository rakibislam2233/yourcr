import AddTeacherForm from "@/components/dashboard/cr/Teacher/AddTeacherForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

export default function AddTeacherPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Teacher"
        description="Add a new teacher to your class"
        icon={<UserPlus />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Teachers", href: "/dashboard/cr/teachers" },
          { label: "Add Teacher" },
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
      <AddTeacherForm />
    </div>
  );
}
