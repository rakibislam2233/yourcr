import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import AddStudentForm from "@/components/dashboard/cr/Student/AddStudentForm";

export default function AddStudentPage() {
  return (
    <section className="w-full space-y-6">
      <PageHeader
        title="Add New Student"
        description="Add a new student to your class"
        icon={<UserPlus className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Students", href: "/dashboard/cr/students" },
          { label: "Add Student" },
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
      <AddStudentForm />
    </section>
  );
}
