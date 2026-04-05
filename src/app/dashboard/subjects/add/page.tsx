import AddSubjectForm from "@/components/dashboard/cr/Subject/AddSubjectForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default function AddSubjectPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Subject"
        description="Add a new subject to your class"
        icon={<BookOpen />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Subjects", href: "/dashboard/cr/subjects" },
          { label: "Add Subject" },
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
      <AddSubjectForm />
    </div>
  );
}
