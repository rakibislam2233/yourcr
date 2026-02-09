import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import LoginForm from "@/pages/Auth/LoginForm";

const page = () => {
  return (
    <section className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Side: Login Form */}
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
            <h1 className="mb-2 text-3xl sm:text-4xl  leading-tight tracking-tight text-gray-900">
              Login to Your Account
            </h1>
            <p className="text-base text-gray-600">
              Welcome back! Please enter your credentials to access class
              schedules and announcements.
            </p>
          </div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-100">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLYl09oDE2LgEJgY4KIYIYdKPW0DqiVOZDwItZuu8c1kMJ5redYr3jKiTa8Cg9o6Rc1sV0eW1qwQ66piZkF2bCxAX298Na4aSdDC4F1ec-yVR1gYDHX8ESVP1R9k0LI5egwNTRBEJwd8ptKc_0FMv_OL5lBvehCMeEU-70zFTQvpoYCsB-SIN6BwXBWZ3YPINx57rJzYSgUJv6NrXzrrFU2jHZIjjt9xWkBVEeTSx_2iopnWMsQB7M1NAC4tSHH78jZEGRUd3Yh0M')",
          }}
        />

        <div className="absolute inset-0 bg-gray-900 opacity-40 mix-blend-multiply z-10"></div>
      </div>
    </section>
  );
};

export default page;
