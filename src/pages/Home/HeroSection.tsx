"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdCampaign } from "react-icons/md";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 py-20 lg:py-24 overflow-hidden">
      {/* Background glow blob - smaller on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left - Text content */}
        <div className="flex flex-col gap-7 md:gap-9 text-center lg:text-left z-10 order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold ">
            Simplify Class <br className="hidden sm:block" />
            <span className="relative inline-block">Management</span> with{" "}
            <span className="text-primary">Your CR</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-text-muted dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            The all-in-one platform bridging the gap between students, reps, and
            faculty. Announcements, polls, and resources — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link href="/auth/cr-register">
              <Button variant="default" size="lg" className="cursor-pointer">
                Register as CR
              </Button>
            </Link>

            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="cursor-pointer">
                How It Works
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 opacity-90 text-sm md:text-base">
            <div className="flex -space-x-2 sm:-space-x-3">
              <Image
                alt="User avatar"
                width={44}
                height={44}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white dark:border-background-dark object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcx5tLX-1xL-tZUpK7mPjkXf7RmPHjH5v3rrOVxIUDiN3IPiOpFnrx_cOB1UDqBofB_sH4rdZPFMAULi0_mE7oRUxwOFbde4xR3KfTafbmTM6orn4QUS3mjWTBlJ0vCiP1WL7oQyyi1qUhMnLJyzfdEcRb6ndTpJaHmq67UsMFHsUMRYZHwMfcGYR9pLAdDZQBku10xffC7JX9wmBDRPXiQPxreNGgE80HjZ19hoWOsswmhyYf2PnYHLUFP3rJV814eHfG5JIPqfQ"
              />
              <Image
                alt="User avatar"
                width={44}
                height={44}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white dark:border-background-dark object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2c8ku-lDPydE54hMmTAJsYx7FNuzPvlEfIquIoX8uhx2E_2wfHWBDrhB_NAonmzZT1L8TwB8IHSxljPd6XL60SAmnyp2I2_OOlhDRVdAQCfXarsc_2pHMg6ZUzXcNIFRpV954tZA6N6sV6BLA2rgCJPFynrt_YaGg8YKzjMinfku_qdTp-p5ewzxMrikPDYOVjksuDKwm1i0dvrar1RYn9ykOCEj42ezLRX39me5Es2ciKEesiqv93q67UZZX-XmSTS2wkflk8Cs"
              />
              <Image
                alt="User avatar"
                width={44}
                height={44}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white dark:border-background-dark object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJdXy3iuWGV2AJWotR0NrtnNPB_j0G3VhW9AI0o6_C2qMTP6hbdwG2G0vZPDASm4knVV31junCZU91kMAW2l4dwCbtiG8wDEJADdgNGBmFKL1vwHSs9uH1A7fcQyUpHI_cfg7gBJof9zFc_kpHwq16nVCnhu-aL-TjYvaago5XrNCYvPVL4UikNKL3EwRUxQnuGwyUqkyyy-EJh3LNujY6LdZwf7fFmo4ETzVzGICh3iBvg2ohtHe50-qDCRgNxVHN-Ayv_MnBVow"
              />
            </div>
            <div className="font-medium">
              Trusted by <span className="font-bold">500+</span> Universities
            </div>
          </div>
        </div>

        {/* Right - Image + floating card */}
        <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-none mx-auto order-1 lg:order-2">
          <div className="relative aspect-4/4 sm:aspect-5/4 md:aspect-[4/3.3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ02NOE3WQ9k6Z0hCZh9MxH6cAHvpwTf12CQ4VRO_fwR0S-2fyIHFX_CPh_0WvrLlXjw-C9hHvMjtCRBKkiZT8HJ1duKKXhSBWWM-1460QNt9U1bBMWxqaXI9NcCcDF4lxN0VRkL37kYny5Yd_whnRdWSxXX2VZ1wVLzTaIjOQ9i3c6up_pKIRNN2z2Srgc2zp-qwN1R3GfLl1sE8R2vXF81pSF-SVuBqv1ue0cfW0eyPfkjApxai2QPCRjej1bwmQPR_r9z1pYAw"
              alt="Class representative dashboard preview"
              fill
              className="object-cover"
              priority
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
                <h4 className="font-semibold text-sm sm:text-base">
                  New Announcement
                </h4>
                <p className="text-xs sm:text-sm text-text-muted dark:text-gray-400 mt-0.5">
                  Class schedule updated for CS-101
                </p>
              </div>
            </div>

            <div className="h-1.5 sm:h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4 rounded-full" />
            </div>

            <div className="flex justify-between mt-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-gray-400">
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
