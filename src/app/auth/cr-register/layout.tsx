import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CrRegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row font-outfit">
      {/* Left Side: Form Content */}
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-lg">
          {/* Brand Header */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <Link href="/">
              <Image src={logo} alt="Your CR Logo" className="h-8 w-auto" />
            </Link>
          </div>
          {children}
        </div>
      </div>

      {/* Right Side: Image with Overlay */}
      <div className="hidden lg:flex lg:w-[40%] relative bg-gray-100">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-40 mix-blend-multiply z-10"></div>
      </div>
    </section>
  );
};

export default CrRegisterLayout;
