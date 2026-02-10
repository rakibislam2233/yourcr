import MyProfile from "@/components/dashboard/student/MyProfile";
import { getMyProfile } from "@/services/user.service";

export default async function StudentProfilePage() {
  const user = await getMyProfile();
  return <MyProfile user={user} />;
}
