"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Users, HeartHandshake } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-gradient-to-t from-primary/10 via-secondary/5 to-primary/20 overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 leading-tight"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-700 font-medium"
            >
              At OUR CR, we believe classroom management shouldn&apos;t be
              stressful.
            </motion.p>
          </motion.div>
        </div>
        {/* Enhanced Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full">
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,100 C320,200 1120,0 1440,100 L1440,200 L0,200 Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Text Content with Image */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            {/* Floating Image with Parallax Effect */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&h=500&fit=crop"
                alt="Student Graduate"
                width={400}
                height={400}
                className="object-contain relative z-10 drop-shadow-2xl"
              />
            </motion.div>

            {/* Enhanced Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Simplifying Classroom Management for Every CR
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to OUR CR, your go-to platform for streamlined classroom
                management. As a Class Representative, you&apos;re often
                juggling multiple tasks and responsibilities, but we&apos;ve
                made it easy for you to stay connected with your students and
                manage your class efficiently.
              </p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-gray-700 leading-relaxed"
              >
                OUR CR is a smart, web-based platform built to make every Class
                Representative&apos;s job easier., From managing students list
                and class schedules to posting announcements and assignments —
                OUR CR does it all. Designed with one clear goal: to make
                communication between CRs and students fast, transparent, and
                organized., No more chasing updates, lost messages, or scattered
                notes — OUR CR keeps your academic world connected, one click at
                a time.
              </motion.p>
            </motion.div>
          </div>

          {/* Mission, Vision & Values */}
          <div className="mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Mission, Vision & Values
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full" />
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                We believe in teamwork — connecting CRs, students, and teachers
                in a shared digital space.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "To empower Class Representatives with modern tools that simplify daily tasks, reduce stress, and strengthen community — making every classroom run smoothly.",
                  gradient: "from-primary/80 to-primary",
                  delay: 0,
                },
                {
                  icon: Users,
                  title: "Our Vision",
                  desc: "To become the go-to digital companion for every CR in every college — creating connected, transparent, and thriving academic communities worldwide.",
                  gradient: "from-secondary/80 to-secondary",
                  delay: 0.2,
                },
                {
                  icon: HeartHandshake,
                  title: "Our Values",
                  desc: "At OUR CR, we stand for simplicity, transparency, and reliability — building trust with every update, every feature, and every connection we help create.",
                  gradient: "from-primary to-secondary",
                  delay: 0.4,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay }}
                  className="bg-white rounded-xl p-10 text-center border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden cursor-pointer"
                >
                  {/* Hover Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10`}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">
                    {item.desc}
                  </p>

                  {/* Decorative Corner Elements */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-5 rounded-bl-full`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${item.gradient} opacity-5 rounded-tr-full`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
