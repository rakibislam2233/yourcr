import React from "react";

const AboutStats = () => {
  return (
    <section className="px-5 py-10 bg-white dark:bg-[#2a291a]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#e9e8ce] dark:divide-[#4a493a]">
          <div className="flex flex-col gap-2 p-4">
            <p className="text-4xl lg:text-5xl font-black tracking-tight text-[#1c1c0d] dark:text-white">
              50+
            </p>
            <p className="text-sm font-medium text-[#1c1c0d]/60 dark:text-white/60 uppercase tracking-wide">
              Universities Partnered
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <p className="text-4xl lg:text-5xl font-black tracking-tight text-[#1c1c0d] dark:text-white">
              10k+
            </p>
            <p className="text-sm font-medium text-[#1c1c0d]/60 dark:text-white/60 uppercase tracking-wide">
              Active Students
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <p className="text-4xl lg:text-5xl font-black tracking-tight text-[#1c1c0d] dark:text-white">
              1M+
            </p>
            <p className="text-sm font-medium text-[#1c1c0d]/60 dark:text-white/60 uppercase tracking-wide">
              Messages Delivered
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
