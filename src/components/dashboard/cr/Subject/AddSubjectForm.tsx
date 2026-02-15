"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Teacher } from "@/interface/teacher.interface";
import {
  createSubject,
  type SubjectActionState,
} from "@/services/subject.service";
import { getAllTeachers } from "@/services/teacher.service";
import { Award, BookOpen, Building2, Hash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: SubjectActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

const AddSubjectForm = () => {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [state, formAction, isPending] = useActionState(
    createSubject,
    initialState,
  );

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const result = await getAllTeachers();
        if (result.success && result.data) {
          setTeachers(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/subjects");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <FormInput
            id="code"
            name="code"
            label="Subject Code"
            icon={Hash}
            defaultValue={state.inputs?.code}
            placeholder="e.g., CSE-202"
            error={state.errors?.code}
            className="bg-gray-50/30 font-medium"
            required
          />

          <FormInput
            id="name"
            name="name"
            label="Subject Name"
            icon={BookOpen}
            defaultValue={state.inputs?.name}
            placeholder="e.g., Object Oriented Programming"
            error={state.errors?.name}
            className="bg-gray-50/30 font-medium"
            required
          />

          <FormSelect
            name="teacherId"
            label="Teacher"
            defaultValue={state.inputs?.teacherId}
            options={teachers.map((t) => ({ value: t.id, label: t.name }))}
            placeholder="Select teacher"
            error={state.errors?.teacherId}
            required
          />

          <FormInput
            id="credit"
            name="credit"
            type="number"
            label="Credits"
            icon={Award}
            defaultValue={state.inputs?.credit ?? 3}
            placeholder="e.g., 3.0"
            error={state.errors?.credit}
            className="bg-gray-50/30 font-medium"
            required
            step="0.5"
            min={0}
            max={10}
          />

          <FormInput
            id="roomNumber"
            name="roomNumber"
            label="Room Number"
            icon={Building2}
            defaultValue={state.inputs?.roomNumber}
            placeholder="e.g., Lab 302"
            error={state.errors?.roomNumber}
            className="bg-gray-50/30 font-medium"
          />

          <FormSelect
            name="isDepartmental"
            label="Departmental Subject"
            defaultValue={state.inputs?.isDepartmental?.toString() ?? "true"}
            options={[
              { value: "true", label: "Departmental" },
              { value: "false", label: "Non-Departmental" },
            ]}
            placeholder="Select type"
            error={state.errors?.isDepartmental}
            required
          />

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <FormTextarea
              id="description"
              name="description"
              label="Description"
              defaultValue={state.inputs?.description}
              placeholder="e.g., Concepts of OOP using Java - classes, inheritance, polymorphism, interfaces, exception handling"
              rows={4}
              error={state.errors?.description}
              className="bg-gray-50/30 font-medium resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 justify-end">
          <Link href="/dashboard/cr/subjects">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              className="w-full h-12"
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isPending} className="h-12">
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding Subject...
              </span>
            ) : (
              "Add Subject"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSubjectForm;
