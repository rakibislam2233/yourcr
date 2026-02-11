"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Bell, CheckCircle, School, Users } from "lucide-react";
import React, { useRef } from "react";

const stats = [
  {
    number: 120,
    suffix: "+",
    label: "Active CRs",

    icon: Users,
  },
  {
    number: 3500,
    suffix: "+",
    label: "Connected Students",

    icon: School,
  },
  {
    number: 1000,
    suffix: "+",
    label: "Announcements",

    icon: Bell,
  },
  {
    number: 800,
    suffix: "+",
    label: "Issues Solved",

    icon: CheckCircle,
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
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  const displayValue = useTransform(
    springValue,
    (current) => Math.round(current) + suffix,
  );

  return (
    <motion.span ref={ref} className="tracking-tight">
      {displayValue}
    </motion.span>
  );
};

const StatsSection = () => {
  return (
    <section className="relative w-full py-20 border-y border-slate-100 bg-white overflow-hidden">
      {/* Subtle Background Pattern (Matches Hero) */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle 800px at 10% 10%, rgba(59,130,246,0.03), transparent),
            radial-gradient(circle 800px at 90% 90%, rgba(139,92,246,0.03), transparent)
          `,
        }}
      />

      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-1 min-w-[200px] max-w-[280px] flex flex-col items-center text-center py-6 px-4 border border-gray-100 rounded-lg hover:border-primary transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-primary">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <div className="text-4xl font-extrabold text-slate-900 mb-2">
                <AnimatedCounter value={stat.number} suffix={stat.suffix} />
              </div>

              <h3 className="text-sm font-medium text-slate-500 tracking-wide">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
