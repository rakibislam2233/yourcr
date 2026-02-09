"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/services/auth.service";
import { ArrowLeft, Mail } from "lucide-react";
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

const ForgotPasswordForm = () => {
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
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email Address</Label>
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

      <Button
        type="submit"
        className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Sending Link..." : "Send Reset Link"}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
