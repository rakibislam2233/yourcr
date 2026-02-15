"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { resetPassword, type AuthActionState } from "@/services/auth.service";
import { Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    password: "",
    confirmPassword: "",
    token: "",
  },
  timestamp: 0,
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/auth/login");
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="token" value={token} />

      <div className="flex flex-col gap-4">
        <FormInput
          id="password"
          name="password"
          type="password"
          label="New Password"
          icon={Lock}
          placeholder="••••••••"
          defaultValue={state.inputs?.password}
          error={state.errors?.password}
          required
          className="bg-white border-gray-300 focus:border-primary focus:ring-primary"
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          icon={Lock}
          placeholder="••••••••"
          defaultValue={state.inputs?.confirmPassword}
          error={state.errors?.confirmPassword}
          required
          className="bg-white border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Resetting Password..." : "Update Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
