import {
  ListSkeleton,
  PageHeaderSkeleton,
  SearchFilterSkeleton,
} from "@/components/ui/loading-skeletons";

export default function StudentAssessmentsLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <SearchFilterSkeleton />
      <ListSkeleton count={6} />
    </div>
  );
}
