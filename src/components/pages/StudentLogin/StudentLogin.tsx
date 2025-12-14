"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo/logo.png"; // তোমার লোগো পাথ ঠিক আছে ধরে নিচ্ছি
import { Checkbox } from "@/components/ui/checkbox";

const StudentLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/student");
  };

  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Login Form */}
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Brand Header */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <Image src={logo} alt="Your CR Logo" className="h-10 w-auto" />
          </div>

          {/* Text Content */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="mb-2 text-3xl sm:text-4xl font-black leading-tight tracking-tight text-gray-900">
              Student Portal
            </h1>
            <p className="text-base text-gray-600">
              Welcome back! Please enter your credentials to access class
              schedules and announcements.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Student ID or Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="student_id"
                className="text-sm font-medium text-gray-700"
              >
                Student ID or Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="student_id"
                  type="text"
                  placeholder="e.g. 202310156 or student@university.edu"
                  className="pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary"
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
              Log In
            </Button>
          </form>

          {/* Footer Info */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don&lsquo;t have an account? <br className="sm:hidden" />
            Please contact your{" "}
            <span className="font-medium text-gray-900">
              Class Representative
            </span>
            .
          </p>

          {/* CR Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Are you a CR?{" "}
              <Link
                href="/auth/cr-login"
                className="font-semibold text-primary hover:underline"
              >
                CR Login
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
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLYl09oDE2LgEJgY4KIYIYdKPW0DqiVOZDwItZuu8c1kMJ5redYr3jKiTa8Cg9o6Rc1sV0eW1qwQ66piZkF2bCxAX298Na4aSdDC4F1ec-yVR1gYDHX8ESVP1R9k0LI5egwNTRBEJwd8ptKc_0FMv_OL5lBvehCMeEU-70zFTQvpoYCsB-SIN6BwXBWZ3YPINx57rJzYSgUJv6NrXzrrFU2jHZIjjt9xWkBVEeTSx_2iopnWMsQB7M1NAC4tSHH78jZEGRUd3Yh0M')",
          }}
        />

        {/* Overlay Text */}
        <div className="relative z-20 flex h-full flex-col justify-end p-12 text-white">
          <div className="max-w-lg">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-md">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
              Academic Year 2024-2025
            </div>
            <blockquote className="text-3xl font-bold leading-tight tracking-tight">
              Stay connected with your class updates, schedules, and important
              announcements in one place.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLogin;
