"use client";
import { Button } from "@/components/ui/button";
import { FormDatePicker } from "@/components/ui/form-date-picker";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Label } from "@/components/ui/label";
import { Subject } from "@/interface/subject.interface";
import {
  createAssessment,
  type AssessmentActionState,
} from "@/services/assessment.service";
import { Calendar, FileText, Hash, Paperclip } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const typeOptions = [
  {
    value: "EXAM",
    label: "Exam",
  },
  {
    value: "ASSIGNMENT",
    label: "Assignment",
  },
  {
    value: "QUIZ",
    label: "Quiz",
  },
  {
    value: "LAB",
    label: "Lab",
  },
  {
    value: "PRESENTATION",
    label: "Presentation",
  },
  {
    value: "PROJECT",
    label: "Project",
  },
  {
    value: "OTHER",
    label: "Other",
  },
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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [deadline, setDeadline] = useState<string>("");
  const [state, formAction, isPending] = useActionState(
    createAssessment,
    initialState,
  );
  const lastToastTimestamp = useRef(state.timestamp);

  useEffect(() => {
    if (
      state.timestamp &&
      state.timestamp > (lastToastTimestamp.current || 0)
    ) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/assessments");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
      lastToastTimestamp.current = state.timestamp;
    }
  }, [state, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (selectedDate) {
      formData.set("date", selectedDate.toISOString().split("T")[0]);
    }
    if (deadline) {
      formData.set("deadline", deadline);
    }

    formAction(formData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
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
            name="subjectId"
            label="Subject"
            defaultValue={state.inputs?.subjectId}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            placeholder="Select a subject"
            error={state.errors?.subjectId}
            required
          />

          <FormSelect
            name="type"
            label="Assessment Type"
            defaultValue={state.inputs?.type ?? "ASSIGNMENT"}
            options={typeOptions}
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

          <FormDatePicker
            name="date"
            label="Date"
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select a date"
            error={state.errors?.date}
            required
          />

          <FormInput
            id="deadline"
            name="deadline"
            type="datetime-local"
            label="Deadline"
            icon={Calendar}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            error={state.errors?.deadline}
            className="bg-gray-50/30 font-medium"
            required
          />

          <div className="md:col-span-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="files" className="text-sm font-semibold text-gray-700">
                Attachment (Optional)
              </Label>
              <div className="relative">
                <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  id="files"
                  name="files"
                  type="file"
                  className="h-12 text-base border border-gray-200 rounded-md focus:border-primary focus:ring-primary transition-all font-medium bg-gray-50/30 pl-10 file:mr-3 file:h-8 file:border-0 file:rounded file:bg-gray-200 file:px-3 file:text-sm"
                />
              </div>
              {state.errors?.files && (
                <p className="text-xs font-medium text-red-500 mt-1">
                  {Array.isArray(state.errors.files)
                    ? state.errors.files[0]
                    : state.errors.files}
                </p>
              )}
            </div>
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

        <div className="flex gap-3 pt-4 justify-end">
          <Link href="/dashboard/cr/assessments">
            <Button type="button" variant="outline" className="w-full h-12">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="h-12" disabled={isPending}>
            {isPending ? "Creating..." : "Create Assessment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAssessmentForm;
