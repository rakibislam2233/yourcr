import AddRoutineForm from "@/components/dashboard/cr/Routine/AddRoutineForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function AddRoutinePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Class to Routine"
        description="Add a new class to the schedule"
        icon={<Calendar />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Routine", href: "/dashboard/cr/routine" },
          { label: "Add Class" },
        ]}
        action={
          <Link href="/dashboard/cr/routine">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />
      <Suspense
        fallback={
          <div className="p-6 text-center text-gray-500">Loading form...</div>
        }
      >
        <AddRoutineForm />
      </Suspense>
    </div>
  );
}
