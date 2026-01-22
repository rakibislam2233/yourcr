"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdCampaign } from "react-icons/md";

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen px-4 py-12 md:py-20 lg:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto container w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-8 text-center lg:text-left z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight">
            Simplify Class <br />
            <span className="relative inline-block">Management</span> with{" "}
            <span className="text-primary">Your CR</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-muted dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            The all-in-one platform bridging the gap between students, reps, and
            faculty. Announcements, polls, and resources in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/auth/cr-register">
              <button className="h-12 px-8 rounded-lg bg-primary hover:bg-primary-hover   cursor-pointer flex items-center justify-center gap-2 text-white">
                <span>Register as CR</span>
              </button>
            </Link>
            <button className="h-12 px-8 rounded-lg bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary  dark:text-white  cursor-pointer flex items-center justify-center">
              How It Works
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
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent z-10 pointer-events-none" />
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
                <MdCampaign className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">New Announcement</h4>
                <p className="text-xs text-text-muted ">
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
