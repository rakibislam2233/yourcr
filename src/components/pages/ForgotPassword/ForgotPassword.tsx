"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

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
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-t from-primary/10 via-secondary/5 to-primary/20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Forgot Password?
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              No worries, we'll send you reset instructions
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

      <section className="py-16 px-6 bg-white min-h-[60vh]">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Check Your Email
                </h2>
                <p className="text-gray-600 mb-8">
                  We've sent a password reset link to {email}. Please check your inbox and follow the instructions.
                </p>
                <a href="/auth">
                  <Button className="w-full h-14 text-lg">
                    Back to Login
                  </Button>
                </a>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                  Forgot Password
                </h2>
                <p className="text-center text-gray-600 mb-8">
                  Enter your email and we'll send you a link to reset your password
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-700">Email Address</Label>
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
                  <a href="/auth" className="flex items-center justify-center text-blue-600 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;