"use client";

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
import { Assessment } from "@/interface/assessment.interface";
import { Subject } from "@/interface/subject.interface";
import {
  updateAssessment,
  type AssessmentActionState,
} from "@/services/assessment.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
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

interface EditAssessmentFormProps {
  assessment: Assessment;
  subjects: Subject[];
}

const EditAssessmentForm: React.FC<EditAssessmentFormProps> = ({
  assessment,
  subjects,
}) => {
  const router = useRouter();
  const updateAssessmentWithId = updateAssessment.bind(null, assessment.id);
  const [state, formAction, isPending] = useActionState(
    updateAssessmentWithId,
    initialState,
  );

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

  return (
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
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
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
              placeholder="e.g., 10:00 AM - 1:00 PM"
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
              defaultValue={state.inputs?.description ?? assessment.description}
              placeholder="Add any additional instructions..."
              rows={4}
              className={state.errors?.description ? "border-red-500" : ""}
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
            <Button type="button" variant="outline" className="w-full h-12">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex-1 h-12" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAssessmentForm;
