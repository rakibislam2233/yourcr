import ViewInstitution from "@/components/dashboard/student/ViewInstitution";
import { getMyProfile } from "@/services/user.service";

export default async function StudentInstitutionPage() {
  const user = await getMyProfile();
  return <ViewInstitution user={user} />;
}
