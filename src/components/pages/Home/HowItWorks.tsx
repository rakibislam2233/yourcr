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
