"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { registerCr, type AuthActionState } from "@/services/auth.service";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import StepIndicator from "./StepIndicator";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: {},
  inputs: {},
  timestamp: 0,
};

const CrRegisterForm = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    registerCr,
    initialState,
  );

  const [lastActionTimestamp, setLastActionTimestamp] = useState<number>(0);
  const [webPushToken, setWebPushToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const { getWebPushToken } = await import("@/utils/push-notification");
      const token = await getWebPushToken();
      if (token) {
        setWebPushToken(token);
      }
    };
    fetchToken();
  }, []);

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
        <input type="hidden" name="webPushToken" value={webPushToken || ""} />
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <FormInput
              id="fullName"
              name="fullName"
              label="Full Name"
              icon={User}
              defaultValue={state?.inputs?.fullName ?? undefined}
              placeholder="e.g. Rahim Ahmed"
              error={state?.errors?.fullName}
              className="border-gray-300 focus:border-primary focus:ring-primary"
              required
            />

            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              icon={Mail}
              defaultValue={state?.inputs?.email ?? undefined}
              placeholder="rahim@example.com"
              error={state?.errors?.email}
              className="border-gray-300 focus:border-primary focus:ring-primary"
              required
            />

            <FormInput
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              icon={Phone}
              defaultValue={state?.inputs?.phoneNumber ?? undefined}
              placeholder="01XXXXXXXXX"
              error={state?.errors?.phoneNumber}
              className="border-gray-300 focus:border-primary focus:ring-primary"
              required
            />

            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              icon={Lock}
              defaultValue={state?.inputs?.password ?? undefined}
              placeholder="Create a password"
              error={state?.errors?.password}
              className="border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
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
