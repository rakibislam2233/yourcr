"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, GraduationCap } from "lucide-react";
import Link from "next/link";

const AuthHome = () => {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-t from-primary/10 via-secondary/5 to-primary/20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-left max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Welcome to YourCR
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              Choose your role to continue
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

      <section className="py-16 px-6 bg-white min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto w-full">
          <motion.div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Select Your Role
            </h2>

            <div className="space-y-6">
              <Link href="/auth/cr-login" className="w-full block">
                <Button
                  variant="outline"
                  className="w-full h-16 text-lg justify-start pl-4"
                >
                  <GraduationCap className="w-6 h-6 mr-4 text-blue-600" />
                  Login as Class Representative (CR)
                </Button>
              </Link>

              <Link href="/auth/student-login" className="w-full block">
                <Button
                  variant="outline"
                  className="w-full h-16 text-lg justify-start pl-4"
                >
                  <User className="w-6 h-6 mr-4 text-green-600" />
                  Login as Student
                </Button>
              </Link>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  Only CRs can register. If you&apos;re a CR, please register
                  first.
                </p>
                <Link href="/auth/cr-register" className="block mt-4">
                  <Button className="w-full h-12">
                    Register as Class Representative (CR)
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AuthHome;
