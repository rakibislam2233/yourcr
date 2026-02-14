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
import {
  createSubject,
  type SubjectActionState,
} from "@/services/subject.service";
import { getAllTeachers } from "@/services/teacher.service";
import { Building2 } from "lucide-react";
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
            <div className="flex items-center justify-between">
              <Label
                htmlFor="code"
                className="text-sm font-semibold text-gray-700"
              >
                Subject Code
              </Label>
              <span className="text-red-500">*</span>
            </div>
            <div className="relative">
              <Input
                id="code"
                name="code"
                defaultValue={state.inputs?.code}
                placeholder="e.g., CSE-202"
                className={`h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.code
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.code && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.code[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Subject Name
              </Label>
              <span className="text-red-500">*</span>
            </div>
            <div className="relative">
              <Input
                id="name"
                name="name"
                defaultValue={state.inputs?.name}
                placeholder="e.g., Object Oriented Programming"
                className={`h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.name
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.name && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="teacherId"
                className="text-sm font-semibold text-gray-700"
              >
                Teacher
              </Label>
              <span className="text-red-500">*</span>
            </div>
            <Select name="teacherId" defaultValue={state.inputs?.teacherId}>
              <SelectTrigger
                className={`h-12 border-gray-200 ${
                  state.errors?.teacherId
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
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
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.teacherId[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="credit"
                className="text-sm font-semibold text-gray-700"
              >
                Credits
              </Label>
              <span className="text-red-500">*</span>
            </div>
            <div className="relative">
              <Input
                id="credit"
                name="credit"
                type="number"
                step="0.5"
                min="0"
                max="10"
                defaultValue={state.inputs?.credit ?? 3}
                placeholder="e.g., 3.0"
                className={`h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.credit
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.credit && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.credit[0]}
              </p>
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
                defaultValue={state.inputs?.roomNumber}
                placeholder="e.g., Lab 302"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.roomNumber
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.roomNumber && (
              <p className="text-xs font-medium text-red-500 mt-1">
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
            <Select name="isDepartmental" defaultValue={state.inputs?.isDepartmental?.toString() ?? "true"}>
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
            <div className="flex items-center justify-between">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700"
              >
                Description
              </Label>
              <span className="text-red-500">*</span>
            </div>
            <textarea
              id="description"
              name="description"
              defaultValue={state.inputs?.description}
              placeholder="e.g., Concepts of OOP using Java - classes, inheritance, polymorphism, interfaces, exception handling"
              rows={4}
              className={`w-full h-24 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                state.errors?.description
                  ? "border-red-500 bg-red-50/10"
                  : "bg-gray-50/30"
              } transition-all font-medium resize-none p-3`}
            />
            {state.errors?.description && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.description[0]}
              </p>
            )}
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
