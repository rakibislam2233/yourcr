"use client";

import { Badge, School } from "lucide-react";
import {
    MdCastForEducation,
    MdForum,
    MdGroups,
    MdTrackChanges,
    MdVisibility,
} from "react-icons/md";

const AboutUs = () => {
  return (
    <section className="w-full pt-16 md:pt-20 space-y-5">
      {/* Hero Section */}
      <div className="flex flex-1 justify-center bg-white px-5 py-5">
        <div className="flex w-full container flex-1 flex-col">
          <div className="flex flex-col gap-6 px-4 py-10 md:gap-8 md:flex-row">
            <div className="flex flex-1 flex-col gap-6 md:min-w-[400px] md:gap-8 md:justify-center">
              <div className="flex flex-col gap-2 text-left">
                <h1 className="text-4xl font-semibold leading-tight tracking-[-0.033em] text-[#121317]  md:text-5xl">
                  Bridging the Gap Between Students and Faculty
                </h1>
                <h2 className="mt-2 text-sm font-normal leading-normal text-[#64748B]  md:text-lg">
                  Empowering academic leadership with centralized tools for
                  Class Representatives, students, and faculty members.
                </h2>
              </div>
              <button className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-6 py-2.5 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-primary/90 md:py-3 md:text-base">
                <span className="truncate">Join Our Mission</span>
              </button>
            </div>
            <div
              className="aspect-video w-full flex-1 rounded-xl bg-cover bg-center bg-no-repeat shadow-lg md:h-auto"
              style={{
                backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuDuDhA3kpfxcpSNThyAjHxWdHb4BcORVENsohDQAHAIDnNn1Ar-WK43PBQ7kbJBHtorq8k7unON5GYmdxfqICC4ymGUXNBhhDOngOn8iqiffzmsVCVBhmnUcam1m7B7fUMpYuM_RdJdS8WZX-gc14AyeMvSWqWeYFdYrtOhJtAdeN3nQ2Ixzajlb1LskEfpCAvD13WDwGLBMN28l89L_9QKSWlXcq-yPiF4SSJ1Mcno97XDjsMzqMfNGE-BWNMH__R3RIStn46gRtU)`,
              }}
              aria-label="Students and faculty collaborating in a modern university setting"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-1 justify-center bg-gray-50  px-5 py-10 md:py-12">
        <div className="flex w-full container flex-1 flex-col">
          <div className="flex flex-wrap gap-4 px-4">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg border border-[#e2e8f0] bg-white p-6 ">
              <div className="flex items-center gap-2">
                <School className="text-primary" />
                <p className="text-base font-medium leading-normal text-[#64748B] ">
                  Universities
                </p>
              </div>
              <p className="text-3xl font-bold leading-tight tracking-tight text-[#121317] ">
                50+
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg border border-[#e2e8f0] bg-white p-6 ">
              <div className="flex items-center gap-2">
                <MdGroups className="text-primary" />
                <p className="text-base font-medium leading-normal text-[#64748B] ">
                  Active Students
                </p>
              </div>
              <p className="text-3xl font-bold leading-tight tracking-tight text-[#121317] ">
                10k+
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg border border-[#e2e8f0] bg-white p-6 ">
              <div className="flex items-center gap-2">
                <MdForum className="text-primary" />
                <p className="text-base font-medium leading-normal text-[#64748B] ">
                  Messages
                </p>
              </div>
              <p className="text-3xl font-bold leading-tight tracking-tight text-[#121317] ">
                500k+
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="flex flex-1 justify-center bg-white px-5 py-5">
        <div className="flex w-full container flex-1 flex-col">
          <div className="flex flex-col gap-10 px-4 py-16">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="max-w-[720px] text-4xl font-bold leading-tight text-[#121317]  md:text-[32px]">
                Our Purpose
              </h1>
              <p className="max-w-[720px] text-base font-normal leading-relaxed text-[#64748B] ">
                We are driven by a commitment to improve educational
                coordination, ensuring that administrative hurdles never get in
                the way of learning.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 p-0 md:grid-cols-2">
              <div className="flex flex-1 flex-col items-start gap-4 rounded-xl border border-[#e2e8f0] bg-gray-50 p-8 transition-shadow">
                <div className="rounded-lg bg-white p-3 shadow-sm ">
                  <MdTrackChanges className="text-3xl text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold leading-tight text-[#121317] ">
                    Our Mission
                  </h2>
                  <p className="text-base font-normal leading-relaxed text-[#64748B] ">
                    To simplify academic coordination by providing Class
                    Representatives with powerful digital tools that streamline
                    communication and task management.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-start gap-4 rounded-xl border border-[#e2e8f0] bg-gray-50 p-8 transition-shadow">
                <div className="rounded-lg bg-white p-3 shadow-sm ">
                  <MdVisibility className="text-3xl text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold leading-tight text-[#121317] ">
                    Our Vision
                  </h2>
                  <p className="text-base font-normal leading-relaxed text-[#64748B] ">
                    A future where every academic voice is heard, administrative
                    chaos is eliminated, and students can focus entirely on
                    their growth and learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Your CR? */}
      <div className="flex flex-1 justify-center bg-gray-50 px-5 py-5">
        <div className="flex w-full container flex-1 flex-col">
          <div className="flex flex-col gap-10 px-4 py-16">
            <div className="flex flex-col gap-4">
              <h1 className="max-w-[720px] text-4xl font-bold leading-tight text-[#121317]  md:text-[32px]">
                Why Your CR?
              </h1>
              <p className="max-w-[720px] text-base font-normal leading-normal text-[#64748B] ">
                A platform designed to serve the entire academic ecosystem with
                tailored solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-gray-800">
                <Badge className="text-4xl text-primary" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold leading-tight text-[#121317] ">
                    For Class Reps
                  </h2>
                  <p className="text-sm font-normal leading-relaxed text-[#64748B] ">
                    Manage tasks effortlessly, organize polls, and distribute
                    materials with a single click.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-gray-800">
                <School className="text-4xl text-primary" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold leading-tight text-[#121317] ">
                    For Students
                  </h2>
                  <p className="text-sm font-normal leading-relaxed text-[#64748B] ">
                    Never miss a deadline or announcement with centralized
                    notifications and calendars.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-gray-800">
                <MdCastForEducation className="text-4xl text-primary" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold leading-tight text-[#121317] ">
                    For Faculty
                  </h2>
                  <p className="text-sm font-normal leading-relaxed text-[#64748B] ">
                    Streamline announcements and ensure important updates reach
                    every student instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
