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
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

const platformOptions = ["Google Meet", "Zoom", "Microsoft Teams", "Other"];

const initialState: ClassActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

interface EditClassFormProps {
  classData: Class;
}

const EditClassForm: React.FC<EditClassFormProps> = ({ classData }) => {
  const router = useRouter();
  const updateClassWithId = updateClass.bind(null, classData.id);
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

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              defaultValue={state.inputs?.subject ?? classData.subject}
              placeholder="e.g., Database Management System"
              className={state.errors?.subject ? "border-red-500" : ""}
              required
            />
            {state.errors?.subject && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.subject[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Input
              id="teacher"
              name="teacher"
              defaultValue={state.inputs?.teacher ?? classData.teacher}
              placeholder="e.g., Dr. Kamal Ahmed"
              className={state.errors?.teacher ? "border-red-500" : ""}
              required
            />
            {state.errors?.teacher && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.teacher[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={state.inputs?.date ?? classData.date}
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
            <Label htmlFor="platform">Platform</Label>
            <Select
              name="platform"
              defaultValue={state.inputs?.platform ?? classData.platform}
            >
              <SelectTrigger
                className={state.errors?.platform ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
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
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              name="startTime"
              type="time"
              defaultValue={state.inputs?.startTime ?? classData.startTime}
              className={state.errors?.startTime ? "border-red-500" : ""}
              required
            />
            {state.errors?.startTime && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.startTime[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              name="endTime"
              type="time"
              defaultValue={state.inputs?.endTime ?? classData.endTime}
              className={state.errors?.endTime ? "border-red-500" : ""}
              required
            />
            {state.errors?.endTime && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.endTime[0]}
              </p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="link">Meeting Link</Label>
            <Input
              id="link"
              name="link"
              defaultValue={state.inputs?.link ?? classData.link}
              placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
              className={state.errors?.link ? "border-red-500" : ""}
              required
            />
            {state.errors?.link && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.link[0]}
              </p>
            )}
          </div>
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
