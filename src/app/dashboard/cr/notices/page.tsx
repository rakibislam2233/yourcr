import ManageNotices from "@/components/dashboard/cr/ManageNotices";
import { getAllNotices } from "@/services/notice.service";

export default async function CrNoticesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const queryParams: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryParams[key] = value;
    } else if (Array.isArray(value)) {
      queryParams[key] = value[0];
    }
  });

  const result = await getAllNotices(queryParams);
  const notices = result.success ? result.data || [] : [];

  return <ManageNotices initialNotices={notices} />;
}
