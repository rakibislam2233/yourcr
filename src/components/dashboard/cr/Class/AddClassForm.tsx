"use client";

import { Button } from "@/components/ui/button";
import { FormDatePicker } from "@/components/ui/form-date-picker";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTimePicker } from "@/components/ui/form-time-picker";
import { createClass, type ClassActionState } from "@/services/class.service";
import {
  BookOpen,
  Layers,
  Link as LinkIcon,
  MapPin,
  User,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const platformOptions = [
  { value: "ZOOM", label: "Zoom" },
  { value: "GOOGLE_MEET", label: "Google Meet" },
  { value: "MICROSOFT_TEAMS", label: "Microsoft Teams" },
  { value: "OTHER", label: "Other" },
];

const initialState: ClassActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

interface AddClassFormProps {
  subjects?: Array<{ id: string; name: string }>;
  teachers?: Array<{ id: string; name: string }>;
}

const AddClassForm = ({ subjects = [], teachers = [] }: AddClassFormProps) => {
  const router = useRouter();
  const [classType, setClassType] = useState<"ONLINE" | "OFFLINE">("ONLINE");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const [state, formAction, isPending] = useActionState(
    createClass,
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
        router.push("/dashboard/cr/classes");
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

    // Pass time directly as TimePicker handles the format
    if (startTime) {
      formData.set("startTime", startTime);
    }
    if (endTime) {
      formData.set("endTime", endTime);
    }

    // Call the form action
    formAction(formData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Subject */}
          <FormSelect
            name="subjectId"
            label="Subject"
            icon={BookOpen}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            defaultValue={state.inputs?.subjectId}
            placeholder="Select a subject"
            error={state.errors?.subjectId}
            required
          />

          {/* Teacher */}
          <FormSelect
            name="teacherId"
            label="Teacher"
            icon={User}
            options={teachers.map((t) => ({ value: t.id, label: t.name }))}
            defaultValue={state.inputs?.teacherId}
            placeholder="Select a teacher"
            error={state.errors?.teacherId}
            required
          />

          {/* Date */}
          <FormDatePicker
            name="classDate"
            label="Date"
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select a date"
            error={state.errors?.classDate}
            required
          />

          {/* Class Type */}
          <FormSelect
            name="classType"
            label="Class Type"
            icon={Layers}
            options={[
              { value: "ONLINE", label: "Online" },
              { value: "OFFLINE", label: "Offline" },
            ]}
            defaultValue={state.inputs?.classType ?? "ONLINE"}
            onValueChange={(value) =>
              setClassType(value as "ONLINE" | "OFFLINE")
            }
            placeholder="Select class type"
            error={state.errors?.classType}
            required
          />

          {/* Start Time */}
          <FormTimePicker
            value={startTime}
            onChange={setStartTime}
            label="Start Time"
            placeholder="Select start time"
            format="12"
            error={state.errors?.startTime}
            required
          />

          {/* End Time */}
          <FormTimePicker
            value={endTime}
            onChange={setEndTime}
            label="End Time"
            placeholder="Select end time"
            format="12"
            error={state.errors?.endTime}
            required
          />

          {/* Platform (for ONLINE classes) */}
          {classType === "ONLINE" && (
            <FormSelect
              name="platform"
              label="Platform"
              icon={Video}
              options={platformOptions}
              defaultValue={state.inputs?.platform ?? "GOOGLE_MEET"}
              placeholder="Select platform"
              error={state.errors?.platform}
              required
            />
          )}

          {/* Room Number (for OFFLINE classes) */}
          {classType === "OFFLINE" && (
            <FormInput
              id="roomNumber"
              name="roomNumber"
              label="Room Number"
              icon={MapPin}
              defaultValue={state.inputs?.roomNumber}
              placeholder="e.g., Room 405"
              error={state.errors?.roomNumber}
              required
            />
          )}

          {/* Join Link (for ONLINE classes) */}
          {classType === "ONLINE" && (
            <div className="md:col-span-2">
              <FormInput
                id="joinLink"
                name="joinLink"
                label="Meeting Link (Optional)"
                icon={LinkIcon}
                defaultValue={state.inputs?.joinLink}
                placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
                error={state.errors?.joinLink}
              />
            </div>
          )}

          {/* Hidden status field */}
          <input type="hidden" name="status" value="SCHEDULED" />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link href="/dashboard/cr/classes" className="flex-1">
            <Button type="button" variant="outline" className="w-full h-12">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex-1 h-12" disabled={isPending}>
            {isPending ? "Scheduling..." : "Schedule Class"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddClassForm;
