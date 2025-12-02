"use client";
import React from "react";
import { Target, Smartphone, BookOpen, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Register as a CR",
    desc: "Create your CR account with your institution details. Get started in just a few minutes with our simple registration process.",
    icon: Target,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    number: "02",
    title: "Set Up Your Class",
    desc: "Add your institution, department, and class details. Configure subjects, teachers, and routine to match your semester.",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    number: "03",
    title: "Add Your Students",
    desc: "Invite students to join your class. They can access notices, routines, and submit issues directly through the platform.",
    icon: BookOpen,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    number: "04",
    title: "Manage Everything",
    desc: "Post notices, schedule classes, track assessments, and resolve student issues — all from your CR dashboard.",
    icon: Trophy,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-gray-50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-4 sm:px-0">
            Get started with YourCR in 4 simple steps. From registration to full
            class management, we&apos;ve made it easy for every CR.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gray-200">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45"></div>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${step.bg} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${step.color}`} />
                    </div>
                    <span className="text-3xl sm:text-4xl font-bold text-gray-200">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
