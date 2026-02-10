import {
  ListSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";

export default function StudentClassesLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <ListSkeleton count={8} />
    </div>
  );
}
