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
import {
  getClassById,
  updateClass,
  type Class,
  type ClassActionState,
} from "@/services/class.service";
import { ArrowLeft, Video } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const platformOptions = ["Google Meet", "Zoom", "Microsoft Teams", "Other"];

const initialState: ClassActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

export default function EditClassPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params?.id as string;

  const [classData, setClassData] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);

  const updateClassWithId = updateClass.bind(null, classId);
  const [state, formAction, isPending] = useActionState(
    updateClassWithId,
    initialState,
  );

  useEffect(() => {
    async function fetchClass() {
      try {
        const res = await getClassById(classId);
        if (res.success && res.data) {
          setClassData(res.data);
        } else {
          toast.error("Failed to load class details");
          router.push("/dashboard/cr/classes");
        }
      } catch {
        toast.error("An error occurred while fetching class");
      } finally {
        setLoading(false);
      }
    }
    fetchClass();
  }, [classId, router]);

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

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading class details...
      </div>
    );
  }

  if (!classData) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Class"
        description="Update class information"
        icon={<Video />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Classes", href: "/dashboard/cr/classes" },
          { label: "Edit Class" },
        ]}
        action={
          <Link href="/dashboard/cr/classes">
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
