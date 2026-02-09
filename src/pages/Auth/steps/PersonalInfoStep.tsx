"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegistrationValues } from "@/lib/auth-schemas";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PersonalInfoStepProps {
  register: UseFormRegister<RegistrationValues>;
  errors: FieldErrors<RegistrationValues>;
  stateErrors?: Record<string, string[]>;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  register,
  errors,
  stateErrors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label>Full Name</Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              {...register("fullName")}
              placeholder="e.g. Rahim Ahmed"
              className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                errors.fullName ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              {...register("email")}
              type="email"
              placeholder="rahim@example.com"
              className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                errors.email || stateErrors?.email ? "border-red-500" : ""
              }`}
            />
          </div>
          {(errors.email || stateErrors?.email) && (
            <p className="text-sm text-red-500">
              {errors.email?.message || stateErrors?.email?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              {...register("phone")}
              placeholder="01XXXXXXXXX"
              className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Password</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className={`pl-12 pr-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
