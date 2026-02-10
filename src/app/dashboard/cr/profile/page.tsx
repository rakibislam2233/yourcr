import ProfileSettings from "@/components/dashboard/cr/ProfileSettings";
import { getMyProfile } from "@/services/user.service";

export default async function CrProfilePage() {
  let user = null;
  try {
    const res = await getMyProfile();
    user = res?.data || null;
  } catch (error) {
    console.error("CrProfilePage fetch failed", error);
  }

  return <ProfileSettings user={user} />;
}
