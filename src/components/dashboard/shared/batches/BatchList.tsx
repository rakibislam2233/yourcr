"use client";

import { useState } from "react";
import { Layers, Calendar, GraduationCap, Building2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { switchBatch } from "@/services/batch.service";

interface Batch {
  id: string;
  department: string;
  batchType: string;
  academicYear: string;
  semester: string | null;
  shift: string | null;
  group: string | null;
  session: string;
  isActive: boolean;
  institutionId: string;
}

interface BatchListProps {
  batches: Batch[];
  currentBatchId: string;
  userRole: "CR" | "STUDENT";
}

export function BatchList({ batches, currentBatchId, userRole }: BatchListProps) {
  const router = useRouter();
  const [switchingTo, setSwitchingTo] = useState<string | null>(null);

  const handleSwitchBatch = async (batchId: string) => {
    if (batchId === currentBatchId) return;

    try {
      setSwitchingTo(batchId);
      await switchBatch(batchId);
      toast.success("Successfully switched batch");
      router.refresh();
      // Optionally redirect to dashboard home
      router.push(`/dashboard/${userRole.toLowerCase()}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to switch batch");
    } finally {
      setSwitchingTo(null);
    }
  };

  if (!batches || batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-gray-200">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
          <Layers className="size-8 text-emerald-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No Batches Found</h3>
        <p className="text-gray-500 max-w-sm">
          You are not currently enrolled in any batches.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => {
          const isCurrent = batch.id === currentBatchId;
          const isSwitching = switchingTo === batch.id;

          return (
            <div
              key={batch.id}
              className={cn(
                "group relative bg-white border rounded-xl overflow-hidden transition-all duration-300",
                isCurrent 
                  ? "border-emerald-200 shadow-md shadow-emerald-50/50" 
                  : "border-gray-200 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50/50 cursor-pointer"
              )}
              onClick={() => !isCurrent && !switchingTo && handleSwitchBatch(batch.id)}
            >
              {/* Active Indicator */}
              {isCurrent && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 font-semibold text-xs rounded-full border border-emerald-100">
                  <CheckCircle2 className="size-3.5" />
                  Active
                </div>
              )}

              <div className="p-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <Layers className="size-6" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                  {batch.department}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="size-4 shrink-0" />
                    <span className="truncate">{batch.batchType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="size-4 shrink-0" />
                    <span>Session: {batch.session}</span>
                  </div>
                  {(batch.semester || batch.shift || batch.group) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="size-4 shrink-0" />
                      <span className="truncate">
                        {[batch.semester, batch.shift, batch.group].filter(Boolean).join(" • ")}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  disabled={isCurrent || !!switchingTo}
                  className={cn(
                    "w-full py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-300",
                    isCurrent
                      ? "bg-emerald-50 text-emerald-600 cursor-default"
                      : "bg-gray-50 text-gray-700 group-hover:bg-emerald-600 group-hover:text-white"
                  )}
                >
                  {isCurrent 
                    ? "Current Batch" 
                    : isSwitching 
                      ? "Switching..." 
                      : "Switch to this Batch"
                  }
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
