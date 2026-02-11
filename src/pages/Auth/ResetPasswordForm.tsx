"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword, type AuthActionState } from "@/services/auth.service";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">
          New Password <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            defaultValue={state.inputs?.password}
            className={`pl-12 pr-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
              state.errors?.password
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {state.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">
          Confirm New Password <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            defaultValue={state.inputs?.confirmPassword}
            className={`pl-12 pr-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
              state.errors?.confirmPassword
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {state.errors?.confirmPassword && (
          <p className="text-sm text-red-500">
            {state.errors.confirmPassword[0]}
          </p>
        )}
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
