"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
  inputs: {
    password: "",
    confirmPassword: "",
    token: "",
  },
};

export function ResetPasswordForm() {
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
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-sm text-gray-500">Create a new secure password</p>
      </div>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="token" value={token} />

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            defaultValue={state.inputs?.password}
            className={
              state.errors?.password
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {state.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            defaultValue={state.inputs?.confirmPassword}
            className={
              state.errors?.confirmPassword
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
          />
          {state.errors?.confirmPassword && (
            <p className="text-sm text-red-500">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
