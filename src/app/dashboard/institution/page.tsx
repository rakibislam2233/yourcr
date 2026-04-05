import InstitutionOverview from "@/components/dashboard/cr/Institution/InstitutionOverview";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getMyProfile } from "@/services/user.service";
import {
  Building2,
  Edit,
} from "lucide-react";
import Link from "next/link";

export default async function CrInstitutionPage() {
  const user = await getMyProfile();
  const institutionData = {
    logo: user?.institution?.logo || "N/A",
    name: user?.institution?.name || "N/A",
    shortName: user?.institution?.shortName || "N/A",
    type: user?.institution?.type || "Polytechnic Institute",
    establishedYear: user?.institution?.establishedYear || "N/A",
    address: user?.institution?.address || "N/A",
    contactPhone: user?.institution?.contactPhone || "N/A",
    contactEmail: user?.institution?.contactEmail || "N/A",
    website: user?.institution?.website || "N/A",
  };
  const batchInfo = {
    department: user?.currentBatch?.department || "N/A",
    academicYear: user?.currentBatch?.academicYear || "N/A",
    semester: user?.currentBatch?.semester,
    session: user?.currentBatch?.session || "N/A",
    shift: user?.currentBatch?.shift,
    group: user?.currentBatch?.group,
  };
  return (
    <section className="w-full space-y-6">
      <PageHeader
        title="My Institution"
        description="View and manage your institution details"
        icon={<Building2 className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "My Institution" },
        ]}
        action={
          <Link href="/dashboard/cr/institution/edit">
            <Button className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Details
            </Button>
          </Link>
        }
      />
      <InstitutionOverview
        institutionData={institutionData}
        batchInfo={batchInfo}
      />
    </section>
  );
}
