"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, GraduationCap } from "lucide-react";

const CrRegister = () => {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-t from-primary/10 via-secondary/5 to-primary/20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              CR Registration
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Register as a Class Representative
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 border border-gray-100"
          >
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Register as CR
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Create your Class Representative account
            </p>

            <form className="space-y-6  ">
              <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <div className="relative mt-2">
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Enter your full name"
                      className="pl-12 py-4"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

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
                  <Label htmlFor="college" className="text-gray-700">College</Label>
                  <div className="relative mt-2">
                    <Input 
                      id="college" 
                      type="text" 
                      placeholder="Enter your college name"
                      className="pl-12 py-4"
                    />
                    <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="course" className="text-gray-700">Course/Class</Label>
                  <div className="relative mt-2">
                    <Input 
                      id="course" 
                      type="text" 
                      placeholder="Enter your course/class"
                      className="pl-12 py-4"
                    />
                    <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative mt-2">
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a password"
                      className="pl-12 py-4"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <div className="relative mt-2">
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Confirm your password"
                      className="pl-12 py-4"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="/terms-and-conditions" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
                </Label>
              </div>

              <Button type="submit" className="w-full h-14 text-lg">
                Register as CR
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have a CR account?{" "}
                <a href="/auth/cr-login" className="text-blue-600 font-medium hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CrRegister;