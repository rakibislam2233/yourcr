import {
  CardGridSkeleton,
  PageHeaderSkeleton,
  SearchFilterSkeleton,
} from "@/components/ui/loading-skeletons";

export default function StudentsLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <SearchFilterSkeleton />
      <CardGridSkeleton count={9} />
    </div>
  );
}
