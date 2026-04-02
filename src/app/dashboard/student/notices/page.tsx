import ViewNotices from "@/components/dashboard/student/ViewNotices";
import { getAllNotices } from "@/services/notice.service";

export default async function StudentNoticesPage() {
  const result = await getAllNotices();
  const notices = result.success ? result.data || [] : [];
  
  return <ViewNotices initialNotices={notices} />;
}
