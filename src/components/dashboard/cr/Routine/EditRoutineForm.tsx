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
import { RoutineItem } from "@/interface/routine.interface";
import {
  updateRoutineItem,
  type RoutineActionState,
} from "@/services/routine.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
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

interface EditRoutineFormProps {
  routineItem: RoutineItem;
}

const EditRoutineForm: React.FC<EditRoutineFormProps> = ({ routineItem }) => {
  const router = useRouter();
  const updateRoutineItemWithId = updateRoutineItem.bind(null, routineItem.id);
  const [state, formAction, isPending] = useActionState(
    updateRoutineItemWithId,
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
              <p className="text-red-500 text-xs">{state.errors.subject[0]}</p>
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
              <p className="text-red-500 text-xs">{state.errors.teacher[0]}</p>
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

export default EditRoutineForm;
