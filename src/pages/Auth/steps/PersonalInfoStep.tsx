"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";

interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface PersonalInfoStepProps {
  state?: ActionState;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ state }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="fullName"
              name="fullName"
              defaultValue={state?.inputs?.fullName ?? undefined}
              placeholder="e.g. Rahim Ahmed"
              className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                state?.errors?.fullName ? "border-red-500" : ""
              }`}
            />
          </div>
          {state?.errors?.fullName && (
            <p className="text-sm text-red-500">{state.errors.fullName[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={state?.inputs?.email ?? undefined}
              placeholder="rahim@example.com"
              className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                state?.errors?.email ? "border-red-500" : ""
              }`}
            />
          </div>
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="phone"
              name="phone"
              defaultValue={state?.inputs?.phone ?? undefined}
              placeholder="01XXXXXXXXX"
              className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                state?.errors?.phone ? "border-red-500" : ""
              }`}
            />
          </div>
          {state?.errors?.phone && (
            <p className="text-sm text-red-500">{state.errors.phone[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              defaultValue={state?.inputs?.password ?? undefined}
              placeholder="Create a password"
              className={`pl-12 pr-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                state?.errors?.password ? "border-red-500" : ""
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
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
