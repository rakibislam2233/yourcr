"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { forgotPassword, type AuthActionState } from "@/services/auth.service";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    email: "",
  },
  timestamp: 0,
};

const ForgotPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    initialState,
  );
  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-1.5">
        <FormInput
          id="email"
          name="email"
          label="Email Address"
          icon={Mail}
          placeholder="name@example.com"
          defaultValue={state.inputs?.email}
          error={state.errors?.email}
          required
          className="h-12 text-base border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Sending Link..." : "Send Reset Link"}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
