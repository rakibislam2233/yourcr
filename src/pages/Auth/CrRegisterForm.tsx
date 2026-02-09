"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerCr } from "@/services/auth.service";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import StepIndicator from "./StepIndicator";
interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, string | number | boolean | undefined | null>;
  timestamp?: number;
}

const initialState: ActionState = {
  success: false,
  message: "",
  errors: {},
  inputs: {},
};

const CrRegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    registerCr,
    initialState,
  );

  const [lastActionTimestamp, setLastActionTimestamp] = useState<number>(0);

  useEffect(() => {
    if (state.timestamp && state.timestamp > lastActionTimestamp) {
      setLastActionTimestamp(state.timestamp);

      if (state.success) {
        toast.success(state.message);
        router.push(`/auth/cr-register/verify-email`);
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router, lastActionTimestamp]);

  return (
    <div className="w-full space-y-8">
      <StepIndicator currentStep={1} />
      <form action={formAction} className="space-y-6">
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
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={state?.inputs?.phoneNumber ?? undefined}
                placeholder="01XXXXXXXXX"
                className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                  state?.errors?.phoneNumber ? "border-red-500" : ""
                }`}
              />
            </div>
            {state?.errors?.phoneNumber && (
              <p className="text-sm text-red-500">
                {state.errors.phoneNumber[0]}
              </p>
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
        <Button
          type="submit"
          className="w-full h-12 cursor-pointer text-base font-bold bg-primary hover:bg-blue-700 "
          disabled={isPending}
        >
          {isPending ? "Creating Account..." : "Create Account"}
          {!isPending && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-500 font-medium">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-primary hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CrRegisterForm;
