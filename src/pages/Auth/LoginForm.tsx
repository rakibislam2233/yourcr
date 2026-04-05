"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/ui/form-input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { loginUser, type AuthActionState } from "@/services/auth.service";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { getWebPushToken } from "@/utils/push-notification";
import { Clock, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: {
    email: "",
    password: "",
  },
  timestamp: 0,
};

const LoginForm = () => {
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
              className="w-full h-12 bg-primary cursor-pointer text-white font-semibold rounded-md transition-all active:scale-[0.98]"
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>

      <form action={formAction} className="space-y-6">
        {/* Hidden input for webPushToken */}
        <input type="hidden" name="webPushToken" value={webPushToken || ""} />

        <div className="flex flex-col gap-4">
          <FormInput
            id="email"
            name="email"
            label="Email Address"
            icon={Mail}
            placeholder="e.g. rahim@example.com"
            defaultValue={state.inputs?.email}
            error={state.errors?.email}
            required
            className="bg-gray-50/30 border-gray-200 focus:border-primary focus:ring-primary"
          />

          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            icon={Lock}
            placeholder="••••••••"
            defaultValue={state.inputs?.password}
            error={state.errors?.password}
            required
            className="bg-gray-50/30 border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-2">
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
          <Link
            href="/auth/forgot-password"
            className="text-xs font-bold text-primary hover:text-blue-700 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 text-white rounded-md  transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70"
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
