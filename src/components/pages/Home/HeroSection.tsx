"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Brain } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 md:pt-28 lg:pt-32 xl:pt-40 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#DEECFE] to-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-9"
        >
          {/* Main Heading */}
          <div className="space-y-6">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  tracking-tight text-foreground font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block gradient-text mb-2">
                Master Every Subject
              </span>
              <span className="block text-foreground">
                with <span className="text-primary">Smart Quizzes</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Revolutionize your exam preparation with our intelligent Q&A
              generator. Create unlimited practice questions for any subject and
              competitive exams with just a few clicks.
            </motion.p>
          </div>

          {/* Key Benefits */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-medium">Adaptive AI Learning</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-medium">All Subjects Covered</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-medium">Instant Question Generation</span>
              </div>
            </div>
          </motion.div>
          {/* Social Proof */}
          <motion.div
            className="pt-10 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
              Trusted by Students Across Bangladesh
            </p>
            <div className="flex justify-center items-center space-x-8 text-muted-foreground/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm">Questions Generated</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm">Active Students</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm">Subjects Covered</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="hidden md:absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-primary/20 text-6xl"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute top-40 right-16 text-primary/20 text-5xl"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🧠
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-primary/20 text-4xl"
          animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-primary/20 text-5xl"
          animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🎓
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
