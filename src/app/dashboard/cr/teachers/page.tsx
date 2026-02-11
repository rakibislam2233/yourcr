import ManageTeachers from "@/components/dashboard/cr/ManageTeachers";
import { getAllTeachers } from "@/services/teacher.service";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CrTeachersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Convert searchParams to Record<string, string>
  const queryParams: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryParams[key] = value;
    } else if (Array.isArray(value)) {
      queryParams[key] = value[0];
    }
  });

  // Fetch teachers with SSR
  const response = await getAllTeachers(queryParams);
  const teachers = response.success ? response.data : [];

  // Assuming response.data is { data: Teacher[], meta: Meta } if pagination is supported
  // But teacher.service.ts types it as Teacher[], so let's verify if we need to cast or if I should assume no pagination for now
  // However, I added meta prop to ManageTeachers.
  // Let's assume for now response.data IS the array, and I construct a dummy meta or update service later.
  // Actually, standard pattern is response.data has data and meta.
  // Let's safe cast for now to avoid TS errors if types mismatch.
  const data =
    (response.data as any)?.data ||
    (Array.isArray(response.data) ? response.data : []);
  const meta = (response.data as any)?.meta || {
    page: 1,
    limit: 10,
    total: data.length,
    totalPages: 1,
  };

  return <ManageTeachers initialTeachers={data} meta={meta} />;
}
