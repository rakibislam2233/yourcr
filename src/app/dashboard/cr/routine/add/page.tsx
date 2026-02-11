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
  createRoutineItem,
  type RoutineActionState,
} from "@/services/routine.service";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useActionState, useEffect } from "react";
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

function AddRoutineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultDay = searchParams?.get("day") || "Saturday";
  const defaultTime = searchParams?.get("time") || "8:00 AM";

  const [state, formAction, isPending] = useActionState(
    createRoutineItem,
    initialState,
  );

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Class to Routine"
        description="Add a new class to the schedule"
        icon={<Calendar />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Routine", href: "/dashboard/cr/routine" },
          { label: "Add Class" },
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
              <Select name="day" defaultValue={state.inputs?.day ?? defaultDay}>
                <SelectTrigger
                  className={state.errors?.day ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
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
                defaultValue={state.inputs?.time ?? defaultTime}
              >
                <SelectTrigger
                  className={state.errors?.time ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
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
                defaultValue={state.inputs?.subject}
                placeholder="e.g., Database Management"
                required
                className={state.errors?.subject ? "border-red-500" : ""}
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
                defaultValue={state.inputs?.teacher}
                placeholder="e.g., Dr. Kamal Ahmed"
                required
                className={state.errors?.teacher ? "border-red-500" : ""}
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
                defaultValue={state.inputs?.room}
                placeholder="e.g., Room 301 or Lab 102"
                required
                className={state.errors?.room ? "border-red-500" : ""}
              />
              {state.errors?.room && (
                <p className="text-red-500 text-xs">{state.errors.room[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Class Type</Label>
              <Select name="type" defaultValue={state.inputs?.type ?? "Theory"}>
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
                defaultValue={state.inputs?.color ?? "bg-blue-500"}
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
              {isPending ? "Adding..." : "Add Class"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddRoutinePage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-gray-500">Loading form...</div>
      }
    >
      <AddRoutineContent />
    </Suspense>
  );
}
