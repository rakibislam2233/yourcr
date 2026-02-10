import InstitutionPage from "@/components/dashboard/cr/InstitutionPage";
import { getMyProfile } from "@/services/user.service";

export default async function CrInstitutionPage() {
  let user = null;
  try {
    const res = await getMyProfile();
    user = res?.data || null;
  } catch (error) {
    console.error("CrInstitutionPage profile fetch failed", error);
  }

  return <InstitutionPage user={user} />;
}
