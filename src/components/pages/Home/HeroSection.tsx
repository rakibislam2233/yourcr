"use client";
import Image from "next/image";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    // <section className="w-full min-h-screen relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#DEECFE] to-white">
    //   {/* Background Elements */}
    //   <div className="absolute inset-0 overflow-hidden pointer-events-none">
    //     <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 rounded-full blur-3xl"></div>
    //     <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/10 rounded-full blur-3xl"></div>
    //   </div>

    //   {/* Main Content */}
    //   <div className="relative z-10 max-w-5xl mx-auto text-center">
    //     <div className="space-y-6 sm:space-y-8">
    //       {/* Badge */}
    //       <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
    //         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
    //         <span className="text-sm text-gray-600 font-medium">Trusted by 120+ Class Representatives</span>
    //       </div>

    //       {/* Heading */}
    //       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-900 font-bold leading-tight">
    //         <span className="block mb-2">Manage Your Education</span>
    //         <span className="block">
    //           Smarter with <span className="text-primary">YourCR</span>
    //         </span>
    //       </h1>

    //       {/* Description */}
    //       <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
    //         A simple platform for Class Representatives to organize classes,
    //         announcements, and student issues — all in one place.
    //       </p>

    //       {/* CTA Buttons */}
    //       <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
    //         <Link href="/auth/cr-login">
    //           <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg gap-2">
    //             Login as CR
    //             <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
    //           </Button>
    //         </Link>
    //         <Link href="/auth/student-login">
    //           <Button
    //             variant="outline"
    //             size="lg"
    //             className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-primary text-primary hover:bg-primary/5"
    //           >
    //             Login as Student
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12 md:py-20 lg:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-8 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-border-light dark:border-border-dark shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
              v2.0 Now Live
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            Simplify Class <br />
            <span className="relative inline-block">
              Management
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-primary z-[-1]"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                />
              </svg>
            </span>
            with Your CR
          </h1>

          <p className="text-lg sm:text-xl text-text-muted dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            The all-in-one platform bridging the gap between students, reps, and
            faculty. Announcements, polls, and resources in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="h-14 px-8 rounded-xl bg-primary hover:bg-primary-hover text-text-main  cursor-pointer flex items-center justify-center gap-2 text-white">
              <span>Get Started as CR</span>
            </button>
            <button className="h-14 px-8 rounded-xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary text-text-main dark:text-white  cursor-pointer flex items-center justify-center">
              Student Login
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 opacity-80">
            <div className="flex -space-x-3">
              <Image
                alt="User"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcx5tLX-1xL-tZUpK7mPjkXf7RmPHjH5v3rrOVxIUDiN3IPiOpFnrx_cOB1UDqBofB_sH4rdZPFMAULi0_mE7oRUxwOFbde4xR3KfTafbmTM6orn4QUS3mjWTBlJ0vCiP1WL7oQyyi1qUhMnLJyzfdEcRb6ndTpJaHmq67UsMFHsUMRYZHwMfcGYR9pLAdDZQBku10xffC7JX9wmBDRPXiQPxreNGgE80HjZ19hoWOsswmhyYf2PnYHLUFP3rJV814eHfG5JIPqfQ"
              />
              <Image
                alt="User"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2c8ku-lDPydE54hMmTAJsYx7FNuzPvlEfIquIoX8uhx2E_2wfHWBDrhB_NAonmzZT1L8TwB8IHSxljPd6XL60SAmnyp2I2_OOlhDRVdAQCfXarsc_2pHMg6ZUzXcNIFRpV954tZA6N6sV6BLA2rgCJPFynrt_YaGg8YKzjMinfku_qdTp-p5ewzxMrikPDYOVjksuDKwm1i0dvrar1RYn9ykOCEj42ezLRX39me5Es2ciKEesiqv93q67UZZX-XmSTS2wkflk8Cs"
              />
              <Image
                alt="User"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJdXy3iuWGV2AJWotR0NrtnNPB_j0G3VhW9AI0o6_C2qMTP6hbdwG2G0vZPDASm4knVV31junCZU91kMAW2l4dwCbtiG8wDEJADdgNGBmFKL1vwHSs9uH1A7fcQyUpHI_cfg7gBJof9zFc_kpHwq16nVCnhu-aL-TjYvaago5XrNCYvPVL4UikNKL3EwRUxQnuGwyUqkyyy-EJh3LNujY6LdZwf7fFmo4ETzVzGICh3iBvg2ohtHe50-qDCRgNxVHN-Ayv_MnBVow"
              />
            </div>
            <div className="text-sm font-medium">
              Trusted by <span className="font-bold">500+</span> Universities
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10 pointer-events-none" />
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQ02NOE3WQ9k6Z0hCZh9MxH6cAHvpwTf12CQ4VRO_fwR0S-2fyIHFX_CPh_0WvrLlXjw-C9hHvMjtCRBKkiZT8HJ1duKKXhSBWWM-1460QNt9U1bBMWxqaXI9NcCcDF4lxN0VRkL37kYny5Yd_whnRdWSxXX2VZ1wVLzTaIjOQ9i3c6up_pKIRNN2z2Srgc2zp-qwN1R3GfLl1sE8R2vXF81pSF-SVuBqv1ue0cfW0eyPfkjApxai2QPCRjej1bwmQPR_r9z1pYAw')",
            }}
          />

          {/* Floating Announcement Card */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl z-20 transform translate-y-0 opacity-100 transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-primary/20 p-2 rounded-full text-primary-hover">
                <span className="material-symbols-outlined">campaign</span>
              </div>
              <div>
                <h4 className="font-bold text-sm">New Announcement</h4>
                <p className="text-xs text-text-muted dark:text-gray-400">
                  Class schedule updated for CS-101
                </p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4 rounded-full" />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
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
