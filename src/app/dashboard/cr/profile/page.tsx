import ProfileSettings from "@/components/dashboard/cr/ProfileSettings";
import { getMyProfile } from "@/services/user.service";

export default async function CrProfilePage() {
  const user = await getMyProfile();
  return <ProfileSettings user={user} />;
}
