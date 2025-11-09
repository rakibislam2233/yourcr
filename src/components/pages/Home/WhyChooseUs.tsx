// app/components/WhyChooseUs.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Bell,
  FileText,
  MessageCircle,
  Network,
  Brain,
} from "lucide-react";

const features = [
  {
    icon: Users,
    color: "text-green-500",
    bg: "bg-green-50",
    title: "Manage Students Effortlessly",
    desc: "Add, edit, or remove students with secure login credentials — keep your class organized in one place.",
  },
  {
    icon: Calendar,
    color: "text-red-500",
    bg: "bg-red-50",
    title: "Offline & Online Class Planner",
    desc: "Schedule, update, and track both online and offline classes seamlessly, with reminders for everyone.",
  },
  {
    icon: Bell,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    title: "Stay Informed Instantly",
    desc: "Post important updates and academic notices that reach every student in seconds.",
  },
  {
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Easy Assignment Handling",
    desc: "Upload assignments, share resources, and track submissions without confusion.",
  },
  {
    icon: MessageCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "Listen & Solve Quickly",
    desc: "Students can submit personal issues, and CRs can mark them as resolved — ensuring smooth communication.",
  },
  {
    icon: Network,
    color: "text-purple-500",
    bg: "bg-purple-50",
    title: "Build a Connected Class",
    desc: "A dedicated space where students and CRs can discuss classes, share notes, and stay engaged.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[#F8FAFC] overflow-hidden">
      {/* Subtle Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary rounded-lg mx-auto mb-10"
        >
          <Brain className="w-6 h-6 text-primary" />
          <span className="text-primary font-semibold text-sm">
            Key Features
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Why Choose <span className="text-primary">Your CR?</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            From class scheduling to student communication, Our CR gives Class
            Representatives the power to manage everything effortlessly — all
            from one simple, intuitive dashboard. Stay organized, stay
            connected, and focus on what matters most: your class.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 ease-in-out"
              >
                {/* Content */}
                <div className="w-full  border border-gray-200 rounded-lg space-y-4 px-5 py-8 cursor-pointer  ">
                  <div
                    className={`w-16 h-16 ${feature.bg} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
