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
import { Teacher } from "@/interface/teacher.interface";
import { updateTeacher, type ActionState } from "@/services/teacher.service";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const designationOptions = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Instructor",
];

const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-cyan-500", label: "Cyan" },
];

const initialState: ActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

interface EditTeacherFormProps {
  teacher: Teacher;
}

const EditTeacherForm: React.FC<EditTeacherFormProps> = ({ teacher }) => {
  const router = useRouter();
  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState<string[]>(teacher.subjects || []);

  const updateTeacherWithId = updateTeacher.bind(null, teacher.id);
  const [state, formAction, isPending] = useActionState(
    updateTeacherWithId,
    initialState,
  );

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/teachers");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  const handleAddSubject = () => {
    if (subjectInput.trim() && !subjects.includes(subjectInput.trim())) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="subjects" value={JSON.stringify(subjects)} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={state.inputs?.name ?? teacher.name}
              className={state.errors?.name ? "border-red-500" : ""}
              required
            />
            {state.errors?.name && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Select
              name="designation"
              defaultValue={state.inputs?.designation ?? teacher.designation}
            >
              <SelectTrigger
                className={state.errors?.designation ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select designation" />
              </SelectTrigger>
              <SelectContent>
                {designationOptions.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.designation && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.designation[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              defaultValue={state.inputs?.department ?? teacher.department}
              className={state.errors?.department ? "border-red-500" : ""}
              required
            />
            {state.errors?.department && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.department[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Avatar Color</Label>
            <Select
              name="color"
              defaultValue={state.inputs?.color ?? teacher.color}
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
              <p className="text-red-500 text-xs mt-1">
                {state.errors.color[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={state.inputs?.email ?? teacher.email}
              className={state.errors?.email ? "border-red-500" : ""}
              required
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={state.inputs?.phone ?? teacher.phone}
              className={state.errors?.phone ? "border-red-500" : ""}
              required
            />
            {state.errors?.phone && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.phone[0]}
              </p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Subjects</Label>
            <div className="flex gap-2">
              <Input
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Enter subject name and press Add"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddSubject())
                }
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="bg-primary text-white px-4 rounded-md flex items-center gap-1 hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            {subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-2"
                  >
                    {subject}
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(subject)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link href="/dashboard/cr/teachers" className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTeacherForm;
