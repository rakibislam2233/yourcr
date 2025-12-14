"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { School, University } from "lucide-react";
import Link from "next/link";

const AuthHome = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-background-light px-6 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 lg:gap-16">
        {/* Hero Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-semibold  tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Centralized Hub
          </div>
          <h2 className="text-4xl md:text-5xl  font-black leading-tight tracking-tight text-text-main max-w-[800px]">
            Academic Coordination Made Simple
          </h2>
          <p className="text-lg md:text-xl text-text-sub font-normal leading-relaxed max-w-[640px]">
            The centralized hub for students, faculty, and class representatives
            to stay connected, organized, and coordinated.
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {/* Student Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative flex flex-col gap-6 rounded-2xl border border-border-subtle bg-surface p-8 "
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <School className="size-14" />
            </div>
            <div className="h-14 w-14 rounded-xl bg-blue-100 text-primary flex items-center justify-center shadow-sm">
              <School />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-text-main">
                Student Portal
              </h3>
              <p className="text-base text-text-sub leading-relaxed">
                Access class schedules, notices, upcoming deadlines, and connect
                with your peers efficiently.
              </p>
            </div>
            <div className="mt-auto pt-4">
              <Link href="/auth/student-login" className="block w-full">
                <Button className="w-full h-12 text-base font-bold cursor-pointer bg-primary hover:bg-blue-700 text-white">
                  Log In as Student
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* CR Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative flex flex-col gap-6 rounded-2xl border border-border-subtle bg-surface p-8 "
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <University className="size-14" />
            </div>
            <div className="h-14 w-14 rounded-xl bg-slate-200 text-text-main flex items-center justify-center shadow-sm">
              <University className="text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-text-main">
                Class Representative
              </h3>
              <p className="text-base text-text-sub leading-relaxed">
                Register to manage your class, post official updates, coordinate
                with faculty, and handle requests.
              </p>
            </div>
            <div className="mt-auto pt-4">
              <Link href="/auth/cr-register" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base cursor-pointer font-bold border-2 border-primary text-primary hover:bg-blue-50"
                >
                  Register as CR
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        {/* CR Login Link (from your original component) */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Already a registered CR?{" "}
            <Link
              href="/auth/cr-login"
              className="text-primary font-medium hover:underline"
            >
              Login as Class Representative
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthHome;
