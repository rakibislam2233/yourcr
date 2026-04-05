import ManageRoutine from "@/components/dashboard/cr/ManageRoutine";
import { getAllRoutines } from "@/services/routine.service";

export default async function CrRoutinePage() {
  const { data: routines } = await getAllRoutines();
  return <ManageRoutine initialRoutines={routines || []} />;
}
