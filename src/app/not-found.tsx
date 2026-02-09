"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated 404 text */}
          <div className="relative inline-block mb-8">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-[120px] md:text-[200px] font-black text-gray-900 leading-none tracking-tighter"
            >
              404
            </motion.h1>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-8 md:-right-8 bg-primary p-4 md:p-6 rounded-2xl shadow-2xl text-white transform rotate-12"
            >
              <Search className="w-8 h-8 md:w-12 md:h-12" />
            </motion.div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Oops! Page Not Found
          </h2>

          <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable. Let&apos;s get you back on
            track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button
                size="lg"
                className="h-14 px-8 gap-2 text-base font-bold  hover:shadow-primary/30 active:scale-95 transition-all"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="h-14 px-8 flex items-center gap-2 text-gray-600 font-bold hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </motion.div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 pt-10 border-t border-gray-200 flex flex-wrap justify-center gap-6"
        >
          <Link
            href="/faq"
            className="text-sm font-semibold text-gray-400 hover:text-primary transition-colors"
          >
            Help Center
          </Link>
          <Link
            href="/contact-us"
            className="text-sm font-semibold text-gray-400 hover:text-primary transition-colors"
          >
            Contact Support
          </Link>
          <Link
            href="/about-us"
            className="text-sm font-semibold text-gray-400 hover:text-primary transition-colors"
          >
            About YourCR
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
