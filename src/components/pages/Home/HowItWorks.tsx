// // "use client";
// // import React from "react";
// // import { Target, Smartphone, BookOpen, Trophy } from "lucide-react";

// // const steps = [
// //   {
// //     number: "01",
// //     title: "Register as a CR",
// //     desc: "Create your CR account with your institution details. Get started in just a few minutes with our simple registration process.",
// //     icon: Target,
// //     color: "text-purple-600",
// //     bg: "bg-purple-100",
// //   },
// //   {
// //     number: "02",
// //     title: "Set Up Your Class",
// //     desc: "Add your institution, department, and class details. Configure subjects, teachers, and routine to match your semester.",
// //     icon: Smartphone,
// //     color: "text-blue-600",
// //     bg: "bg-blue-100",
// //   },
// //   {
// //     number: "03",
// //     title: "Add Your Students",
// //     desc: "Invite students to join your class. They can access notices, routines, and submit issues directly through the platform.",
// //     icon: BookOpen,
// //     color: "text-green-600",
// //     bg: "bg-green-100",
// //   },
// //   {
// //     number: "04",
// //     title: "Manage Everything",
// //     desc: "Post notices, schedule classes, track assessments, and resolve student issues — all from your CR dashboard.",
// //     icon: Trophy,
// //     color: "text-orange-600",
// //     bg: "bg-orange-100",
// //   },
// // ];

// // const HowItWorks = () => {
// //   return (
// //     <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-gray-50">
// //       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Title */}
// //         <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16 text-center">
// //           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
// //             How It <span className="text-primary">Works</span>
// //           </h2>
// //           <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-4 sm:px-0">
// //             Get started with YourCR in 4 simple steps. From registration to full
// //             class management, we&apos;ve made it easy for every CR.
// //           </p>
// //         </div>

// //         {/* Steps Grid */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
// //           {steps.map((step, index) => {
// //             const Icon = step.icon;
// //             return (
// //               <div key={index} className="relative">
// //                 {/* Connector Line (desktop only) */}
// //                 {index < steps.length - 1 && (
// //                   <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gray-200">
// //                     <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45"></div>
// //                   </div>
// //                 )}

// //                 <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full">
// //                   {/* Step Number */}
// //                   <div className="flex items-center gap-4 mb-5">
// //                     <div
// //                       className={`w-12 h-12 sm:w-14 sm:h-14 ${step.bg} rounded-xl flex items-center justify-center`}
// //                     >
// //                       <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${step.color}`} />
// //                     </div>
// //                     <span className="text-3xl sm:text-4xl font-bold text-gray-200">
// //                       {step.number}
// //                     </span>
// //                   </div>

// //                   {/* Content */}
// //                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
// //                     {step.title}
// //                   </h3>
// //                   <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
// //                     {step.desc}
// //                   </p>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default HowItWorks;

// "use client";
// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Target, Smartphone, BookOpen, Trophy } from "lucide-react";

// const steps = [
//   {
//     number: "01",
//     title: "Find What Fits You Best",
//     desc: "Explore Topics, Instructors, or Academic levels & Select Courses Designed by Experienced Instructors.",
//     icon: Target,
//     color: "text-purple-600",
//   },
//   {
//     number: "02",
//     title: "Quick Enrollment, Instant Access",
//     desc: "Sign Up and Dive Right Into Your Chosen Course With Structured Lessons and Progress Tracking.",
//     icon: Smartphone,
//     color: "text-blue-600",
//   },
//   {
//     number: "03",
//     title: "Learn By Doing",
//     desc: "Watch Engaging Videos, Solve Quizzes, And Participate in Interactive Sessions to Strengthen Your Understanding.",
//     icon: BookOpen,
//     color: "text-green-600",
//   },
//   {
//     number: "04",
//     title: "Celebrate Your Success",
//     desc: "Earn an Official Your CR Certificate Upon Completion And Add Value To Your Career or Academic Profile.",
//     icon: Trophy,
//     color: "text-orange-600",
//   },
// ];

// const HowItWorks = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   // Progress line height (0% → 100%)
//   const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full py-16 md:py-24 lg:py-32  overflow-hidden"
//     >
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="max-w-3xl mx-auto space-y-4 mb-16 text-center"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
//             How It <span className="text-primary">Works</span>
//           </h2>
//           <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
//             From class scheduling to student communication, Our CR gives Class
//             Representatives the power to manage everything effortlessly — all
//             from one simple, intuitive dashboard. Stay organized, stay
//             connected, and focus on what matters most: your class.
//           </p>
//         </motion.div>

//         {/* Timeline Container */}
//         <div className="relative">
//           <div
//             className="absolute left-1/2 -translate-x-1/2 w-1.5 bg-gray-200 rounded-full hidden lg:block"
//             style={{ height: "100%" }}
//           >
//             <motion.div
//               className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-secondary rounded-full"
//               style={{ height }}
//             />
//           </div>

//           {/* Steps - Alternate Left/Right */}
//           {steps.map((step, index) => {
//             const Icon = step.icon;
//             const isLeft = index % 2 === 0;

