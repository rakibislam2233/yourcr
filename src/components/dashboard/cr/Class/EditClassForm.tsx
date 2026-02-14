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
import { Class } from "@/interface/class.interface";
import { updateClass, type ClassActionState } from "@/services/class.service";
import { convertTo12Hour, convertTo24Hour } from "@/utils/time";
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
  const [classType, setClassType] = useState<"ONLINE" | "OFFLINE">(
    classData.classType,
  );
  const [state, formAction, isPending] = useActionState(
    updateClassWithId,
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

  // Convert AM/PM time to 24-hour for input default value
  const startTime24 = convertTo24Hour(classData.startTime);
  const endTime24 = convertTo24Hour(classData.endTime);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subjectId">Subject</Label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <Select
                name="subjectId"
                defaultValue={state.inputs?.subjectId ?? classData.subjectId}
                required
              >
                <SelectTrigger
                  className={`pl-10 ${state.errors?.subjectId ? "border-red-500" : ""}`}
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
              <p className="text-red-500 text-xs mt-1">
                {state.errors.subjectId[0]}
              </p>
            )}
          </div>

          {/* Teacher */}
          <div className="space-y-2">
            <Label htmlFor="teacherId">Teacher</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <Select
                name="teacherId"
                defaultValue={state.inputs?.teacherId ?? classData.teacherId}
                required
              >
                <SelectTrigger
                  className={`pl-10 ${state.errors?.teacherId ? "border-red-500" : ""}`}
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
              <p className="text-red-500 text-xs mt-1">
                {state.errors.teacherId[0]}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="classDate">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="classDate"
                name="classDate"
                type="date"
                defaultValue={state.inputs?.classDate ?? classData.classDate}
                className={`pl-10 ${state.errors?.classDate ? "border-red-500" : ""}`}
                required
              />
            </div>
            {state.errors?.classDate && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.classDate[0]}
              </p>
            )}
          </div>

          {/* Class Type */}
          <div className="space-y-2">
            <Label htmlFor="classType">Class Type</Label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <Select
                name="classType"
                defaultValue={state.inputs?.classType ?? classData.classType}
                onValueChange={(value) =>
                  setClassType(value as "ONLINE" | "OFFLINE")
                }
                required
              >
                <SelectTrigger
                  className={`pl-10 ${state.errors?.classType ? "border-red-500" : ""}`}
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
              <p className="text-red-500 text-xs mt-1">
                {state.errors.classType[0]}
              </p>
            )}
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="startTime"
                name="startTime"
                type="time"
                defaultValue={state.inputs?.startTime ?? startTime24}
                className={`pl-10 ${state.errors?.startTime ? "border-red-500" : ""}`}
                required
              />
            </div>
            {state.errors?.startTime && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.startTime[0]}
              </p>
            )}
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="endTime"
                name="endTime"
                type="time"
                defaultValue={state.inputs?.endTime ?? endTime24}
                className={`pl-10 ${state.errors?.endTime ? "border-red-500" : ""}`}
                required
              />
            </div>
            {state.errors?.endTime && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.endTime[0]}
              </p>
            )}
          </div>

          {/* Platform (for ONLINE classes) */}
          {classType === "ONLINE" && (
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                name="platform"
                defaultValue={state.inputs?.platform ?? classData.platform}
                required
              >
                <SelectTrigger
                  className={state.errors?.platform ? "border-red-500" : ""}
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
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.platform[0]}
                </p>
              )}
            </div>
          )}

          {/* Room Number (for OFFLINE classes) */}
          {classType === "OFFLINE" && (
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="roomNumber"
                  name="roomNumber"
                  defaultValue={
                    state.inputs?.roomNumber ?? classData.roomNumber
                  }
                  placeholder="e.g., Room 405"
                  className={`pl-10 ${state.errors?.roomNumber ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {state.errors?.roomNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.roomNumber[0]}
                </p>
              )}
            </div>
          )}

          {/* Join Link (for ONLINE classes) */}
          {classType === "ONLINE" && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="joinLink">Meeting Link (Optional)</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="joinLink"
                  name="joinLink"
                  defaultValue={state.inputs?.joinLink ?? classData.joinLink}
                  placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
                  className={`pl-10 ${state.errors?.joinLink ? "border-red-500" : ""}`}
                />
              </div>
              {state.errors?.joinLink && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.joinLink[0]}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link href="/dashboard/cr/classes" className="flex-1">
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

export default EditClassForm;
