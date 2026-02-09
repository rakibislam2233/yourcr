"use client";

import { Button } from "@/components/ui/button";
import { registerCr } from "@/services/auth.service";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import StepIndicator from "./StepIndicator";
import PersonalInfoStep from "./steps/PersonalInfoStep";

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
  inputs: {},
};

const CrRegisterForm = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    registerCr,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      const email = state.inputs?.email;
      router.push(`/auth/cr-register/verify-email?email=${email}`);
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="w-full space-y-8">
      <StepIndicator currentStep={1} />
      <form action={formAction} className="space-y-6">
        <PersonalInfoStep state={state} />

        <Button
          type="submit"
          className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 shadow-lg shadow-primary/20"
          disabled={isPending}
        >
          {isPending ? "Creating Account..." : "Continue to Verify"}
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
