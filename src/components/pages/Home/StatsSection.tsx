"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  {
    number: "120+",
    label: "Active CRs",
    desc: "Class Representatives using YourCR to manage their classes.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    number: "3500+",
    label: "Connected Students",
    desc: "Students receiving notices, updates, and class info instantly.",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    number: "1000+",
    label: "Announcements",
    desc: "Notices and announcements made clearer and better organized.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    number: "800+",
    label: "Issues Solved",
    desc: "Problems resolved through digital CR-Student communication.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
];

const StatsSection = () => {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-60 sm:w-80 h-60 sm:h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-5 sm:space-y-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              YourCR In <span className="text-primary">Numbers</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              A simple idea that&apos;s making class management smarter. These
              numbers show how YourCR is helping Class Representatives and
              students stay more connected every day.
            </p>
            <Link href="/about-us">
              <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Right Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bg} ${stat.border} border rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="space-y-2 sm:space-y-3">
                  <p className={`text-3xl sm:text-4xl md:text-5xl font-bold ${stat.color}`}>
                    {stat.number}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {stat.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
