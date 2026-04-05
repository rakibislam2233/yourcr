import ManageClasses from "@/components/dashboard/cr/Class/ManageClasses";
import { getAllClasses } from "@/services/class.service";

export default async function CrClassesPage() {
  const classesResponse = await getAllClasses();
  const classes = classesResponse.success ? classesResponse.data || [] : [];

  return <ManageClasses initialClasses={classes} />;
}
