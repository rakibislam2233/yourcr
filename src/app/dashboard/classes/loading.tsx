import {
  CardGridSkeleton,
  PageHeaderSkeleton,
  SearchFilterSkeleton,
} from "@/components/ui/loading-skeletons";

export default function CRClassesLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <SearchFilterSkeleton />
      <CardGridSkeleton count={6} />
    </div>
  );
}
