"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight} from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full min-h-screen relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#DEECFE] to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600 font-medium">Trusted by 120+ Class Representatives</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-900 font-bold leading-tight">
            <span className="block mb-2">Manage Your Education</span>
            <span className="block">
              Smarter with <span className="text-primary">YourCR</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A simple platform for Class Representatives to organize classes,
            announcements, and student issues — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
            <Link href="/auth/cr-login">
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg gap-2">
                Login as CR
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Link href="/auth/student-login">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-primary text-primary hover:bg-primary/5"
              >
                Login as Student
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
