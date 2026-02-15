"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { verifyOtp, type AuthActionState } from "@/services/auth.service";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    otp: "",
  },
  timestamp: 0,
};

const VerifyOtpForm = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    verifyOtp,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "OTP verified successfully");
      if (state.data?.redirect) {
        router.push(state.data.redirect);
      }
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="space-y-2 text-center mb-4">
          <FormInput
            id="otp"
            name="otp"
            icon={KeyRound}
            placeholder="0 0 0 0 0 0"
            maxLength={6}
            defaultValue={state.inputs?.otp}
            error={state.errors?.otp}
            className="h-16 text-center text-2xl font-bold tracking-[0.2em] border-gray-200 focus:border-primary focus:ring-primary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value.replace(/\D/g, "");
              e.target.value = val;
            }}
          />
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
