"use client";

import { Button } from "@/components/ui/button";
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import React, { useRef } from "react";

const stats = [
  {
    number: 120,
    suffix: "+",
    label: "Active CRs",
    desc: "Class Representatives using OUR CR to manage their classes.",
    color: "text-green-600"
  },
  {
    number: 3500,
    suffix: "+",
    label: "Connected Students",
    desc: "Students receiving notices, updates, and class info instantly.",
    color: "text-red-600"
  },
  {
    number: 1000,
    suffix: "+",
    label: "Announcements Shared",
    desc: "Notices and announcements made clearer and better organized.",
    color: "text-blue-600",
  },
  {
    number: 800,
    suffix: "+",
    label: "Student Issues Solved",
    desc: "Problems resolved efficiently through digital CR-Student communication.",
    color: "text-purple-600"
  },
];

const AnimatedCounter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  const displayValue = useTransform(
    springValue,
    (current) => Math.round(current) + suffix
  );

  return (
    <motion.span ref={ref} className="font-bold text-5xl md:text-6xl">
      {displayValue}
    </motion.span>
  );
};

const StatsSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32  bg-linear-to-l from-[#F8FAFC] to-white overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div className="space-y-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Our CR In <span className="text-primary">Numbers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A simple idea that&apos;s making class management smarter. These
              numbers show how YOUR CR is helping Class Representatives and
              students stay more connected every day.
            </p>
            <Button size="lg" className="h-14 px-10 cursor-pointer ">
              Learn More
            </Button>
          </motion.div>

          {/* Right Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200 cursor-pointer"
              >
                {/* Gradient Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-xl bg-linear-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                ></div>

                <div className="space-y-4">
                  <div className={stat.color}>
                    <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
