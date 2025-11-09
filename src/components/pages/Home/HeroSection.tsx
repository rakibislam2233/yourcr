"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full h-full md:h-screen relative sm:px-6 lg:px-8 pt-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#DEECFE] to-white">
      {/* Background Blur Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8  text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-9"
        >
          <div className="space-y-6">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block mb-2">Manage Your education</span>
              <span className="block text-foreground">
                Smarter with <span className="text-primary">Your CR</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              “A simple platform for Class Representatives to organize classes,
              announcements, and student issues — all in one place.”
            </motion.p>

            <motion.div className="w-full flex justify-center items-center gap-8 mt-8 sm:mt-10 md:mt-12">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <Button
                  variant="default"
                  size="lg"
                  className="h-13 px-8 border-2 border-primary cursor-pointer"
                >
                  Login as CR
                </Button>
              </motion.div>

              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-13 px-8 border-2 border-primary text-primary cursor-pointer"
                >
                  Join as Student
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
