"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DEECFE] to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to <span className="text-primary">YourCR</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Select your dashboard to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CR Dashboard */}
          <Link href="/dashboard/cr">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <GraduationCap className="w-8 h-8 text-primary group-hover:text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                CR Dashboard
              </h2>
              <p className="text-gray-500 mb-4">
                Access your Class Representative dashboard to manage students,
                notices, and more.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                Go to CR Dashboard
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Student Dashboard */}
          <Link href="/dashboard/student">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <User className="w-8 h-8 text-emerald-600 group-hover:text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Student Dashboard
              </h2>
              <p className="text-gray-500 mb-4">
                Access your student portal to view notices, routine, and submit
                issues.
              </p>
              <div className="flex items-center text-emerald-600 font-medium group-hover:gap-2 transition-all">
                Go to Student Dashboard
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Note: In production, you will be automatically redirected to your
          dashboard based on your role.
        </p>
      </motion.div>
    </div>
  );
}
