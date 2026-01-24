"use client";
import logo from "@/assets/logo/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Password reset link sent to:", data.email);
    setSubmitted(true);
    reset(); // Reset form after submission
  };

  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Form */}
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Brand */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <Link href="/">
              <Image src={logo} alt="Your CR Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="mb-2 text-2xl sm:text-4xl  leading-tight tracking-tight text-gray-900">
              Forgot Your Password?
            </h1>
            <p className="text-base text-gray-600">
              No worries! Enter your email and we&apos;ll send you a link to
              reset your password.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;ve sent a password reset link to{" "}
                <strong>{watch("email")}</strong>.<br />
                Please check your inbox (and spam folder) and follow the
                instructions.
              </p>
              <Link href="/auth/login">
                <Button className="w-full h-12 text-base font-bold">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700"
              >
                Send Otp
              </Button>
            </form>
          )}

          {/* Back Link */}
          {!submitted && (
            <div className="mt-8 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-primary hover:underline text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-100">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc')",
          }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-40 mix-blend-multiply z-10"></div>
      </div>
    </section>
  );
};

export default ForgotPassword;
