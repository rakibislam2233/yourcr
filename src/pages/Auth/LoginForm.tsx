"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { loginUser } from "@/services/auth.service";

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      
      const result = await loginUser({ success: false, message: "", inputs: {} }, formData);
      
      if (result.success) {
        toast.success(result.message);

        const loginData = result.data;
        const callbackUrl = searchParams.get("redirect");

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
          router.push("/"); // If no role, go to home or keep at login
        }
      } else {
        if (result.errors) {
          Object.keys(result.errors).forEach((field) => {
            setError(field as keyof LoginFormValues, {
              type: "server",
              message: result.errors![field][0],
            });
          });
        } else if (result.message) {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            {...register("email")}
            placeholder="name@example.com"
            className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
              errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
              errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
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

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" {...register("remember")} />
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
