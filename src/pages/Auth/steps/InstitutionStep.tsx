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
import { MapPin, School } from "lucide-react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface InstitutionStepProps {
  register: UseFormRegister<RegistrationValues>;
  errors: FieldErrors<RegistrationValues>;
  watch: UseFormWatch<RegistrationValues>;
  setValue: UseFormSetValue<RegistrationValues>;
}

const InstitutionStep: React.FC<InstitutionStepProps> = ({
  register,
  errors,
  watch,
  setValue,
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label>Institution Name</Label>
          <div className="relative">
            <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              {...register("institutionName")}
              placeholder="e.g. Dhaka University"
              className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                errors.institutionName ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.institutionName && (
            <p className="text-sm text-red-500">
              {errors.institutionName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Institution Type</Label>
          <Select
            value={watch("institutionType")}
            onValueChange={(val) => setValue("institutionType", val)}
          >
            <SelectTrigger
              className={`h-12 border-gray-300 ${errors.institutionType ? "border-red-500" : ""}`}
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
          {errors.institutionType && (
            <p className="text-sm text-red-500">
              {errors.institutionType.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Department</Label>
            <Input
              {...register("department")}
              placeholder="e.g. CSE"
              className={`h-12 border-gray-300 ${errors.department ? "border-red-500" : ""}`}
            />
            {errors.department && (
              <p className="text-xs text-red-500">
                {errors.department.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>District</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                {...register("district")}
                placeholder="e.g. Dhaka"
                className={`pl-9 h-12 border-gray-300 ${errors.district ? "border-red-500" : ""}`}
              />
            </div>
            {errors.district && (
              <p className="text-xs text-red-500">{errors.district.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionStep;
