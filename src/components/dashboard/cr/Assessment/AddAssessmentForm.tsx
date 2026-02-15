"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Subject } from "@/interface/subject.interface";
import {
  createAssessment,
  type AssessmentActionState,
} from "@/services/assessment.service";
import { Calendar, Clock, FileText, Hash, MapPin } from "lucide-react";
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

interface AddAssessmentFormProps {
  subjects: Subject[];
}

const AddAssessmentForm: React.FC<AddAssessmentFormProps> = ({ subjects }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createAssessment,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <FormInput
            id="title"
            name="title"
            label="Assessment Title"
            icon={FileText}
            defaultValue={state.inputs?.title}
            placeholder="e.g., Mid-Term Examination"
            error={state.errors?.title}
            className="bg-gray-50/30 font-medium"
            required
          />

          <FormSelect
            name="subject"
            label="Subject"
            defaultValue={state.inputs?.subject}
            options={subjects.map((s) => ({ value: s.name, label: s.name }))}
            placeholder="Select a subject"
            error={state.errors?.subject}
            required
          />

          <FormSelect
            name="type"
            label="Assessment Type"
            defaultValue={state.inputs?.type ?? "Assignment"}
            options={typeOptions.map((t) => ({ value: t, label: t }))}
            placeholder="Select type"
            error={state.errors?.type}
            required
          />

          <FormInput
            id="totalMarks"
            name="totalMarks"
            type="number"
            label="Total Marks"
            icon={Hash}
            defaultValue={state.inputs?.totalMarks}
            placeholder="e.g., 50"
            error={state.errors?.totalMarks}
            className="bg-gray-50/30 font-medium"
            required
          />

          <FormInput
            id="date"
            name="date"
            type="date"
            label="Date"
            icon={Calendar}
            defaultValue={state.inputs?.date}
            error={state.errors?.date}
            className="bg-gray-50/30 font-medium"
            required
          />

          <FormInput
            id="time"
            name="time"
            label="Time"
            icon={Clock}
            defaultValue={state.inputs?.time}
            placeholder="e.g., 10:00 AM"
            error={state.errors?.time}
            className="bg-gray-50/30 font-medium"
            required
          />

          <div className="md:col-span-2">
            <FormInput
              id="venue"
              name="venue"
              label="Venue (Optional)"
              icon={MapPin}
              defaultValue={state.inputs?.venue}
              placeholder="e.g., Exam Hall A"
              error={state.errors?.venue}
              className="bg-gray-50/30 font-medium"
            />
          </div>

          <div className="md:col-span-2">
            <FormTextarea
              id="description"
              name="description"
              label="Description (Optional)"
              defaultValue={state.inputs?.description}
              placeholder="Add any additional instructions or details..."
              rows={4}
              error={state.errors?.description}
              className="bg-gray-50/30 resize-none font-medium"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link href="/dashboard/cr/assessments" className="flex-1">
            <Button type="button" variant="outline" className="w-full h-12">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex-1 h-12" disabled={isPending}>
            {isPending ? "Creating..." : "Create Assessment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAssessmentForm;
