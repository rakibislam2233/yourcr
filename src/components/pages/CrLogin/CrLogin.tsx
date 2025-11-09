"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, GraduationCap } from "lucide-react";

const CrLogin = () => {
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
              CR Sign In
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Access your Class Representative dashboard
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
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              CR Sign In
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Access your classroom management tools
            </p>

            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-700">CR Email</Label>
                  <div className="relative mt-2">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your CR email"
                      className="pl-12 py-4"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative mt-2">
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="pl-12 py-4"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full h-14 text-lg">
                Sign In as CR
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have a CR account?{" "}
                <a href="/auth/cr-register" className="text-blue-600 font-medium hover:underline">
                  Register as CR
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CrLogin;