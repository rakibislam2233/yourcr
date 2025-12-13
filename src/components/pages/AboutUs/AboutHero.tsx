import React from "react";

const AboutHero = () => {
  return (
    <section className="relative px-5 py-12 md:py-24  flex justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-2 rounded-full border border-[#e9e8ce] dark:border-[#3a392a] bg-white dark:bg-[#2a291a] px-3 py-1">
              <span className="size-2 rounded-full bg-primary"></span>
              <span className="text-xs font-medium text-[#1c1c0d] dark:text-white">
                About Us
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
              Empowering Classrooms,{" "}
              <span className="relative whitespace-nowrap">
                Connecting Campus
              </span>
            </h1>

            <p className="text-base lg:text-lg text-[#1c1c0d]/70 dark:text-white/70 max-w-[600px] mx-auto lg:mx-0">
              Your CR is bridging the gap between students, Class
              Representatives, and administration through seamless, democratized
              digital communication.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button className="flex items-center justify-center rounded-full h-12 px-8 bg-primary cursor-pointer text-white">
                Join Your CR
              </button>
              <button className="flex items-center justify-center rounded-full h-12 px-8 bg-transparent border border-[#e9e8ce] dark:border-[#4a493a] text-[#1c1c0d] dark:text-white text-base font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                Meet the Team
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full aspect-square max-w-[450px] rounded-full overflow-hidden border-8 border-white dark:border-[#2a291a] shadow-2xl">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8TiGDwem70N1lMrJXe9knVkFKv2auy4hLhoIWg6Niu_HJe7kac2IgLfUUln8mHGN069tLp-kAG3kUWN8kC_g8LIqxKHkNo05pRDga1hZqHWB1YrEpVMDyXf3QEX8QkdxTL3V83OCaVSmTb36XvuKKigGbdUeSuW6tskfBcyi3drFeBJz-qZLTFGHGni8Xk1qq5pAnr46qWcMIC6BslUhoiNKM-08tvXXb04495zVgqlpt6g43addCTp1twOTd0zIfe_87ZUCmz20')",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
