"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyOtp } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
  inputs: {
    otp: "",
  },
};

export function VerifyOtpForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    verifyOtp,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/auth/reset-password");
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Verify OTP</h1>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="otp">One-Time Password</Label>
          <Input
            id="otp"
            name="otp"
            placeholder="123456"
            maxLength={6}
            defaultValue={state.inputs?.otp}
            className={`text-center tracking-widest text-lg ${
              state.errors?.otp
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            onChange={(e) => {
              // Ensure only numbers
              const val = e.target.value.replace(/\D/g, "");
              e.target.value = val;
            }}
          />
          {state.errors?.otp && (
            <p className="text-sm text-red-500">{state.errors.otp[0]}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </div>
  );
}
