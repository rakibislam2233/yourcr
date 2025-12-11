"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // In a real app, you would submit the new password to the server
    console.log("Password reset submitted");
    setSubmitted(true);
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center ">
      <div className="max-w-2xl mx-auto pb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Password Reset Successful!
              </h2>
              <p className="text-gray-600 mb-8">
                Your password has been successfully changed. You can now log in
                with your new password.
              </p>
              <Link href="/auth">
                <Button className="w-full h-14 text-lg">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Reset Your Password
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Enter your new password below
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password" className="text-gray-700">
                      New Password
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 py-4"
                        required
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm New Password
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-12 py-4"
                        required
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full h-14 text-lg">
                  Reset Password
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <Link
                    href="/auth"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ResetPassword;
