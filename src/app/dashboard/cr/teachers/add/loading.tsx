import {
  FormSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";

export default function AddTeacherLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <FormSkeleton />
    </div>
  );
}
