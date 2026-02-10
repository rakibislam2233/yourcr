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
import { useState } from "react";

interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface AcademicStepProps {
  state?: ActionState;
  institutionType: string;
}

const AcademicStep: React.FC<AcademicStepProps> = ({
  state,
  institutionType,
}) => {
  const [batchType, setBatchType] = useState(
    state?.inputs?.batchType || "SEMESTER",
  );

  const isPolytechnic = institutionType === "POLYTECHNIC";
  const isUniversity = institutionType === "UNIVERSITY";
  const isCollege = institutionType === "COLLEGE";

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="session">
              Session <span className="text-red-500">*</span>
            </Label>
            <Input
              id="session"
              name="session"
              defaultValue={state?.inputs?.session || state?.inputs?.name}
              placeholder="e.g. 2021-2022"
              className={`h-12 border-gray-300 ${state?.errors?.session ? "border-red-500" : ""}`}
            />
            {state?.errors?.session && (
              <p className="text-xs text-red-500">{state.errors.session[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="batchType">
              Batch Type <span className="text-red-500">*</span>
            </Label>
            <Select
              name="batchType"
              value={batchType}
              onValueChange={setBatchType}
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

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="academicYear">
              {isPolytechnic
                ? "Year"
                : isCollege
                  ? "Class Year"
                  : "Academic Year"}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="academicYear"
              name="academicYear"
              defaultValue={state?.inputs?.academicYear}
              placeholder={isPolytechnic ? "e.g. 1st / 2nd" : "e.g. 1st Year"}
              className={`h-12 border-gray-300 ${state?.errors?.academicYear ? "border-red-500" : ""}`}
            />
            {state?.errors?.academicYear && (
              <p className="text-xs text-red-500">
                {state.errors.academicYear[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="semester">
              {batchType === "SEMESTER"
                ? isPolytechnic
                  ? "Current Semester"
                  : "Current Semester"
                : "Current Year"}
              {" (Optional)"}
            </Label>
            <Input
              id="semester"
              name="semester"
              defaultValue={state?.inputs?.semester}
              placeholder={batchType === "SEMESTER" ? "e.g. 5th" : "e.g. 2nd"}
              className={`h-12 border-gray-300 ${state?.errors?.semester ? "border-red-500" : ""}`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="department">
            {isCollege ? "Group / Department" : "Department / Subject"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="department"
            name="department"
            defaultValue={state?.inputs?.department}
            placeholder={
              isCollege ? "e.g. Science / Commerce" : "e.g. Computer Science"
            }
            className={`h-12 border-gray-300 ${state?.errors?.department ? "border-red-500" : ""}`}
          />
          {state?.errors?.department && (
            <p className="text-xs text-red-500">{state.errors.department[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="shift">
              Shift {(isUniversity || isPolytechnic) && "(Optional)"}
            </Label>
            <Input
              id="shift"
              name="shift"
              defaultValue={state?.inputs?.shift}
              placeholder="e.g. Day / Evening"
              className="h-12 border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="group">
              Group / Section {isCollege ? "" : "(Optional)"}
            </Label>
            <Input
              id="group"
              name="group"
              defaultValue={state?.inputs?.group}
              placeholder="e.g. A / B / Science"
              className="h-12 border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;
