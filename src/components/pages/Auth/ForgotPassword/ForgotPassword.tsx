"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Form */}
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Brand */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <Image src={logo} alt="Your CR Logo" className="h-10 w-auto" />
          </div>

          {/* Heading */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="mb-2 text-3xl sm:text-4xl font-black leading-tight tracking-tight text-gray-900">
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
                <strong>{email}</strong>.<br />
                Please check your inbox (and spam folder) and follow the
                instructions.
              </p>
              <Link href="/auth">
                <Button className="w-full h-12 text-base font-bold">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 text-base border-gray-300 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700"
              >
                Send Reset Link
              </Button>
            </form>
          )}

          {/* Back Link */}
          {!submitted && (
            <div className="mt-8 text-center">
              <Link
                href="/auth"
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
              "url('https://images.unsplash.com/photo-1497633765632-6b3bc9c2c7e4?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="relative z-20 flex h-full w-full flex-col justify-end p-12 text-white">
          <div className="max-w-lg">
            <blockquote className="text-3xl font-bold leading-tight tracking-tight">
              Security is our priority. Reset your password easily and get back
              to coordinating your class.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
