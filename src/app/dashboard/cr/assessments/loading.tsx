import {
  DashboardCardsSkeleton,
  ListSkeleton,
  PageHeaderSkeleton,
  SearchFilterSkeleton,
} from "@/components/ui/loading-skeletons";

export default function CRAssessmentsLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <DashboardCardsSkeleton count={4} />
      <SearchFilterSkeleton />
      <ListSkeleton count={6} />
    </div>
  );
}
