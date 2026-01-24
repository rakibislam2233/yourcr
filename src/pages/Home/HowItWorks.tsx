"use client";

import {
    BarChart3,
    Bell,
    LayoutDashboard,
    LogInIcon,
    MessageSquare,
    Users,
} from "lucide-react";
import { useState } from "react";

const HowItWorks = () => {
  const [activeView, setActiveView] = useState<"students" | "reps">("students");

  return (
    <main className="min-h-screen bg-background-light font-display text-gray-900">
      {/* Toggle Control */}
      <div className="sticky top-0 z-40 bg-background-light py-8">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-md items-center justify-center rounded-xl bg-white p-1.5 border border-gray-200">
            <button
              onClick={() => setActiveView("students")}
              className={`flex flex-1 items-center cursor-pointer justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all ${
                activeView === "students"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LogInIcon className="size-5" />
              For Students
            </button>
            <button
              onClick={() => setActiveView("reps")}
              className={`flex flex-1 items-center cursor-pointer justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-all ${
                activeView === "reps"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="size-5" />
              For CR
            </button>
          </div>
        </div>
      </div>

      {/* Dual Column Process Flow */}
      <section className="pb-24">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Column 1: Students */}
            <div
              className={`relative flex flex-col gap-12 transition-opacity duration-500 ${
                activeView === "students" ? "opacity-100" : "opacity-50"
              }`}
            >
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gray-300 hidden lg:block" />
              <h3 className="text-3xl font-bold text-gray-900 lg:hidden">
                Student Journey
              </h3>

              {/* Step 1 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white ring-4 ring-primary/20">
                  <LogInIcon className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-primary">
                    Step 01
                  </span>
                  <h3 className="text-2xl font-bold mb-3">Join Your Class</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your CR will add you using your email or phone number.
                    You&apos;ll receive an invitation — just accept and log in.
                    No need to create an account yourself.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <Bell className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 02
                  </span>
                  <h3 className="text-2xl font-bold mb-3">
                    Get Notices & Routine
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    See class routine, subjects, teachers, notices, exam
                    schedules, and assessments — all in one place.
                  </p>
                </div>
              </div>

              {/* New Step 3 - Added */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <Bell className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 03
                  </span>
                  <h3 className="text-2xl font-bold mb-3">
                    Stay Updated with Notifications
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get real-time push notifications for new notices, routine
                    changes, upcoming exams, or important announcements directly
                    on your phone or dashboard.
                  </p>
                </div>
              </div>

              {/* Step 4 (Previously Step 3) */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <MessageSquare className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 04
                  </span>
                  <h3 className="text-2xl font-bold mb-3">
                    Submit Issues Anonymously
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Raise concerns, suggestions, or problems. Your identity
                    stays hidden — only aggregated feedback goes to teachers.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Representatives */}
            <div
              className={`relative flex flex-col gap-12 transition-opacity duration-500 ${
                activeView === "reps" ? "opacity-100" : "opacity-50"
              }`}
            >
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gray-300 hidden lg:block" />
              <h3 className="text-3xl font-bold text-gray-900 lg:hidden">
                Representative Journey
              </h3>

              {/* Step 1 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <LayoutDashboard className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 01
                  </span>
                  <h3 className="text-2xl font-bold mb-3">Register as CR</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Submit your details and institution info. Admin will verify
                    and approve your CR account (usually within 24 hours).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <BarChart3 className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 02
                  </span>
                  <h3 className="text-2xl font-bold mb-3">
                    Create New Class Group
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Create a new class (e.g., HSC 1st Year, BSc 2nd Semester).
                    You can manage multiple classes with the same account.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <Users className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 03
                  </span>
                  <h3 className="text-2xl font-bold mb-3">
                    Add Students & Manage
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Add students by email/phone. Manage routine, notices,
                    assessments, and view student issues.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <Users className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 04
                  </span>
                  <h3 className="text-2xl font-bold mb-3">
                    Continue Next Semester/Year
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    When moving to next year/semester, just create a new class
                    group and re-invite students. No re-registration needed!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
