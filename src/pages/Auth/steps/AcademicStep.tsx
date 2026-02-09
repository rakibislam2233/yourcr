"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface AcademicStepProps {
  state?: ActionState;
}

const AcademicStep: React.FC<AcademicStepProps> = ({ state }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Batch (Name)</Label>
            <Input
              id="name"
              name="name"
              defaultValue={state?.inputs?.name}
              placeholder="e.g. CSE 51(A)/52(B)"
              className={`h-12 border-gray-300 ${state?.errors?.name ? "border-red-500" : ""}`}
            />
            {state?.errors?.name && (
              <p className="text-xs text-red-500">{state.errors.name[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="batchType">Batch Type</Label>
            <Select
              name="batchType"
              defaultValue={state?.inputs?.batchType || "SEMESTER"}
            >
              <SelectTrigger
                id="batchType"
                className="h-12 text-base border-gray-300"
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SEMESTER">Semester</SelectItem>
                <SelectItem value="YEAR">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="academicYear">Academic Year</Label>
          <Input
            id="academicYear"
            name="academicYear"
            defaultValue={
              state?.inputs?.academicYear || state?.inputs?.batchSession
            }
            placeholder="e.g. 2025-2026/2026"
            className={`h-12 border-gray-300 ${state?.errors?.academicYear ? "border-red-500" : ""}`}
          />
          {state?.errors?.academicYear && (
            <p className="text-xs text-red-500">
              {state.errors.academicYear[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            defaultValue={state?.inputs?.department}
            placeholder="e.g. Computer Science and Engineering"
            className={`h-12 border-gray-300 ${state?.errors?.department ? "border-red-500" : ""}`}
          />
          {state?.errors?.department && (
            <p className="text-xs text-red-500">{state.errors.department[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;
