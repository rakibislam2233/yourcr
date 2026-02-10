import MyProfile from "@/components/dashboard/student/MyProfile";
import { getMyProfile } from "@/services/user.service";

export default async function StudentProfilePage() {
  let user = null;
  try {
    const res = await getMyProfile();
    user = res?.data || null;
  } catch (error) {
    console.error("StudentProfilePage fetch failed", error);
  }

  return <MyProfile user={user} />;
}
