"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Info, Lock, Mail, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";

const StudentLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/student");
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-xl mx-auto py-16 px-6">
        {/* Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-6 sm:p-8">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-40 h-auto mb-5 mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Student Login
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your student email and password
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 text-sm sm:text-base"
              >
                Student Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your student email"
                  className="pl-10 sm:pl-12  text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-700 text-sm sm:text-base"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 sm:pl-12 pr-10 sm:pr-12  text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                />
                <Label
                  htmlFor="remember"
                  className="text-xs sm:text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-xs sm:text-sm text-green-600 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 sm:h-14 text-base">
              Sign In as Student
            </Button>
          </form>
        </div>

        {/* CR Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Are you a CR?{" "}
            <Link
              href="/auth/cr-login"
              className="text-primary font-semibold hover:underline"
            >
              CR Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default StudentLogin;
