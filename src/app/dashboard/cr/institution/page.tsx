import InstitutionPage from "@/components/dashboard/cr/InstitutionPage";
import { getMyProfile } from "@/services/user.service";

export default async function CrInstitutionPage() {
  const user = await getMyProfile();
  return <InstitutionPage user={user} />;
}
