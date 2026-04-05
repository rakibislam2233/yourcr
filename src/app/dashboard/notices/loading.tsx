import {
  ListSkeleton,
  PageHeaderSkeleton,
  SearchFilterSkeleton,
} from "@/components/ui/loading-skeletons";

export default function NoticesLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <SearchFilterSkeleton />
      <ListSkeleton count={5} />
    </div>
  );
}
