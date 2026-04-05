import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdCampaign } from "react-icons/md";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.3), transparent)
      `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      {/* Background glow blob - smaller on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />

      <div className="w-full container mx-auto px-4 md:px-6  grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left - Text content */}
        <div className="flex flex-col gap-7 md:gap-9 text-center lg:text-left z-10">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold ">
            Simplify Class 
            <span className="relative inline-block">Management</span> with{" "}
            <span className="text-primary">Your CR</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-text-muted  max-w-lg mx-auto lg:mx-0 leading-relaxed">
            The all-in-one platform bridging the gap between students, reps, and
            faculty. Announcements, polls, and resources — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link href="/auth/cr-register">
              <Button variant="default" className="px-5 h-12">
                Register as CR
              </Button>
            </Link>

            <Link href="#how-it-works">
              <Button variant="outline" className="px-5 h-12">
                How It Works
              </Button>
            </Link>
          </div>
        </div>

        {/* Right - Image + floating card */}
        <div className="relative hidden md:block w-full max-w-[420px] sm:max-w-[580px] lg:max-w-none mx-auto">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ02NOE3WQ9k6Z0hCZh9MxH6cAHvpwTf12CQ4VRO_fwR0S-2fyIHFX_CPh_0WvrLlXjw-C9hHvMjtCRBKkiZT8HJ1duKKXhSBWWM-1460QNt9U1bBMWxqaXI9NcCcDF4lxN0VRkL37kYny5Yd_whnRdWSxXX2VZ1wVLzTaIjOQ9i3c6up_pKIRNN2z2Srgc2zp-qwN1R3GfLl1sE8R2vXF81pSF-SVuBqv1ue0cfW0eyPfkjApxai2QPCRjej1bwmQPR_r9z1pYAw"
              alt="Class representative dashboard preview"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
            />
          </div>

          {/* Floating notification card */}
          <div className="absolute -bottom-6 sm:-bottom-8 md:bottom-6 lg:bottom-8 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 bg-white/95  backdrop-blur-lg p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30 transform transition-all duration-300 hover:-translate-y-1.5">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3">
              <div className="bg-primary/15 p-2.5 rounded-full text-primary shrink-0">
                <MdCampaign className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">
                  New Announcement
                </p>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  Class schedule updated for CS-101
                </p>
              </div>
            </div>

            <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4 rounded-full" />
            </div>

            <div className="flex justify-between mt-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-text-muted">
              <span>Read by 84%</span>
              <span>Just now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
