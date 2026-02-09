"use client";

import StepIndicator from "@/pages/Auth/StepIndicator";
import VerifyEmailStep from "@/pages/Auth/steps/VerifyEmailStep";
import { verifyCrEmail } from "@/services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, string | number | boolean | undefined | null>;
}

const initialState: ActionState = {
  success: false,
  message: "",
  errors: {},
};

const VerifyEmailPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";

  const [state, formAction, isPending] = useActionState(
    verifyCrEmail,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(`/auth/cr-register/complete-profile?email=${email}`);
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router, email]);

  const onVerify = (otp: string) => {
    const formData = new FormData();
    formData.append("otp", otp);
    formData.append("email", email);
    formAction(formData);
  };

  const onResend = () => {
    toast.success("Verification code resent!");
  };

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={2} />
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          Verify Email
        </h1>
        <p className="text-base text-gray-600">
          Step 2: Enter the code sent to your email.
        </p>
      </div>

      <VerifyEmailStep
        email={email}
        onVerify={onVerify}
        onResend={onResend}
        isPending={isPending}
      />
    </div>
  );
};

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={<div className="flex justify-center p-12">Loading...</div>}
    >
      <VerifyEmailPageContent />
    </Suspense>
  );
}
