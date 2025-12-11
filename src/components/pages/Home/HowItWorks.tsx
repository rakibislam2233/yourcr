// "use client";
// import React from "react";
// import { Target, Smartphone, BookOpen, Trophy } from "lucide-react";

// const steps = [
//   {
//     number: "01",
//     title: "Register as a CR",
//     desc: "Create your CR account with your institution details. Get started in just a few minutes with our simple registration process.",
//     icon: Target,
//     color: "text-purple-600",
//     bg: "bg-purple-100",
//   },
//   {
//     number: "02",
//     title: "Set Up Your Class",
//     desc: "Add your institution, department, and class details. Configure subjects, teachers, and routine to match your semester.",
//     icon: Smartphone,
//     color: "text-blue-600",
//     bg: "bg-blue-100",
//   },
//   {
//     number: "03",
//     title: "Add Your Students",
//     desc: "Invite students to join your class. They can access notices, routines, and submit issues directly through the platform.",
//     icon: BookOpen,
//     color: "text-green-600",
//     bg: "bg-green-100",
//   },
//   {
//     number: "04",
//     title: "Manage Everything",
//     desc: "Post notices, schedule classes, track assessments, and resolve student issues — all from your CR dashboard.",
//     icon: Trophy,
//     color: "text-orange-600",
//     bg: "bg-orange-100",
//   },
// ];

// const HowItWorks = () => {
//   return (
//     <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-gray-50">
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title */}
//         <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16 text-center">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
//             How It <span className="text-primary">Works</span>
//           </h2>
//           <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-4 sm:px-0">
//             Get started with YourCR in 4 simple steps. From registration to full
//             class management, we&apos;ve made it easy for every CR.
//           </p>
//         </div>

//         {/* Steps Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//           {steps.map((step, index) => {
//             const Icon = step.icon;
//             return (
//               <div key={index} className="relative">
//                 {/* Connector Line (desktop only) */}
//                 {index < steps.length - 1 && (
//                   <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gray-200">
//                     <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45"></div>
//                   </div>
//                 )}

//                 <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full">
//                   {/* Step Number */}
//                   <div className="flex items-center gap-4 mb-5">
//                     <div
//                       className={`w-12 h-12 sm:w-14 sm:h-14 ${step.bg} rounded-xl flex items-center justify-center`}
//                     >
//                       <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${step.color}`} />
//                     </div>
//                     <span className="text-3xl sm:text-4xl font-bold text-gray-200">
//                       {step.number}
//                     </span>
//                   </div>

//                   {/* Content */}
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
//                     {step.title}
//                   </h3>
//                   <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                     {step.desc}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;

"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Smartphone, BookOpen, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find What Fits You Best",
    desc: "Explore Topics, Instructors, or Academic levels & Select Courses Designed by Experienced Instructors.",
    icon: Target,
    color: "text-purple-600",
  },
  {
    number: "02",
    title: "Quick Enrollment, Instant Access",
    desc: "Sign Up and Dive Right Into Your Chosen Course With Structured Lessons and Progress Tracking.",
    icon: Smartphone,
    color: "text-blue-600",
  },
  {
    number: "03",
    title: "Learn By Doing",
    desc: "Watch Engaging Videos, Solve Quizzes, And Participate in Interactive Sessions to Strengthen Your Understanding.",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    number: "04",
    title: "Celebrate Your Success",
    desc: "Earn an Official Your CR Certificate Upon Completion And Add Value To Your Career or Academic Profile.",
    icon: Trophy,
    color: "text-orange-600",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Progress line height (0% → 100%)
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-32  overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-4 mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            From class scheduling to student communication, Our CR gives Class
            Representatives the power to manage everything effortlessly — all
            from one simple, intuitive dashboard. Stay organized, stay
            connected, and focus on what matters most: your class.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1.5 bg-gray-200 rounded-full hidden lg:block"
            style={{ height: "100%" }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-secondary rounded-full"
              style={{ height }}
            />
          </div>

          {/* Steps - Alternate Left/Right */}
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex flex-col lg:flex-row items-center gap-16 mb-32 last:mb-0 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <motion.div
                  className={`w-full lg:w-1/2 flex ${
                    isLeft ? "justify-end pr-20" : "justify-start pl-20"
                  } items-center`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    key={index}
                    className={`flex items-center justify-center ${step.color}`}
                  >
                    <Icon className="w-20 h-20" />
                  </motion.div>
                </motion.div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                  <div
                    className={`size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold `}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
