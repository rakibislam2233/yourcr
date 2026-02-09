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
import { Tag } from "lucide-react";
import { useState } from "react";

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
  const [crPosition, setCrPosition] = useState(state?.inputs?.crPosition || "");

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="batchSession">Batch/Session</Label>
            <Input
              id="batchSession"
              name="batchSession"
              defaultValue={state?.inputs?.batchSession}
              placeholder="e.g. 2023-24"
              className={`h-12 border-gray-300 ${state?.errors?.batchSession ? "border-red-500" : ""}`}
            />
            {state?.errors?.batchSession && (
              <p className="text-xs text-red-500">
                {state.errors.batchSession[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="section">Section</Label>
            <Input
              id="section"
              name="section"
              defaultValue={state?.inputs?.section}
              placeholder="e.g. A"
              className={`h-12 border-gray-300 ${state?.errors?.section ? "border-red-500" : ""}`}
            />
            {state?.errors?.section && (
              <p className="text-xs text-red-500">{state.errors.section[0]}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="classRoll">Class Roll</Label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="classRoll"
              name="classRoll"
              defaultValue={state?.inputs?.classRoll}
              placeholder="e.g. 01"
              className={`pl-12 h-12 border-gray-300 ${state?.errors?.classRoll ? "border-red-500" : ""}`}
            />
          </div>
          {state?.errors?.classRoll && (
            <p className="text-sm text-red-500">{state.errors.classRoll[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="crPosition">CR Position</Label>
          <input type="hidden" name="crPosition" value={crPosition} />
          <Select value={crPosition} onValueChange={setCrPosition}>
            <SelectTrigger
              id="crPosition"
              className={`h-12 text-base border-gray-300 ${state?.errors?.crPosition ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Main CR</SelectItem>
              <SelectItem value="assistant">Assistant CR</SelectItem>
              <SelectItem value="coordinator">Coordinator</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.crPosition && (
            <p className="text-sm text-red-500">{state.errors.crPosition[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;
