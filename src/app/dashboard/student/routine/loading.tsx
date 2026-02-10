import {
  ListSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";

export default function StudentRoutineLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <ListSkeleton count={3} />
    </div>
  );
}
