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
import { createClass, type ClassActionState } from "@/services/class.service";
import { convertTo12Hour } from "@/utils/time";
import {
  BookOpen,
  Calendar,
  Clock,
  Link as LinkIcon,
  MapPin,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
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
  const [state, formAction, isPending] = useActionState(
    createClass,
    initialState,
  );

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/classes");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  // Convert time input to AM/PM format before submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert 24-hour time to AM/PM format
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    if (startTime) {
      formData.set("startTime", convertTo12Hour(startTime));
    }
    if (endTime) {
      formData.set("endTime", convertTo12Hour(endTime));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="subjectId"
              className="text-sm font-semibold text-gray-700"
            >
              Subject
            </Label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <Select
                name="subjectId"
                defaultValue={state.inputs?.subjectId}
                required
              >
                <SelectTrigger
                  className={`pl-10 h-12 border-gray-200 ${
                    state.errors?.subjectId ? "border-red-500" : "bg-gray-50/30"
                  } font-medium`}
                >
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {state.errors?.subjectId && (
              <p className="text-xs text-red-500">
                {state.errors.subjectId[0]}
              </p>
            )}
          </div>

          {/* Teacher */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="teacherId"
              className="text-sm font-semibold text-gray-700"
            >
              Teacher
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <Select
                name="teacherId"
                defaultValue={state.inputs?.teacherId}
                required
              >
                <SelectTrigger
                  className={`pl-10 h-12 border-gray-200 ${
                    state.errors?.teacherId ? "border-red-500" : "bg-gray-50/30"
                  } font-medium`}
                >
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {state.errors?.teacherId && (
              <p className="text-xs text-red-500">
                {state.errors.teacherId[0]}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="classDate"
              className="text-sm font-semibold text-gray-700"
            >
              Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="classDate"
                name="classDate"
                type="date"
                defaultValue={state.inputs?.classDate}
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.classDate ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.classDate && (
              <p className="text-xs text-red-500">
                {state.errors.classDate[0]}
              </p>
            )}
          </div>

          {/* Class Type */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="classType"
              className="text-sm font-semibold text-gray-700"
            >
              Class Type
            </Label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <Select
                name="classType"
                defaultValue={state.inputs?.classType ?? "ONLINE"}
                onValueChange={(value) =>
                  setClassType(value as "ONLINE" | "OFFLINE")
                }
                required
              >
                <SelectTrigger
                  className={`pl-10 h-12 border-gray-200 ${
                    state.errors?.classType ? "border-red-500" : "bg-gray-50/30"
                  } font-medium`}
                >
                  <SelectValue placeholder="Select class type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONLINE">Online</SelectItem>
                  <SelectItem value="OFFLINE">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {state.errors?.classType && (
              <p className="text-xs text-red-500">
                {state.errors.classType[0]}
              </p>
            )}
          </div>

          {/* Start Time */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="startTime"
              className="text-sm font-semibold text-gray-700"
            >
              Start Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="startTime"
                name="startTime"
                type="time"
                defaultValue={state.inputs?.startTime}
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.startTime ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.startTime && (
              <p className="text-xs text-red-500">
                {state.errors.startTime[0]}
              </p>
            )}
          </div>

          {/* End Time */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="endTime"
              className="text-sm font-semibold text-gray-700"
            >
              End Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="endTime"
                name="endTime"
                type="time"
                defaultValue={state.inputs?.endTime}
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.endTime ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.endTime && (
              <p className="text-xs text-red-500">{state.errors.endTime[0]}</p>
            )}
          </div>

          {/* Platform (for ONLINE classes) */}
          {classType === "ONLINE" && (
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="platform"
                className="text-sm font-semibold text-gray-700"
              >
                Platform
              </Label>
              <Select
                name="platform"
                defaultValue={state.inputs?.platform ?? "GOOGLE_MEET"}
                required
              >
                <SelectTrigger
                  className={`h-12 border-gray-200 ${
                    state.errors?.platform ? "border-red-500" : "bg-gray-50/30"
                  } font-medium`}
                >
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.platform && (
                <p className="text-xs text-red-500">
                  {state.errors.platform[0]}
                </p>
              )}
            </div>
          )}

          {/* Room Number (for OFFLINE classes) */}
          {classType === "OFFLINE" && (
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="roomNumber"
                className="text-sm font-semibold text-gray-700"
              >
                Room Number
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="roomNumber"
                  name="roomNumber"
                  defaultValue={state.inputs?.roomNumber}
                  placeholder="e.g., Room 405"
                  required
                  className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                    state.errors?.roomNumber
                      ? "border-red-500"
                      : "bg-gray-50/30"
                  } transition-all font-medium`}
                />
              </div>
              {state.errors?.roomNumber && (
                <p className="text-xs text-red-500">
                  {state.errors.roomNumber[0]}
                </p>
              )}
            </div>
          )}

          {/* Join Link (for ONLINE classes) */}
          {classType === "ONLINE" && (
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label
                htmlFor="joinLink"
                className="text-sm font-semibold text-gray-700"
              >
                Meeting Link (Optional)
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="joinLink"
                  name="joinLink"
                  defaultValue={state.inputs?.joinLink}
                  placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
                  className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                    state.errors?.joinLink ? "border-red-500" : "bg-gray-50/30"
                  } transition-all font-medium`}
                />
              </div>
              {state.errors?.joinLink && (
                <p className="text-xs text-red-500">
                  {state.errors.joinLink[0]}
                </p>
              )}
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
