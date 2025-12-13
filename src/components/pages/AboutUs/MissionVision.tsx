import { Eye, Target } from "lucide-react";
import React from "react";

const MissionVision = () => {
  return (
    <section className="px-4 sm:px-10 lg:px-40 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-[700px] mx-auto flex flex-col gap-4">
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
            Driven by Purpose
          </h2>
          <p className="text-base text-[#1c1c0d]/70 dark:text-white/70">
            Our core values guide every feature we build, ensuring that campus
            life becomes more connected, transparent, and efficient.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Mission */}
          <div className="group flex flex-col p-8 lg:p-12 rounded-xl bg-white dark:bg-[#2a291a] border border-[#e9e8ce] dark:border-[#3a392a] hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center text-black mb-6 group-hover:bg-primary transition-colors">
              <Target />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-[#1c1c0d]/70 dark:text-white/70 leading-relaxed">
              To bridge the gap between students and administration through
              seamless digital communication, eliminating misinformation and
              ensuring every student is informed.
            </p>
          </div>

          {/* Vision */}
          <div className="group flex flex-col p-8 lg:p-12 rounded-xl bg-white dark:bg-[#2a291a] border border-[#e9e8ce] dark:border-[#3a392a] hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center text-black mb-6 group-hover:bg-primary transition-colors">
              <Eye />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg text-[#1c1c0d]/70 dark:text-white/70 leading-relaxed">
              A campus where every voice is heard, every notice is received
              instantly, and student leadership is empowered with the right
              tools to serve effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
