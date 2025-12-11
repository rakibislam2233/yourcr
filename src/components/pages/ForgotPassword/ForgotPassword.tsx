"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send a password reset email here
    console.log("Password reset email sent to:", email);
    setSubmitted(true);
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-xl mx-auto py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-6 sm:p-8"
        >
          <Image src={logo} alt="logo" className="w-40 h-auto mb-8 mx-auto" />

          {submitted ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;ve sent a password reset link to {email}. Please check
                your inbox and follow the instructions.
              </p>
              <Link href="/auth">
                <Button className="w-full h-14 text-lg">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Forgot Password
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Enter your email and we&apos;ll send you a link to reset your
                password
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 py-4"
                        required
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full h-14 text-lg">
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  href="/auth"
                  className="flex items-center justify-center text-blue-600 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ForgotPassword;
