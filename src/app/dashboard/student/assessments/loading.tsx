import {
  DashboardCardsSkeleton,
  ListSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";

export default function StudentAssessmentsLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <DashboardCardsSkeleton count={4} />
      <ListSkeleton count={6} />
    </div>
  );
}
