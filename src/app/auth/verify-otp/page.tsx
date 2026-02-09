import logo from "@/assets/logo/logo.png";
import VerifyOtpForm from "@/pages/Auth/VerifyOtpForm";
import Image from "next/image";
import Link from "next/link";

const VerifyOtpPage = () => {
  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Form Content */}
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Brand Header */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <Link href="/">
              <Image src={logo} alt="Your CR Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Text Content */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              Verify Your Account
            </h1>
            <p className="text-base text-gray-600">
              We&apos;ve sent a 6-digit verification code to your email. Please
              enter it below to continue.
            </p>
          </div>

          {/* Form */}
          <VerifyOtpForm />
        </div>
      </div>

      {/* Right Side: Image with Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-100">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
          }}
        />
        <div className="absolute inset-0 bg-gray-900 opacity-40 mix-blend-multiply z-10"></div>
      </div>
    </section>
  );
};

export default VerifyOtpPage;