//             return (
//               <motion.div
//                 key={index}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 className={`flex flex-col lg:flex-row items-center gap-16 mb-32 last:mb-0 ${
//                   isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
//                 }`}
//               >
//                 <motion.div
//                   className={`w-full lg:w-1/2 flex ${
//                     isLeft ? "justify-end pr-20" : "justify-start pl-20"
//                   } items-center`}
//                 >
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.7, delay: 0.2 }}
//                     key={index}
//                     className={`flex items-center justify-center ${step.color}`}
//                   >
//                     <Icon className="w-20 h-20" />
//                   </motion.div>
//                 </motion.div>

//                 {/* Text Content */}
//                 <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
//                   <div
//                     className={`size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold `}
//                   >
//                     {step.number}
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-bold text-foreground">
//                     {step.title}
//                   </h3>
//                   <p className="text-lg text-muted-foreground leading-relaxed">
//                     {step.desc}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;

"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Bell,
  LayoutDashboard,
  BarChart3,
  Users,
  Rocket,
  ArrowRight,
  LogIn,
  LogInIcon,
} from "lucide-react";

const HowItWorks = () => {
  const [activeView, setActiveView] = useState<"students" | "reps">("students");

  return (
    <main className="min-h-screen bg-background-light font-display text-gray-900">
      {/* Toggle Control */}
      <div className="sticky top-0 z-40 bg-background-light py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-md items-center justify-center rounded-xl bg-white p-1.5 shadow-md border border-gray-200">
            <button
              onClick={() => setActiveView("students")}
              className={`flex flex-1 items-center cursor-pointer justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all ${
                activeView === "students"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LogIn className="size-5" />
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
              For Representatives
            </button>
          </div>
        </div>
      </div>

      {/* Dual Column Process Flow */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-primary/20">
                  <LogInIcon className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-primary">
                    Step 01
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Join Your Class
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Use the unique class code or invite link provided by your CR
                    to instantly join your academic hub. No lengthy forms
                    required.
                  </p>
                  <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="h-3 w-32 rounded bg-gray-300"></div>
                    </div>
                    <div className="mt-4 h-20 w-full rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <MessageSquare className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 02
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Voice Concerns
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Submit issues, suggestions, or vote on class matters
                    anonymously. Your feedback is aggregated securely before
                    reaching faculty.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                      <MessageSquare className="size-10 text-primary mx-auto mb-2" />
                      <div className="h-3 w-20 mx-auto rounded bg-gray-300"></div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                      <MessageSquare className="size-10 text-purple-600 mx-auto mb-2" />
                      <div className="h-3 w-20 mx-auto rounded bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <Bell className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 03
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Stay Updated
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Receive real-time notifications for schedule changes, exam
                    dates, and important announcements directly on your
                    dashboard.
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
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <LayoutDashboard className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 01
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Create & Manage Hub
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Set up the class dashboard in minutes. Customize categories
                    for subjects, exams, and general queries to keep things
                    organized.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <BarChart3 className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 02
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Review Feedback
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Access a powerful admin panel to review student polls and
                    concerns. Aggregate data to identify common issues without
                    sifting through noise.
                  </p>
                  <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <div className="flex h-24 items-end justify-around gap-2 px-4">
                      <div className="w-1/4 rounded-t bg-primary/40 h-[40%]" />
                      <div className="w-1/4 rounded-t bg-primary/60 h-[70%]" />
                      <div className="w-1/4 rounded-t bg-primary/80 h-[50%]" />
                      <div className="w-1/4 rounded-t bg-primary h-[90%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative flex gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-4 ring-gray-200 group-hover:bg-primary group-hover:text-white group-hover:ring-primary/20 transition-all">
                  <Users className="size-8" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="mb-1 font-mono text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-primary transition-colors">
                    Step 03
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Liaison with Faculty
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Generate professional reports from collected data and
                    forward them to faculty members with a single click. Bridge
                    the gap effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 px-8 py-20 lg:flex lg:items-center lg:gap-20 lg:px-24">
            <div className="relative mx-auto max-w-md text-center lg:mx-0 lg:max-w-none lg:text-left">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Ready to organize
                <br />
                your academic life?
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Join thousands of students and class representatives simplifying
                their daily coordination with Your CR.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 lg:justify-start">
                <a
                  href="#"
                  className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary/90 transition-all"
                >
                  Get started for free
                  <ArrowRight className="ml-2 size-5" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  Learn more <span className="ml-1">→</span>
                </a>
              </div>
            </div>

            <div className="relative mt-16 lg:mt-0 lg:w-1/2 flex justify-center">
              <div className="relative w-80 aspect-square">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow"></div>
                <div className="absolute inset-8 rounded-full border-2 border-primary/40 animate-spin-slow-reverse"></div>
                <div className="absolute inset-16 rounded-full bg-gray-50 border border-primary/10 flex flex-col items-center justify-center shadow-inner">
                  <Rocket className="size-20 text-primary mb-3" />
                  <p className="text-xl font-bold text-gray-900">
                    Launch Today
                  </p>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
