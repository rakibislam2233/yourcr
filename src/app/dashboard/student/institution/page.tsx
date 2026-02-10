import ViewInstitution from "@/components/dashboard/student/ViewInstitution";
import { getMyProfile } from "@/services/user.service";

export default async function StudentInstitutionPage() {
  let user = null;
  try {
    const res = await getMyProfile();
    user = res?.data || null;
  } catch (error) {
    console.error("StudentInstitutionPage profile fetch failed", error);
  }

  return <ViewInstitution user={user} />;
}
