import {
  PageHeaderSkeleton,
  SearchFilterSkeleton,
  TableSkeleton,
} from "@/components/ui/loading-skeletons";

export default function IssuesLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <SearchFilterSkeleton />
      <TableSkeleton rows={8} />
    </div>
  );
}
