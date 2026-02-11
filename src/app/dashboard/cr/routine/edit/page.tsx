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
  getRoutineItemById,
  updateRoutineItem,
  type RoutineActionState,
  type RoutineItem,
} from "@/services/routine.service";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
const timeSlots = [
  "8:00 AM",
  "9:30 AM",
  "11:00 AM",
  "12:30 PM",
  "2:00 PM",
  "3:30 PM",
];
const typeOptions = ["Theory", "Lab", "Project"];
const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-cyan-500", label: "Cyan" },
  { value: "bg-amber-500", label: "Amber" },
  { value: "bg-red-500", label: "Red" },
];

const initialState: RoutineActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

function EditRoutineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || ""; // Assume ID is passed now

  const [routineItem, setRoutineItem] = useState<RoutineItem | null>(null);
  const [loading, setLoading] = useState(true);

  const updateRoutineItemWithId = updateRoutineItem.bind(null, id);
  const [state, formAction, isPending] = useActionState(
    updateRoutineItemWithId,
    initialState,
  );

  useEffect(() => {
    async function fetchItem() {
      if (!id) {
        // Fallback or handle error
        setLoading(false);
        return;
      }
      try {
        const res = await getRoutineItemById(id);
        if (res.success && res.data) {
          setRoutineItem(res.data);
        } else {
          toast.error("Failed to load routine item");
          router.push("/dashboard/cr/routine");
        }
      } catch {
        toast.error("An error occurred while fetching routine item");
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id, router]);

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/routine");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading routine details...
      </div>
    );
  }

  // If no routine item and not loading, we might be using mock data or it failed
  if (!routineItem && !id) {
    return (
      <div className="p-8 text-center text-red-500">
        Routine item ID is missing in URL params.
      </div>
    );
  }

  if (!routineItem) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Class"
        description="Update class information"
        icon={<Calendar />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Routine", href: "/dashboard/cr/routine" },
          { label: "Edit Class" },
        ]}
        action={
          <Link href="/dashboard/cr/routine">
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
              <Label htmlFor="day">Day</Label>
              <Select
                name="day"
                defaultValue={state.inputs?.day ?? routineItem.day}
              >
                <SelectTrigger
                  className={state.errors?.day ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.day && (
                <p className="text-red-500 text-xs">{state.errors.day[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Slot</Label>
              <Select
                name="time"
                defaultValue={state.inputs?.time ?? routineItem.time}
              >
                <SelectTrigger
                  className={state.errors?.time ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.time && (
                <p className="text-red-500 text-xs">{state.errors.time[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                defaultValue={state.inputs?.subject ?? routineItem.subject}
                className={state.errors?.subject ? "border-red-500" : ""}
                required
              />
              {state.errors?.subject && (
                <p className="text-red-500 text-xs">
                  {state.errors.subject[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                name="teacher"
                defaultValue={state.inputs?.teacher ?? routineItem.teacher}
                className={state.errors?.teacher ? "border-red-500" : ""}
                required
              />
              {state.errors?.teacher && (
                <p className="text-red-500 text-xs">
                  {state.errors.teacher[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                name="room"
                defaultValue={state.inputs?.room ?? routineItem.room}
                className={state.errors?.room ? "border-red-500" : ""}
                required
              />
              {state.errors?.room && (
                <p className="text-red-500 text-xs">{state.errors.room[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Class Type</Label>
              <Select
                name="type"
                defaultValue={state.inputs?.type ?? routineItem.type}
              >
                <SelectTrigger
                  className={state.errors?.type ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select class type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.type && (
                <p className="text-red-500 text-xs">{state.errors.type[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select
                name="color"
                defaultValue={state.inputs?.color ?? routineItem.color}
              >
                <SelectTrigger
                  className={state.errors?.color ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.color && (
                <p className="text-red-500 text-xs">{state.errors.color[0]}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/routine" className="flex-1">
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

export default function EditRoutinePage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-gray-500">Loading form...</div>
      }
    >
      <EditRoutineContent />
    </Suspense>
  );
}
