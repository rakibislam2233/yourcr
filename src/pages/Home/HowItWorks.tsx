"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  LayoutDashboard,
  LogInIcon,
  MessageSquare,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const studentSteps = [
  {
    step: "01",
    title: "Join Your Class",
    desc: "Your CR will add you using your email or phone number. You'll receive an invitation — just accept and log in.",
    icon: LogInIcon,
  },
  {
    step: "02",
    title: "Get Notices & Routine",
    desc: "See class routine, subjects, teachers, notices, exam schedules, and assessments — all in one place.",
    icon: Bell,
  },
  {
    step: "03",
    title: "Stay Updated",
    desc: "Get real-time push notifications for new notices, routine changes, or announcements directly on your phone.",
    icon: CheckCircle2,
  },
  {
    step: "04",
    title: "Submit Issues",
    desc: "Raise concerns, suggestions, or problems anonymously. Only aggregated feedback goes to teachers.",
    icon: MessageSquare,
  },
];

const repSteps = [
  {
    step: "01",
    title: "Register as CR",
    desc: "Submit your details and institution info. Admin will verify and approve your CR account within 24 hours.",
    icon: LayoutDashboard,
  },
  {
    step: "02",
    title: "Create Class Group",
    desc: "Create a new class (e.g., HSC 1st Year). You can manage multiple classes with the same account.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Add Students",
    desc: "Add students by email/phone. Manage routine, notices, assessments, and view student issues.",
    icon: Users,
  },
  {
    step: "04",
    title: "Continue Next Year",
    desc: "When moving to the next semester, just create a new class group and re-invite students instantly.",
    icon: ArrowRight,
  },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"students" | "reps">("students");

  return (
    <section className="py-24 bg-gray-50/50 overflow-hidden">
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-primary">YourCR</span> Works
          </h2>
          <p className="text-lg text-gray-600">
            A simple, streamlined process for both Students and Class
            Representatives to stay connected and organized.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-lg border border-gray-100 inline-flex">
            <button
              onClick={() => setActiveTab("students")}
              className={`relative px-8 py-3 cursor-pointer rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "students" ? "text-white" : "text-gray-600"
              }`}
            >
              {activeTab === "students" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Users className="w-4 h-4" />
                For Students
              </span>
            </button>
            <button
              onClick={() => setActiveTab("reps")}
              className={`relative px-8 py-3 cursor-pointer rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === "reps" ? "text-white" : "text-gray-600"
              }`}
            >
              {activeTab === "reps" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                For Representatives
              </span>
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
                {/* Left Side: Steps */}
                <div className="lg:w-1/2 p-8 md:p-12 lg:p-16">
                  <h3 className="text-2xl font-bold mb-8 text-gray-900">
                    {activeTab === "students"
                      ? "Student Journey"
                      : "Representative Journey"}
                  </h3>

                  <div className="space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100 hidden sm:block" />

                    {(activeTab === "students" ? studentSteps : repSteps).map(
                      (step, idx) => (
                        <div key={idx} className="relative flex gap-6 group">
                          {/* Icon/Step Number */}
                          <div className="shrink-0 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-white border-2 border-primary/10 text-primary flex items-center justify-center transition-all duration-300">
                              <step.icon className="w-5 h-5" />
                            </div>
                          </div>

                          {/* Text */}
                          <div className="pt-1.5">
                            <div className="flex flex-col items-start gap-3 mb-2">
                              <span className="text-xs font-bold text-primary/60 bg-primary/5 px-2 py-1 rounded uppercase tracking-wider">
                                Step {step.step}
                              </span>
                              <h4 className="text-lg font-bold text-gray-900">
                                {step.title}
                              </h4>
                            </div>
                            <p className="text-gray-500 text-start leading-relaxed text-sm">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Right Side: Visual */}
                <div className="lg:w-1/2 bg-linear-to-br from-gray-50 to-blue-50/50 p-8 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
                  {/* Background Blobs */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 rounded-2xl overflow-hidden border-4 border-white transition-transform duration-500">
                      <Image
                        src={
                          activeTab === "students"
                            ? "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                            : "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                        }
                        alt={
                          activeTab === "students"
                            ? "Student using app"
                            : "CR managing class"
                        }
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {activeTab === "students"
                        ? "Everything In One Place"
                        : "Manage With Ease"}
                    </h4>
                    <p className="text-gray-500 max-w-sm">
                      {activeTab === "students"
                        ? "Access your routine, notices, and class materials from anywhere, anytime."
                        : "A powerful dashboard to handle all your class representative responsibilities."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
