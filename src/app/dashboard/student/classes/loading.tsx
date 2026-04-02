import {
  CardGridSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";

export default function StudentClassesLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <CardGridSkeleton count={6} />
    </div>
  );
}
