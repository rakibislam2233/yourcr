import {
  DashboardCardsSkeleton,
  ListSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function CRDashboardLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />

      {/* Stats Cards */}
      <DashboardCardsSkeleton count={4} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-md" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <ListSkeleton count={5} />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <ListSkeleton count={5} />
        </div>
      </div>
    </div>
  );
}
