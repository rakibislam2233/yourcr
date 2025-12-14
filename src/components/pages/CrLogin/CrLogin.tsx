"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const CrLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/cr");
  };

  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Login Form */}
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Brand Header */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <Image src={logo} alt="Your CR Logo" className="h-10 w-auto" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Your CR
            </h2>
          </div>

          {/* Text Content */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="mb-2 text-3xl sm:text-4xl font-black leading-tight tracking-tight text-gray-900">
              Class Representative Portal
            </h1>
            <p className="text-base text-gray-600">
              Welcome back! Log in to manage your class, post updates, and
              coordinate with students and faculty.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                CR Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. cr@university.edu"
                  className="pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
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

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700"
            >
              Log In as CR
            </Button>
          </form>

          {/* Footer Info */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Not registered yet? <br className="sm:hidden" />
            <Link
              href="/auth/cr-register"
              className="font-semibold text-primary hover:underline"
            >
              Register as Class Representative
            </Link>
          </p>

          {/* Student Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Are you a student?{" "}
              <Link
                href="/auth/student-login"
                className="font-semibold text-primary hover:underline"
              >
                Student Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Visual (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-100">
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />

        {/* Overlay Text */}
        <div className="relative z-20 flex h-full w-full flex-col justify-end p-12 text-white">
          <div className="max-w-lg">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-md">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
              Academic Year 2024-2025
            </div>
            <blockquote className="text-3xl font-bold leading-tight tracking-tight">
              "Empower your class with seamless coordination, updates, and
              communication tools."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrLogin;
