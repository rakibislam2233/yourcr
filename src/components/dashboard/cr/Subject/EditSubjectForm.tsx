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
import { Subject } from "@/interface/subject.interface";
import { Teacher } from "@/interface/teacher.interface";
import {
  updateSubject,
  type SubjectActionState,
} from "@/services/subject.service";
import { getAllTeachers } from "@/services/teacher.service";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: SubjectActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

interface EditSubjectFormProps {
  subject: Subject;
}

const EditSubjectForm: React.FC<EditSubjectFormProps> = ({ subject }) => {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const updateSubjectWithId = updateSubject.bind(null, subject.id);
  const [state, formAction, isPending] = useActionState(
    updateSubjectWithId,
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
        console.error('Failed to fetch teachers:', error);
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
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="code"
              className="text-sm font-semibold text-gray-700"
            >
              Subject Code
            </Label>
            <div className="relative">
              <Input
                id="code"
                name="code"
                defaultValue={state.inputs?.code ?? subject.code}
                placeholder="e.g., CSE-202"
                required
                className={`h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.code ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.code && (
              <p className="text-xs text-red-500">{state.errors.code[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Subject Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                defaultValue={state.inputs?.name ?? subject.name}
                placeholder="e.g., Object Oriented Programming"
                required
                className={`h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.name ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.name && (
              <p className="text-xs text-red-500">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="teacherId"
              className="text-sm font-semibold text-gray-700"
            >
              Teacher
            </Label>
            <Select name="teacherId" defaultValue={state.inputs?.teacherId ?? subject.teacherId}>
              <SelectTrigger
                className={`h-12 border-gray-200 ${
                  state.errors?.teacherId ? "border-red-500" : "bg-gray-50/30"
                } font-medium`}
              >
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.teacherId && (
              <p className="text-xs text-red-500">
                {state.errors.teacherId[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="credit"
              className="text-sm font-semibold text-gray-700"
            >
              Credits
            </Label>
            <div className="relative">
              <Input
                id="credit"
                name="credit"
                type="number"
                step="0.5"
                min="0"
                max="10"
                defaultValue={state.inputs?.credit ?? subject.credit}
                placeholder="e.g., 3.0"
                required
                className={`h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.credit ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.credit && (
              <p className="text-xs text-red-500">{state.errors.credit[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="roomNumber"
              className="text-sm font-semibold text-gray-700"
            >
              Room Number
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="roomNumber"
                name="roomNumber"
                defaultValue={state.inputs?.roomNumber ?? subject.roomNumber}
                placeholder="e.g., Lab 302"
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.roomNumber ? "border-red-500" : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.roomNumber && (
              <p className="text-xs text-red-500">
                {state.errors.roomNumber[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="isDepartmental"
              className="text-sm font-semibold text-gray-700"
            >
              Departmental Subject
            </Label>
            <Select name="isDepartmental" defaultValue={state.inputs?.isDepartmental?.toString() ?? subject.isDepartmental?.toString()}>
              <SelectTrigger
                className={`h-12 border-gray-200 ${
                  state.errors?.isDepartmental ? "border-red-500" : "bg-gray-50/30"
                } font-medium`}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Departmental</SelectItem>
                <SelectItem value="false">Non-Departmental</SelectItem>
              </SelectContent>
            </Select>
            {state.errors?.isDepartmental && (
              <p className="text-xs text-red-500">
                {state.errors.isDepartmental[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700"
            >
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              defaultValue={state.inputs?.description ?? subject.description}
              placeholder="e.g., Concepts of OOP using Java - classes, inheritance, polymorphism, interfaces, exception handling"
              required
              rows={4}
              className={`w-full h-24 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                state.errors?.description ? "border-red-500" : "bg-gray-50/30"
              } transition-all font-medium resize-none p-3`}
            />
            {state.errors?.description && (
              <p className="text-xs text-red-500">
                {state.errors.description[0]}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Link href="/dashboard/cr/subjects">
            <Button type="button" variant="outline" className="h-12">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="h-12" disabled={isPending}>
            {isPending ? "Updating Subject..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSubjectForm;
