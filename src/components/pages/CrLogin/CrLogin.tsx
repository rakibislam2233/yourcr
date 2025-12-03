"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const CrLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/cr");
  };

  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-t from-primary/10 via-secondary/5 to-primary/20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-left max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Login as CR
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Enter your email and password
            </p>
          </motion.div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full">
            <path
              fill="#ffffff"
              d="M0,100 C320,200 1120,0 1440,100 L1440,200 L0,200 Z"
            ></path>
          </svg>
        </div>
      </section>
      <div className="w-full max-w-xl mx-auto py-16 px-6">
        {/* Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 text-sm sm:text-base"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your CR email"
                  className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
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
                  className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base"
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
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
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
                className="text-xs sm:text-sm text-primary hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 sm:h-14 text-base cursor-pointer"
            >
              Sign In as CR
            </Button>
          </form>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secure login with 256-bit encryption</span>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-4 bg-white text-gray-500">
                New to YourCR?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link href="/auth/cr-register" className="block">
            <Button
              variant="outline"
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
            >
              Register as CR
            </Button>
          </Link>
        </div>

        {/* Student Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Are you a student?{" "}
            <Link
              href="/auth/student-login"
              className="text-primary font-semibold hover:underline"
            >
              Student Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default CrLogin;
