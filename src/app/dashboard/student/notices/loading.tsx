import {
  ListSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";

export default function StudentNoticesLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <ListSkeleton count={6} />
    </div>
  );
}
