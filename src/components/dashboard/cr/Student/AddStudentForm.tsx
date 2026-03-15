"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import {
  createStudent,
  type StudentActionState,
} from "@/services/student.service";
import { Hash, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: StudentActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    fullName: "",
    email: "",
    phoneNumber: "",
    studentId: "",
  },
  timestamp: 0,
};

const AddStudentForm = () => {
  const router = useRouter();
  const [lastActionTimestamp, setLastActionTimestamp] = useState<number>(0);

  const [state, formAction, isPending] = useActionState(
    createStudent,
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
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <FormInput
            id="fullName"
            name="fullName"
            label="Full Name"
            icon={User}
            defaultValue={state.inputs?.fullName}
            placeholder="e.g., Sakib Hasan"
            error={state.errors?.fullName}
            required
          />

          <FormInput
            id="email"
            type="email"
            name="email"
            label="Email"
            icon={Mail}
            defaultValue={state.inputs?.email}
            placeholder="e.g., student@example.com"
            error={state.errors?.email}
            required
          />

          <FormInput
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            icon={Phone}
            defaultValue={state.inputs?.phoneNumber}
            placeholder="e.g., +880 1711-111111"
            error={state.errors?.phoneNumber}
            required
          />

          <FormInput
            id="studentId"
            name="studentId"
            label="Student ID"
            icon={Hash}
            defaultValue={state.inputs?.studentId}
            placeholder="e.g., 800123"
            error={state.errors?.studentId}
            required
          />
        </div>

        <div className="flex gap-3 pt-4 justify-end">
          <Link href="/dashboard/cr/students">
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
                Processing...
              </span>
            ) : (
              "Add Student"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
