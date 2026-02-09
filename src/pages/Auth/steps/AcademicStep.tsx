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
import { RegistrationValues } from "@/lib/auth-schemas";
import { Tag } from "lucide-react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface AcademicStepProps {
  register: UseFormRegister<RegistrationValues>;
  errors: FieldErrors<RegistrationValues>;
  watch: UseFormWatch<RegistrationValues>;
  setValue: UseFormSetValue<RegistrationValues>;
}

const AcademicStep: React.FC<AcademicStepProps> = ({
  register,
  errors,
  watch,
  setValue,
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Batch/Session</Label>
            <Input
              {...register("batchSession")}
              placeholder="e.g. 2023-24"
              className={`h-12 border-gray-300 ${errors.batchSession ? "border-red-500" : ""}`}
            />
            {errors.batchSession && (
              <p className="text-xs text-red-500">
                {errors.batchSession.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Section</Label>
            <Input
              {...register("section")}
              placeholder="e.g. A"
              className={`h-12 border-gray-300 ${errors.section ? "border-red-500" : ""}`}
            />
            {errors.section && (
              <p className="text-xs text-red-500">{errors.section.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Class Roll</Label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              {...register("classRoll")}
              placeholder="e.g. 01"
              className={`pl-12 h-12 border-gray-300 ${errors.classRoll ? "border-red-500" : ""}`}
            />
          </div>
          {errors.classRoll && (
            <p className="text-sm text-red-500">{errors.classRoll.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>CR Position</Label>
          <Select
            value={watch("crPosition")}
            onValueChange={(val) => setValue("crPosition", val)}
          >
            <SelectTrigger
              className={`h-12 border-gray-300 ${errors.crPosition ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Main CR</SelectItem>
              <SelectItem value="assistant">Assistant CR</SelectItem>
              <SelectItem value="coordinator">Coordinator</SelectItem>
            </SelectContent>
          </Select>
          {errors.crPosition && (
            <p className="text-sm text-red-500">{errors.crPosition.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;
