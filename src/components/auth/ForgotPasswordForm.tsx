"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/services/auth.service";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
  inputs: {
    email: "",
  },
};

export function ForgotPasswordForm() {
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
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Forgot Password?</h1>
        <p className="text-sm text-gray-500">
          Enter your email to receive a reset link
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            defaultValue={state.inputs?.email}
            className={
              state.errors?.email
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        Remember your password?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
