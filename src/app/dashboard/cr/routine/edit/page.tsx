import EditRoutineForm from "@/components/dashboard/cr/Routine/EditRoutineForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getRoutineItemById } from "@/services/routine.service";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

async function EditRoutineContent({ searchParams }: PageProps) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="p-8 text-center text-red-500">
        Routine item ID is missing in URL params.
      </div>
    );
  }

  const res = await getRoutineItemById(id);

  if (!res.success || !res.data) {
    return notFound();
  }

  const routineItem = res.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Class"
        description="Update class information"
        icon={<Calendar />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Routine", href: "/dashboard/cr/routine" },
          { label: "Edit Class" },
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
      <EditRoutineForm routineItem={routineItem} />
    </div>
  );
}

export default function EditRoutinePage({ searchParams }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-gray-500">Loading form...</div>
      }
    >
      <EditRoutineContent searchParams={searchParams} />
    </Suspense>
  );
}
