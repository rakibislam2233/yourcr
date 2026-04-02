import { redirect } from "next/navigation";
import { getMyProfile } from "@/services/user.service";
import { getUserBatches } from "@/services/batch.service";
import { BatchList } from "@/components/dashboard/shared/batches/BatchList";
import { Layers } from "lucide-react";

export const metadata = {
  title: "My Batches | YourCR",
  description: "View and manage your batch history.",
};

export default async function BatchesPage() {
  const user = await getMyProfile();
  
  if (!user) {
    redirect("/auth/login");
  }

  const batches = await getUserBatches(user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-emerald-600">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Layers className="size-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">My Batches</h1>
        </div>
        <p className="text-gray-500">
          Viewing your batch history. Switch to a previous batch to view its data.
        </p>
      </div>

      <BatchList 
        batches={batches} 
        currentBatchId={user.currentBatchId || ""} 
        userRole="STUDENT"
      />
    </div>
  );
}
