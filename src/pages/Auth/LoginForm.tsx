"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { loginUser } from "@/services/auth.service";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { Clock, Eye, EyeOff, Lock, Mail } from "lucide-react";
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
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );

  const [lastActionTimestamp, setLastActionTimestamp] = useState<number>(0);
  const [webPushToken, setWebPushToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      // Import the utility here to ensure it only runs on the client
      const { getWebPushToken } = await import("@/utils/push-notification");
      const token = await getWebPushToken();
      if (token) {
        setWebPushToken(token);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (state.timestamp && state.timestamp > lastActionTimestamp) {
      setLastActionTimestamp(state.timestamp);
      if (state.success) {
        const loginData = state.data;

        if (loginData?.isCrApproved === false) {
          setIsPendingModalOpen(true);
          return;
        }
        toast.success(state.message);
        const callbackUrl = searchParams?.get("redirect");

        if (loginData?.redirect) {
          router.push(loginData.redirect);
          return;
        }

        if (callbackUrl) {
          router.push(callbackUrl);
          return;
        }

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
    <>
      <Modal
        isOpen={isPendingModalOpen}
        onClose={() => setIsPendingModalOpen(false)}
        title="Account Status"
      >
        <div className="flex flex-col items-center text-center py-2">
          <div className="size-16 bg-amber-50 text-amber-600 rounded-md flex items-center justify-center mb-6 border border-amber-100">
            <Clock className="size-8" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Application Under Review
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
            Your CR registration has been successfully received. Our team is
            currently verifying your documents. You will receive an email
            confirmation once the review process is complete.
          </p>

          <div className="w-full pt-2">
            <Button
              onClick={() => setIsPendingModalOpen(false)}
              className="w-full h-11 bg-gray-900 hover:bg-black text-white font-semibold rounded-md transition-all active:scale-[0.98]"
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>

      <form action={formAction} className="space-y-6">
        {/* Hidden input for webPushToken */}
        <input type="hidden" name="webPushToken" value={webPushToken || ""} />

        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-gray-700"
          >
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="email"
              name="email"
              placeholder="e.g. rahim@example.com"
              defaultValue={state.inputs?.email}
              className={`pl-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                state.errors?.email
                  ? "border-red-500 bg-red-50/10"
                  : "bg-gray-50/30"
              }`}
            />
          </div>
          {state.errors?.email && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              title="Password"
              className="text-sm font-semibold text-gray-700"
            >
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-bold text-primary hover:text-blue-700 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              defaultValue={state.inputs?.password}
              className={`pl-12 pr-12 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                state.errors?.password
                  ? "border-red-500 bg-red-50/10"
                  : "bg-gray-50/30"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {state.errors?.password && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 py-1">
          <Checkbox
            id="remember"
            name="remember"
            className="rounded-sm border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="remember"
            className="text-sm font-medium text-gray-600 cursor-pointer select-none"
          >
            Keep me signed in
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 text-white rounded-md shadow-sm transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying...
            </span>
          ) : (
            "Sign In to Your Account"
          )}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
