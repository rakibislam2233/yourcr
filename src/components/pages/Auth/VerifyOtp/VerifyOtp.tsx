"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length === 6) {
      setSubmitted(true);
    }
  };

  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side */}
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10 flex items-center justify-center gap-3">
            <Image src={logo} alt="Your CR Logo" className="h-10 w-auto" />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="mb-2 text-3xl sm:text-4xl font-black leading-tight tracking-tight text-gray-900">
              Verify Your Email
            </h1>
            <p className="text-base text-gray-600">
              Enter the 6-digit code we sent to your email address.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Email Verified!
              </h2>
              <p className="text-gray-600 mb-8">
                You can now set a new password for your account.
              </p>
              <Link href="/auth/reset-password">
                <Button className="w-full h-12 text-base font-bold">
                  Continue to Reset Password
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-center gap-4">
                {otp.map((_, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-14 text-center text-2xl font-bold"
                    required
                  />
                ))}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700"
                disabled={otp.some((d) => d === "")}
              >
                Verify Code
              </Button>

              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Didn&apos;t receive it?{" "}
                  <button
                    type="button"
                    className="text-primary font-semibold hover:underline"
                  >
                    Resend Code
                  </button>
                </p>
                <Link
                  href="/auth/forgot-password"
                  className="inline-flex items-center text-primary hover:underline text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-100">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
          }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-40 mix-blend-multiply z-10"></div>
      </div>
    </section>
  );
};

export default VerifyOtp;
