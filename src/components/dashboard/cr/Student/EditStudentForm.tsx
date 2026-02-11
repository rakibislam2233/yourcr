"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Student from "@/interface/student.interface";
import { UserProfile } from "@/interface/user.interface";
import {
  updateStudent,
  type StudentActionState,
} from "@/services/student.service";
import { Hash, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface EditStudentFormProps {
  student: Student;
}

const initialState: StudentActionState = {
  success: false,
  message: "",
  inputs: undefined,
  timestamp: 0,
};

const EditStudentForm = ({ student }: EditStudentFormProps) => {
  const router = useRouter();
  const [lastActionTimestamp, setLastActionTimestamp] = useState<number>(0);

  // Bind the id to the action
  const updateStudentWithId = updateStudent.bind(null, student.id);

  const [state, formAction, isPending] = useActionState(
    updateStudentWithId,
    initialState,
  );
  useEffect(() => {
    if (state.timestamp && state.timestamp > lastActionTimestamp) {
      setLastActionTimestamp(state.timestamp);
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/students");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router, lastActionTimestamp]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="fullName"
              className="text-sm font-semibold text-gray-700"
            >
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="fullName"
                name="fullName"
                defaultValue={state.inputs?.fullName || student.fullName}
                placeholder="e.g., Sakib Hasan"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.fullName
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.fullName && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.fullName[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                name="email"
                defaultValue={state.inputs?.email || student.email}
                placeholder="e.g., student@example.com"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.email
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.email && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="phoneNumber"
              className="text-sm font-semibold text-gray-700"
            >
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={state.inputs?.phoneNumber || student.phoneNumber}
                placeholder="e.g., +880 1711-111111"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.phoneNumber
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.phoneNumber && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.phoneNumber[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="studentId"
              className="text-sm font-semibold text-gray-700"
            >
              Student ID
            </Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="studentId"
                name="studentId"
                defaultValue={state.inputs?.studentId || student.studentId}
                placeholder="e.g., 800123"
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                  state.errors?.studentId
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30"
                } transition-all font-medium`}
              />
            </div>
            {state.errors?.studentId && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {state.errors.studentId[0]}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 justify-end">
          <Link href="/dashboard/cr/students">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              className="h-12"
            >
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isPending} className="h-12">
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </span>
            ) : (
              "Update Student"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentForm;
