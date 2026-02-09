"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyOtp } from "@/services/auth.service";
import { ShieldCheck } from "lucide-react";
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

const VerifyOtpForm = () => {
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
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="space-y-2 text-center mb-4">
          <Label htmlFor="otp" className="text-gray-700">
            Verification Code
          </Label>
          <Input
            id="otp"
            name="otp"
            placeholder="0 0 0 0 0 0"
            maxLength={6}
            defaultValue={state.inputs?.otp}
            className={`h-16 text-center text-3xl font-bold tracking-[0.5em] border-2 border-gray-200 focus:border-primary focus:ring-primary ${
              state.errors?.otp
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              e.target.value = val;
            }}
          />
          {state.errors?.otp && (
            <p className="text-sm text-red-500">{state.errors.otp[0]}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Verifying Code..." : "Verify & Continue"}
      </Button>

      <div className="text-center pt-2">
        <p className="text-sm text-gray-500">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            className="font-semibold text-primary hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
