"use client";

import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  getAssessmentById,
  updateAssessment,
  type Assessment,
  type AssessmentActionState,
} from "@/services/assessment.service";
import { getAllSubjects, type Subject } from "@/services/subject.service";
import { ArrowLeft, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const typeOptions = [
  "Exam",
  "Assignment",
  "Quiz",
  "Lab",
  "Presentation",
  "Project",
];

const initialState: AssessmentActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

export default function EditAssessmentPage() {
  const router = useRouter();
  const params = useParams();
  const assessmentId = params?.id as string;

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const updateAssessmentWithId = updateAssessment.bind(null, assessmentId);
  const [state, formAction, isPending] = useActionState(
    updateAssessmentWithId,
    initialState,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const [assessmentRes, subjectsRes] = await Promise.all([
          getAssessmentById(assessmentId),
          getAllSubjects(),
        ]);

        if (assessmentRes.success && assessmentRes.data) {
          setAssessment(assessmentRes.data);
        } else {
          toast.error("Failed to load assessment details");
          router.push("/dashboard/cr/assessments");
        }

        if (subjectsRes.success) {
          setSubjects(subjectsRes.data);
        }
      } catch {
        toast.error("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [assessmentId, router]);

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/assessments");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading assessment details...
      </div>
    );
  }

  if (!assessment) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Assessment"
        description="Update assessment information"
        icon={<ClipboardList />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Assessments", href: "/dashboard/cr/assessments" },
          { label: "Edit Assessment" },
        ]}
        action={
          <Link href="/dashboard/cr/assessments">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Assessment Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={state.inputs?.title ?? assessment.title}
                placeholder="e.g., Mid-Term Examination"
                className={state.errors?.title ? "border-red-500" : ""}
                required
              />
              {state.errors?.title && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.title[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                name="subject"
                defaultValue={state.inputs?.subject ?? assessment.subject}
              >
                <SelectTrigger
                  className={state.errors?.subject ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.length > 0 ? (
                    subjects.map((s) => (
                      <SelectItem key={s.id} value={s.name}>
                        {s.name} ({s.code})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value={assessment.subject} disabled>
                      {assessment.subject}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {state.errors?.subject && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.subject[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Assessment Type</Label>
              <Select
                name="type"
                defaultValue={state.inputs?.type ?? assessment.type}
              >
                <SelectTrigger
                  className={state.errors?.type ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.type && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.type[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                name="totalMarks"
                type="number"
                defaultValue={state.inputs?.totalMarks ?? assessment.totalMarks}
                placeholder="e.g., 50"
                className={state.errors?.totalMarks ? "border-red-500" : ""}
                required
              />
              {state.errors?.totalMarks && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.totalMarks[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={state.inputs?.date ?? assessment.date}
                className={state.errors?.date ? "border-red-500" : ""}
                required
              />
              {state.errors?.date && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.date[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                defaultValue={state.inputs?.time ?? assessment.time}
                placeholder="e.g., 10:00 AM - 1:00 PM or 11:59 PM"
                className={state.errors?.time ? "border-red-500" : ""}
                required
              />
              {state.errors?.time && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.time[0]}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="venue">Venue (Optional)</Label>
              <Input
                id="venue"
                name="venue"
                defaultValue={state.inputs?.venue ?? assessment.venue}
                placeholder="e.g., Exam Hall A"
                className={state.errors?.venue ? "border-red-500" : ""}
              />
              {state.errors?.venue && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.venue[0]}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={
                  state.inputs?.description ?? assessment.description
                }
                placeholder="Add any additional instructions or details..."
                rows={4}
                className={
                  state.errors?.description ? "border-red-500" : "resize-none"
                }
              />
              {state.errors?.description && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.description[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/assessments" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
