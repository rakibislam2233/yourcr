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
import { MapPin, School } from "lucide-react";
import { useState } from "react";

interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface InstitutionStepProps {
  state?: ActionState;
}

const InstitutionStep: React.FC<InstitutionStepProps> = ({ state }) => {
  const [institutionType, setInstitutionType] = useState(
    state?.inputs?.institutionType || "",
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="institutionName">Institution Name</Label>
          <div className="relative">
            <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="institutionName"
              name="institutionName"
              defaultValue={state?.inputs?.institutionName}
              placeholder="e.g. Dhaka University"
              className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                state?.errors?.institutionName ? "border-red-500" : ""
              }`}
            />
          </div>
          {state?.errors?.institutionName && (
            <p className="text-sm text-red-500">
              {state.errors.institutionName[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="institutionType">Institution Type</Label>
          <input type="hidden" name="institutionType" value={institutionType} />
          <Select value={institutionType} onValueChange={setInstitutionType}>
            <SelectTrigger
              id="institutionType"
              className={`h-12 text-base border-gray-300 ${state?.errors?.institutionType ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="madrasa">Madrasa</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.institutionType && (
            <p className="text-sm text-red-500">
              {state.errors.institutionType[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              defaultValue={state?.inputs?.department}
              placeholder="e.g. CSE"
              className={`h-12 border-gray-300 ${state?.errors?.department ? "border-red-500" : ""}`}
            />
            {state?.errors?.department && (
              <p className="text-xs text-red-500">
                {state.errors.department[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="district">District</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="district"
                name="district"
                defaultValue={state?.inputs?.district}
                placeholder="e.g. Dhaka"
                className={`pl-9 h-12 border-gray-300 ${state?.errors?.district ? "border-red-500" : ""}`}
              />
            </div>
            {state?.errors?.district && (
              <p className="text-xs text-red-500">{state.errors.district[0]}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionStep;
