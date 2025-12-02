"use client";
import React from "react";
import Image from "next/image";
import { Target, Users, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 bg-gradient-to-b from-primary/5 via-white to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 sm:mb-6">
              About YourCR
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Simplifying Classroom{" "}
              <span className="text-primary">Management</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              At YourCR, we believe classroom management shouldn&apos;t be stressful.
              We&apos;re building tools that empower Class Representatives to focus on what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 md:mb-24">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&h=500&fit=crop"
                  alt="Students working together"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">120+</p>
                    <p className="text-xs sm:text-sm text-gray-500">Active CRs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Built for Every Class Representative
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Welcome to YourCR, your go-to platform for streamlined classroom
                management. As a Class Representative, you&apos;re often juggling
                multiple tasks and responsibilities, but we&apos;ve made it easy for
                you to stay connected with your students and manage your class
                efficiently.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                YourCR is a smart, web-based platform designed with one clear goal:
                to make communication between CRs and students fast, transparent,
                and organized. No more chasing updates, lost messages, or scattered
                notes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Link href="/auth/cr-register">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="pt-8 sm:pt-12">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Mission, Vision & Values
              </h2>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 sm:mb-6 rounded-full" />
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                We believe in teamwork — connecting CRs, students, and teachers in
                a shared digital space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "To empower Class Representatives with modern tools that simplify daily tasks, reduce stress, and strengthen community — making every classroom run smoothly.",
                  color: "bg-blue-500",
                  lightColor: "bg-blue-50",
                  iconColor: "text-blue-600",
                },
                {
                  icon: Users,
                  title: "Our Vision",
                  desc: "To become the go-to digital companion for every CR in every college — creating connected, transparent, and thriving academic communities worldwide.",
                  color: "bg-green-500",
                  lightColor: "bg-green-50",
                  iconColor: "text-green-600",
                },
                {
                  icon: HeartHandshake,
                  title: "Our Values",
                  desc: "At YourCR, we stand for simplicity, transparency, and reliability — building trust with every update, every feature, and every connection we help create.",
                  color: "bg-purple-500",
                  lightColor: "bg-purple-50",
                  iconColor: "text-purple-600",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 ${item.lightColor} rounded-xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <item.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-primary to-primary/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Classroom?
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join hundreds of Class Representatives who are already making their
            academic life easier with YourCR.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/auth/cr-register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                Register as CR <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
