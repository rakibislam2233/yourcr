"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, GraduationCap, Building2, BookOpen, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const CrRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white mb-4 sm:mb-6 shadow-lg">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Register as Class Representative
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            Create your CR account and start managing your class efficiently
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
          {/* Benefits Banner */}
          <div className="bg-gradient-to-r from-primary/5 to-indigo-50 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">What you&apos;ll get:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {[
                "Manage students & attendance",
                "Post notices & announcements",
                "Schedule classes & exams",
                "Track student issues"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 text-sm sm:text-base">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 text-sm sm:text-base">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Institution */}
              <div className="space-y-2">
                <Label htmlFor="college" className="text-gray-700 text-sm sm:text-base">
                  Institution Name
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="college"
                    type="text"
                    placeholder="Enter your institution name"
                    className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Department/Course */}
              <div className="space-y-2">
                <Label htmlFor="course" className="text-gray-700 text-sm sm:text-base">
                  Department / Course
                </Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="course"
                    type="text"
                    placeholder="e.g., Computer Science"
                    className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 text-sm sm:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 text-sm sm:text-base">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
              />
              <Label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 leading-relaxed cursor-pointer">
                I agree to the{" "}
                <Link href="/terms-and-conditions" className="text-primary hover:underline font-medium">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 sm:h-14 text-base sm:text-lg font-medium">
              Create CR Account
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              Already have a CR account?{" "}
              <Link href="/auth/cr-login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrRegister;
