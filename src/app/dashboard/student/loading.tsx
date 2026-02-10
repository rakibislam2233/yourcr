import {
  DashboardCardsSkeleton,
  ListSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDashboardLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />

      {/* Stats Cards */}
      <DashboardCardsSkeleton count={4} />

      {/* Upcoming Classes & Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <ListSkeleton count={4} />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <ListSkeleton count={4} />
        </div>
      </div>

      {/* Recent Notices */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <ListSkeleton count={3} />
      </div>
    </div>
  );
}
