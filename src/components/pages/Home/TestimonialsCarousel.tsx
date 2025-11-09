"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Before, it was hard to track notices and class times — now with OUR CR, everything's in one place!",
    name: "Sherri Cronin",
    date: "June 15-17, 2025",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face",
  },
  {
    quote:
      "This platform transformed how we communicate. Students are more engaged and informed than ever!",
    name: "Maria Ahmed",
    date: "October 22, 2025",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop&crop=face",
  },
  {
    quote:
      "Managing class updates has never been easier. OUR CR saves me hours every week!",
    name: "James Wilson",
    date: "September 8, 2025",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop&crop=face",
  },
  {
    quote:
      "The best tool for class representatives. Real-time updates keep everyone on the same page!",
    name: "Ayesha Khan",
    date: "August 14, 2025",
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
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const t = testimonials[current];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-primary">Users Say</span>
          </h1>
          <p className="text-xl text-gray-600">
            Real stories from real class representatives
          </p>
        </div>

        {/* Main Card */}
        <div className="relative">
          {/* Card */}
          <div className="relative bg-white rounded-3xl shadow overflow-hidden ">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-5 md:p-16 flex flex-col justify-center relative">
                {/* Quote Mark */}
                <div className="text-8xl font-serif text-primary opacity-20 absolute top-8 left-8 leading-none">
                  &quot;
                </div>

                <div className="relative z-10 space-y-8">
                  {/* Quote */}
                  <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-light">
                    {t.quote}
                  </p>

                  {/* Author Info */}
                  <div className="space-y-3 pt-6 border-t-2 border-primary w-20">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{t.date}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-12">
                  <button
                    onClick={handlePrev}
                    disabled={isAnimating}
                    className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={isAnimating}
                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative h-[300px] md:min-h-[600px]">
                {/* Gradient Overlay Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-indigo-600/20 z-10" />

                {/* Image with decorative border */}
                <div className="absolute inset-4 md:inset-8 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    key={current}
                    src={t.image}
                    alt={t.name}
                    width={500}
                    height={600}
                    className="w-full h-full object-cover animate-[fadeIn_0.6s_ease-out]"
                    priority
                  />

                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrent(idx);
                  setTimeout(() => setIsAnimating(false), 600);
                }
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === current
                  ? "w-12 h-3 bg-primary"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;
