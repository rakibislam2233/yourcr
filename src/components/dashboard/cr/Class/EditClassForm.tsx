"use client";

import { Button } from "@/components/ui/button";
import { FormDatePicker } from "@/components/ui/form-date-picker";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTimePicker } from "@/components/ui/form-time-picker";
import { Class } from "@/interface/class.interface";
import { updateClass, type ClassActionState } from "@/services/class.service";
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
import React, { useActionState, useEffect, useState } from "react";
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

interface EditClassFormProps {
  classData: Class;
  subjects?: Array<{ id: string; name: string }>;
  teachers?: Array<{ id: string; name: string }>;
}

const EditClassForm: React.FC<EditClassFormProps> = ({
  classData,
  subjects = [],
  teachers = [],
}) => {
  const router = useRouter();
  const updateClassWithId = updateClass.bind(null, classData.id);

  const [state, formAction, isPending] = useActionState(
    updateClassWithId,
    initialState,
  );

  const [classType, setClassType] = useState<"ONLINE" | "OFFLINE">(
    (state.inputs?.classType as "ONLINE" | "OFFLINE") || classData.classType,
  );

  const initialDate = state.inputs?.classDate || classData.classDate;
  const [classDate, setClassDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined,
  );

  const formatTimeValue = (value: string | undefined | null) => {
    if (!value) return "";
    if (value.match(/^\d{1,2}:\d{2}\s?(AM|PM)?$/i)) return value;

    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
    return value;
  };

  const [startTime, setStartTime] = useState<string>(
    (state.inputs?.startTime as string) ||
      formatTimeValue(classData.startTime) ||
      "",
  );
  const [endTime, setEndTime] = useState<string>(
    (state.inputs?.endTime as string) ||
      formatTimeValue(classData.endTime) ||
      "",
  );

  const lastToastTimestamp = React.useRef(state.timestamp);

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

    if (startTime) {
      formData.set("startTime", startTime);
    }
    if (endTime) {
      formData.set("endTime", endTime);
    }

    formAction(formData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject */}
          <FormSelect
            name="subjectId"
            label="Subject"
            icon={BookOpen}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            defaultValue={
              (state.inputs?.subjectId as string) || classData.subjectId
            }
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
            defaultValue={
              (state.inputs?.teacherId as string) || classData.teacherId
            }
            placeholder="Select a teacher"
            error={state.errors?.teacherId}
            required
          />

          {/* Date */}
          <FormDatePicker
            id="classDate"
            name="classDate"
            label="Date"
            value={classDate}
            onChange={setClassDate}
            placeholder="Select class date"
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
            defaultValue={
              (state.inputs?.classType as string) || classData.classType
            }
            onValueChange={(value) =>
              setClassType(value as "ONLINE" | "OFFLINE")
            }
            placeholder="Select class type"
            error={state.errors?.classType}
            required
          />

          {/* Start Time */}
          <FormTimePicker
            id="startTime"
            name="startTime"
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
            id="endTime"
            name="endTime"
            value={endTime}
            onChange={setEndTime}
            label="End Time"
            format="12"
            placeholder="Select end time"
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
              defaultValue={
                (state.inputs?.platform as string) || classData.platform
              }
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
              defaultValue={
                (state.inputs?.roomNumber as string) || classData.roomNumber
              }
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
                defaultValue={
                  (state.inputs?.joinLink as string) || classData.joinLink
                }
                placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
                error={state.errors?.joinLink}
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link href="/dashboard/cr/classes" className="flex-1">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-lg font-bold"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="flex-1 h-12 rounded-lg font-bold shadow-lg shadow-primary/20"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditClassForm;
