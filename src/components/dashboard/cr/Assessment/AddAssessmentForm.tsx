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
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="title"
              className="text-sm font-semibold text-gray-700"
            >
              Assessment Title
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="title"
                name="title"
                defaultValue={state.inputs?.title}
                placeholder="e.g., Mid-Term Examination"
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.title ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.title && (
              <p className="text-xs text-red-500">{state.errors.title[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="subject"
              className="text-sm font-semibold text-gray-700"
            >
              Subject
            </Label>
            <Select name="subject" defaultValue={state.inputs?.subject}>
              <SelectTrigger
                className={`h-12 border-gray-200 ${
                  state.errors?.subject ? "border-red-500" : "bg-gray-50/30"
                } font-medium`}
              >
                <SelectValue placeholder="Select a subject" />
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
              <p className="text-xs text-red-500">{state.errors.subject[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="type"
              className="text-sm font-semibold text-gray-700"
            >
              Assessment Type
            </Label>
            <Select
              name="type"
              defaultValue={state.inputs?.type ?? "Assignment"}
            >
              <SelectTrigger
                className={`h-12 border-gray-200 ${
                  state.errors?.type ? "border-red-500" : "bg-gray-50/30"
                } font-medium`}
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
              <p className="text-xs text-red-500">{state.errors.type[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="totalMarks"
              className="text-sm font-semibold text-gray-700"
            >
              Total Marks
            </Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="totalMarks"
                name="totalMarks"
                type="number"
                defaultValue={state.inputs?.totalMarks}
                placeholder="e.g., 50"
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.totalMarks ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.totalMarks && (
              <p className="text-xs text-red-500">
                {state.errors.totalMarks[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="date"
              className="text-sm font-semibold text-gray-700"
            >
              Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={state.inputs?.date}
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.date ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.date && (
              <p className="text-xs text-red-500">{state.errors.date[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="time"
              className="text-sm font-semibold text-gray-700"
            >
              Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="time"
                name="time"
                defaultValue={state.inputs?.time}
                placeholder="e.g., 10:00 AM"
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.time ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.time && (
              <p className="text-xs text-red-500">{state.errors.time[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <Label
              htmlFor="venue"
              className="text-sm font-semibold text-gray-700"
            >
              Venue (Optional)
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="venue"
                name="venue"
                defaultValue={state.inputs?.venue}
                placeholder="e.g., Exam Hall A"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.venue ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.venue && (
              <p className="text-xs text-red-500">{state.errors.venue[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700"
            >
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={state.inputs?.description}
              placeholder="Add any additional instructions or details..."
              rows={4}
              className={`${
                state.errors?.description ? "border-red-500" : "bg-gray-50/30"
              } resize-none transition-all font-medium`}
            />
            {state.errors?.description && (
              <p className="text-xs text-red-500">
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
            {isPending ? "Creating..." : "Create Assessment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAssessmentForm;
