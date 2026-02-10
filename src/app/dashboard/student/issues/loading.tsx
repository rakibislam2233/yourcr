import {
  PageHeaderSkeleton,
  TableSkeleton,
} from "@/components/ui/loading-skeletons";

export default function StudentIssuesLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <TableSkeleton rows={6} />
    </div>
  );
}
