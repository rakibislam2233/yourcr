"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, GraduationCap } from "lucide-react";
import Link from "next/link";

const AuthHome = () => {
  return (
    <section className="w-full min-h-screen flex justify-center items-center ">
      <div className="max-w-xl mx-auto w-full">
        <motion.div className="bg-white rounded-3xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Select Your Role
          </h2>

          <div className="space-y-6">
            <Link href="/auth/cr-login" className="w-full block">
              <Button
                variant="outline"
                className="w-full h-16 text-lg justify-start pl-4 cursor-pointer"
              >
                <GraduationCap className="size-6 md:size-7 mr-4 text-blue-600" />
                Login as Class Representative (CR)
              </Button>
            </Link>

            <Link href="/auth/student-login" className="w-full block">
              <Button
                variant="outline"
                className="w-full h-16 text-lg justify-start pl-4 cursor-pointer"
              >
                <User className="size-6 md:size-7 mr-4 text-green-600" />
                Login as Student
              </Button>
            </Link>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Only CRs can register. If you&apos;re a CR, please register
                first.
              </p>
              <Link href="/auth/cr-register" className="block mt-4">
                <Button className="w-full h-12 cursor-pointer">
                  Register as Class Representative (CR)
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthHome;
