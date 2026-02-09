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
              <SelectItem value="UNIVERSITY">University</SelectItem>
              <SelectItem value="COLLEGE">College</SelectItem>
              <SelectItem value="POLYTECHNIC">Polytechnic</SelectItem>
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
            <Label htmlFor="institutionEmail">Contact Email</Label>
            <Input
              id="institutionEmail"
              name="institutionEmail"
              type="email"
              defaultValue={
                state?.inputs?.institutionEmail || state?.inputs?.email
              }
              placeholder="institution@example.com"
              className={`h-12 border-gray-300 ${state?.errors?.institutionEmail ? "border-red-500" : ""}`}
            />
            {state?.errors?.institutionEmail && (
              <p className="text-xs text-red-500">
                {state.errors.institutionEmail[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="institutionPhone">Contact Phone</Label>
            <Input
              id="institutionPhone"
              name="institutionPhone"
              defaultValue={
                state?.inputs?.institutionPhone || state?.inputs?.phoneNumber
              }
              placeholder="e.g. 01XXXXXXXXX"
              className={`h-12 border-gray-300 ${state?.errors?.institutionPhone ? "border-red-500" : ""}`}
            />
            {state?.errors?.institutionPhone && (
              <p className="text-xs text-red-500">
                {state.errors.institutionPhone[0]}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address">Institution Address</Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="address"
              name="address"
              defaultValue={state?.inputs?.address}
              placeholder="Full address (e.g. 123 Street, Dhaka)"
              className={`pl-12 h-12 border-gray-300 ${state?.errors?.address ? "border-red-500" : ""}`}
            />
          </div>
          {state?.errors?.address && (
            <p className="text-sm text-red-500">{state.errors.address[0]}</p>
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

export default InstitutionStep;
