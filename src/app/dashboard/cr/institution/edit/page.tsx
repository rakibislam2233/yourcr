import EditInstitutionForm from "@/components/dashboard/cr/Institution/EditInstitutionForm";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getMyProfile } from "@/services/user.service";
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default async function EditInstitutionPage() {
  const user = await getMyProfile();

  const formData = {
    // Institution Info
    name: user?.institution?.name || "",
    shortName: user?.institution?.shortName || "",
    type: user?.institution?.type || "",
    establishedYear: user?.institution?.establisYear || "",
    address: user?.institution?.address || "",
    phone: user?.institution?.contactPhone || "",
    email: user?.institution?.contactEmail || "",
    website: user?.institution?.website || "",
    logo: user?.institution?.logo || "",

    // Batch/Class Info
    department: user?.currentBatch?.department || "",
    semester: user?.currentBatch?.semester || "",
    session: user?.currentBatch?.session || "",
    shift: user?.currentBatch?.shift || "",
    group: user?.currentBatch?.group || "",
    academicYear: user?.currentBatch?.academicYear || "",
    batchType: user?.currentBatch?.batchType || "SEMESTER",
  };

  return (
    <section className="space-y-6 max-w-5xl mx-auto pb-20">
      <PageHeader
        title="Edit Institution"
        description="Update your institution and class details"
        icon={<Building2 className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "My Institution", href: "/dashboard/cr/institution" },
          { label: "Edit" },
        ]}
        action={
          <Link href="/dashboard/cr/institution">
            <Button variant="outline" className="gap-2 h-10">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />
      <EditInstitutionForm defaultData={formData} />
    </section>
  );
}
