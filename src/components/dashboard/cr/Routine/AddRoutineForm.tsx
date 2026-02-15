"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import {
  createRoutineItem,
  type RoutineActionState,
} from "@/services/routine.service";
import { BookOpen, MapPin, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
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

const AddRoutineForm = () => {
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
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            name="day"
            label="Day"
            defaultValue={state.inputs?.day ?? defaultDay}
            options={days.map((day) => ({ value: day, label: day }))}
            placeholder="Select day"
            error={state.errors?.day}
            required
          />

          <FormSelect
            name="time"
            label="Time Slot"
            defaultValue={state.inputs?.time ?? defaultTime}
            options={timeSlots.map((time) => ({ value: time, label: time }))}
            placeholder="Select time slot"
            error={state.errors?.time}
            required
          />

          <FormInput
            id="subject"
            name="subject"
            label="Subject"
            icon={BookOpen}
            defaultValue={state.inputs?.subject}
            placeholder="e.g., Database Management"
            error={state.errors?.subject}
            required
          />

          <FormInput
            id="teacher"
            name="teacher"
            label="Teacher"
            icon={User}
            defaultValue={state.inputs?.teacher}
            placeholder="e.g., Dr. Kamal Ahmed"
            error={state.errors?.teacher}
            required
          />

          <FormInput
            id="room"
            name="room"
            label="Room"
            icon={MapPin}
            defaultValue={state.inputs?.room}
            placeholder="e.g., Room 301 or Lab 102"
            error={state.errors?.room}
            required
          />

          <FormSelect
            name="type"
            label="Class Type"
            defaultValue={state.inputs?.type ?? "Theory"}
            options={typeOptions.map((type) => ({ value: type, label: type }))}
            placeholder="Select class type"
            error={state.errors?.type}
            required
          />

          <FormSelect
            name="color"
            label="Color"
            defaultValue={state.inputs?.color ?? "bg-blue-500"}
            options={colorOptions}
            placeholder="Select color"
            error={state.errors?.color}
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link href="/dashboard/cr/routine" className="flex-1">
            <Button type="button" variant="outline" className="w-full h-12">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex-1 h-12" disabled={isPending}>
            {isPending ? "Adding..." : "Add Class"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRoutineForm;
