"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "Before, it was hard to track notices and class times — now with OUR CR, everything's in one place!",
    name: "Sherri Cronin",
    role: "Class Representative",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face",
  },
  {
    quote:
      "This platform transformed how we communicate. Students are more engaged and informed than ever!",
    name: "Maria Ahmed",
    role: "Department CR",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop&crop=face",
  },
  {
    quote:
      "Managing class updates has never been easier. OUR CR saves me hours every week!",
    name: "James Wilson",
    role: "Student Leader",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop&crop=face",
  },
  {
    quote:
      "The best tool for class representatives. Real-time updates keep everyone on the same page!",
    name: "Ayesha Khan",
    role: "Class Representative",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop&crop=face",
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent(
      (prev) =>
        (prev + newDirection + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const t = testimonials[current];

  return (
    <div className="relative w-full flex items-center justify-center py-20 bg-linear-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold  mb-4">
            What <span className="text-primary">Users</span> Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trusted by students and class representatives across the campus
          </p>
        </div>

        <div className="relative h-[500px] md:h-[400px] w-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-4xl"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/5 border border-white/20 p-8 md:p-12 overflow-hidden">
                <div className="grid md:grid-cols-[1fr,2fr] gap-8 items-center">
                  <div className="relative group mx-auto md:mx-0">
                    <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-primary">
                      <Quote className="w-6 h-6 fill-current opacity-20" />
                    </div>
                  </div>

                  <div className="text-center md:text-left space-y-6">
                    <Quote className="w-12 h-12 text-blue-100 fill-current absolute top-6 right-8 hidden md:block rotate-180" />

                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                      &quot;{t.quote}&quot;
                    </p>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-primary font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all active:scale-95 group cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
          </button>

          <div className="flex gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className="group p-2 cursor-pointer outline-none"
                aria-label={`Go to testimonial ${idx + 1}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full h-2.5 ${
                    idx === current
                      ? "w-8 bg-primary shadow-lg shadow-blue-500/30"
                      : "w-2.5 bg-gray-300 group-hover:bg-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all active:scale-95 group cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
