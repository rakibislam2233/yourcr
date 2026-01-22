"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = React.useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const t = testimonials[current];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-5xl w-full">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            What Users Say
          </h2>
          <p className="text-gray-600">
            Real feedback from class representatives
          </p>
        </div>

        {/* Clean Card */}
        <div className="bg-white rounded-2xl shadow p-6 sm:p-12 md:p-16">
          <div className="max-w-3xl mx-auto">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                <Image
                  key={current}
                  src={t.image}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  priority
                />
              </div>
            </div>

            {/* Quote */}
            <div className="text-center mb-8">
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-6">
                {` "${t.quote}"`}
              </p>

              {/* Author */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                disabled={isAnimating}
                className="w-10 h-10 rounded-full border cursor-pointer border-gray-300 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Progress Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrent(idx);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      idx === current
                        ? "w-8 h-2 bg-primary"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="w-10 h-10 rounded-full cursor-pointer bg-primary text-white flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
