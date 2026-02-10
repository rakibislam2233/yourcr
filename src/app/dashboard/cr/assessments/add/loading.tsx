import {
  FormSkeleton,
  PageHeaderSkeleton,
} from "@/components/ui/loading-skeletons";

export default function AddAssessmentLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <FormSkeleton />
    </div>
  );
}
