"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/auth.service";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
  inputs: {
    email: "",
    password: "",
  },
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );

  const [lastActionTimestamp, setLastActionTimestamp] = useState<number>(0);

  useEffect(() => {
    // Check if we have a new action result to process
    if (state.timestamp && state.timestamp > lastActionTimestamp) {
      setLastActionTimestamp(state.timestamp);

      if (state.success) {
        toast.success(state.message);

        const loginData = state.data;
        const callbackUrl = searchParams?.get("redirect");

        // 1. If backend explicitly asked for a redirect (Verification, Completion, Pending)
        if (loginData?.redirect) {
          router.push(loginData.redirect);
          return;
        }

        // 2. If there was a callbackUrl (unauthenticated user trying to access a page)
        if (callbackUrl) {
          router.push(callbackUrl);
          return;
        }

        // 3. Normal Dashboard Redirect based on Role (Using utility function)
        const userRole = loginData?.user?.role;
        if (userRole) {
          router.push(getDefaultDashboardRoute(userRole));
        } else {
          router.push("/");
        }
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router, searchParams, lastActionTimestamp]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            defaultValue={state.inputs?.email}
            className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
              state.errors?.email
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
        </div>
        {state.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            defaultValue={state.inputs?.password}
            className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
              state.errors?.password
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
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

      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" name="remember" />
          <Label
            htmlFor="remember"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Remember me
          </Label>
        </div>
        <Link
          href="/auth/forgot-password"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
