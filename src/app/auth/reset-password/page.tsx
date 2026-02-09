import logo from "@/assets/logo/logo.png";
import ResetPasswordForm from "@/pages/Auth/ResetPasswordForm";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Form Content */}
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Brand Header */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <Link href="/">
              <Image src={logo} alt="Your CR Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Text Content */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="mb-2 text-3xl sm:text-4xl leading-tight tracking-tight text-gray-900">
              Reset Your Password
            </h1>
            <p className="text-base text-gray-600">
              Almost there! Please choose a new, strong password for your
              account.
            </p>
          </div>

          {/* Form */}
          <Suspense
            fallback={<div className="text-center py-4">Loading...</div>}
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>

      {/* Right Side: Image with Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-100">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-40 mix-blend-multiply z-10"></div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
